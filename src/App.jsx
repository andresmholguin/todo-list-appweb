import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import Swal from "sweetalert2";

import Header from "./components/Header";
import Main from "./components/Main";
import LoginAuth from "./components/LoginAuth";
import { useUser } from "@clerk/clerk-react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [category, setCategory] = useState("none");
  const [dateTask, setDateTask] = useState("");
  const [userData, setUserData] = useState(null);

  const { isSignedIn, user } = useUser();

  // console.log(isSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      setUserData(user);
      console.log(userData);
      fetchTareas();
    } else {
      console.log("No hay un usuario autenticado.");
    }
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
          console.log(payload);
          handleRealtimePayload(payload);
        }
      )
      .subscribe();

    // Limpiar la suscripción al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isSignedIn, user]);

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
    if (!userData || !userData.id) {
      console.warn(
        "No se pudo obtener las tareas: El usuario no está autenticado."
      );
      return; // Salimos de la función si no hay un usuario autenticado.
    }

    try {
      const { data, error } = await supabase
        .from("TodoList")
        .select("*")
        .eq("userId", userData.id) // Tareas del usuario actual.
        .eq("delete", false) // Tareas que no están eliminadas.
        .order("dateTask", { ascending: true })
        .order("category", { ascending: true })
        .order("task", { ascending: true });

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
    } catch (e) {
      console.error("Error inesperado al obtener las tareas:", e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unexpected error while fetching tasks. Please try again later.",
      });
    }
  };

  const guardarTarea = async (id, value, category, dateTask) => {
    if (isSignedIn) {
      // const userId = user.id;
      // console.log(userData.Id);
      const newTaskData = {
        task: value,
        category: category == "none" ? "Otros" : category,
        dateTask: !dateTask ? "" : dateTask,
        isCompleted: false,
        delete: false,
        userId: userData.id,
      };

      if (editando) {
        // Actualizar tarea existente
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
    }
  };

  /**
   * Resets the input fields and editing state.
   * Sets 'editando' to false, 'category' to "none", and 'dateTask' to an empty string.
   */
  function resetCampos() {
    setEditando(false);
    setCategory("none");
    setDateTask("");
  }

  /**
   * Performs a soft delete on a task by setting its 'delete' flag to true in Supabase.
   * The actual removal from the UI is handled by the real-time update mechanism.
   * Shows an error alert if the operation fails.
   * @param {object} tarea - The task object to be soft-deleted.
   * @param {string} tarea.id - The ID of the task.
   */
  const eliminarTarea = async (tarea) => {
    console.log(tarea);

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
    } else {
      // UI update is handled by handleRealtimePayload
    }
  };

  return (
    <div className=" bg-Dark-900 text-white p-4 lg:px-8 lg:w-[800px] w-[375px] rounded-xl border border-gray-500/60 shadow-2xl/70 shadow-Dark-400/50">
      <div className="flex justify-end  ">
        <LoginAuth />
        <p>{userData.id}</p>
      </div>
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
