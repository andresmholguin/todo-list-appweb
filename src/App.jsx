import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import Swal from "sweetalert2";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [category, setCategory] = useState("none");
  const [dateTask, setDateTask] = useState("");

  useEffect(() => {
    fetchTareas();
    const channel = supabase
      .channel("realtime-todolist")
      .on(
        "postgres_changes",
        {
          event: "*", // Monitorea todos los eventos: INSERT, UPDATE, DELETE
          schema: "public",
          table: "TodoList", // Especifica la tabla
        },
        (payload) => {
          handleRealtimePayload(payload);
        }
      )
      .subscribe();

    // Limpiar la suscripción al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRealtimePayload = (payload) => {
    console.log("Cambio detectado:", payload);

    switch (payload.eventType) {
      case "INSERT":
        setTareas((prevTareas) => [...prevTareas, payload.new]);
        break;
      case "UPDATE":
        if (payload.new.delete === true) {
          setTareas((prevTareas) =>
            prevTareas.filter((tarea) => tarea.id !== payload.new.id)
          );
        } else {
          setTareas((prevTareas) =>
            prevTareas.map((tarea) =>
              tarea.id === payload.new.id ? payload.new : tarea
            )
          );
        }
        break;
      case "DELETE":
        setTareas((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== payload.old.id)
        );
        break;
      default:
        break;
    }
  };

  const fetchTareas = async () => {
    const { data, error } = await supabase
      .from("TodoList")
      .select("*")
      .order("dateTask", { ascending: true })
      .eq("delete", false);

    if (error) {
      console.error("Error al obtener las tareas:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error fetching tasks: ${error.message}`,
      });
    } else {
      setTareas(data);
    }
  };

  const guardarTarea = async (id, value, category, dateTask) => {
    const newTaskData = {
      task: value,
      category: category == "none" ? "Otros" : category,
      dateTask: !dateTask ? "" : dateTask,
      isCompleted: false,
    };

    if (editando) {
      const { error } = await supabase
        .from("TodoList")
        .update(newTaskData)
        .eq("id", id);
      if (error) {
        console.error("Error al actualizar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error updating task: ${error.message}`,
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Task updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        resetCampos();
      }
      return;
    } else {
      // Insertar nueva tarea
      const { error } = await supabase.from("TodoList").insert([newTaskData]);
      if (error) {
        console.error("Error al guardar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error saving task: ${error.message}`,
        });
        return;
      } else {
        // setTareas((prevTareas) => [...prevTareas, data]);
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Task saved successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        resetCampos();
      }
    }
  };

  function resetCampos() {
    setEditando(false);
    setCategory("none");
    setDateTask("");
  }

  const eliminarTarea = async (tarea) => {
    const { error } = await supabase
      .from("TodoList")
      .update({ delete: true })
      .eq("id", tarea.id);
    if (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error deleting task: ${error.message}`,
      });
      return;
    }
  };

  return (
    <div className=" bg-Dark-900 text-white p-4 lg:px-8 lg:w-[800px] w-[375px] rounded-xl border border-gray-500/60 shadow-2xl/70 shadow-Dark-400/50">
      <Header
        guardarTarea={guardarTarea}
        editando={editando}
        setEditando={setEditando}
        category={category}
        setCategory={setCategory}
        dateTask={dateTask}
        setDateTask={setDateTask}
      />
      <Main
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        setEditando={setEditando}
        editando={editando}
      />
    </div>
  );
}

export default App;
