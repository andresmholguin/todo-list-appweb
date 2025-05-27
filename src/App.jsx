import { useState, useEffect } from "react";
import supabase from "./supabase-client";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [category, setCategory] = useState("none");
  const [dateTask, setDateTask] = useState("");

  useEffect(() => {
    fetchTareas();
  }, [dateTask, category]);

  const fetchTareas = async () => {
    const { data, error } = await supabase
      .from("TodoList")
      .select("*")
      .order("dateTask", { ascending: true });

    if (error) {
      console.error("Error al obtener las tareas:", error);
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
      // Actualizar tarea existente
      // console.log(editando);
      const { data, error } = await supabase
        .from("TodoList")
        .update(newTaskData)
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error al actualizar la tarea:", error);
        return;
      } else {
        setTareas((prevTareas) =>
          prevTareas.map((tarea) =>
            tarea.id === id ? { ...tarea, data } : tarea
          )
        );
        resetCampos();
      }
      return;
    } else {
      // Insertar nueva tarea
      const { data, error } = await supabase
        .from("TodoList")
        .insert([newTaskData])
        .single();
      if (error) {
        console.error("Error al guardar la tarea:", error);
        return;
      } else {
        setTareas((prevTareas) => [...prevTareas, data]);
        resetCampos();
      }
    }

    // const { data, error } = await supabase
    //   .from("TodoList")
    //   .insert([newTaskData])
    //   .single();
    // if (error) {
    //   console.error("Error al guardar la tarea:", error);
    //   return;
    // } else {
    //   setTareas((prevTareas) => [...prevTareas, data]);
    //   console.log(tareas);
    //   resetCampos();
    // }
  };

  function resetCampos() {
    setEditando(false);
    setCategory("none");
    setDateTask("");
  }

  function eliminarTarea(tarea) {
    // console.log(tarea);
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    const nuevasTareas = tareasStorage.filter(
      (item) => item.value !== tarea.value
    );
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    setEditando(false);
    setTareas(nuevasTareas);
  }

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
