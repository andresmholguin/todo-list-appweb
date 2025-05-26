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
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasStorage);
  }, []);

  // function guardarTarea(value, index, category, dateTask) {
  //   const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
  //   const uuid = uuidv4();
  //   const tarea = {
  //     id: uuid,
  //     value,
  //     category,
  //     dateTask,
  //   };
  //   if (!editando) {
  //     tareasStorage.push(tarea);
  //   } else {
  //     tareasStorage[index] = tarea;
  //   }
  //   localStorage.setItem("tareas", JSON.stringify(tareasStorage));
  //   setTareas(tareasStorage);
  //   setEditando(false);
  //   setCategory("none");
  //   setDateTask("");
  // }

  const guardarTarea = async (value, category, dateTask) => {
    const newTaskData = {
      task: value,
      category: category,
      dateTask: dateTask,
      isCompleted: false,
    };
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTaskData])
      .single();
    if (error) {
      console.error("Error al guardar la tarea:", error);
      return;
    } else {
      setTareas((prevTareas) => [...prevTareas, data]);
      console.log(tareas);
      resetCampos();
    }
  };

  function resetCampos() {
    setEditando(false);
    setCategory("none");
    setDateTask("");
  }

  function eliminarTarea(tarea) {
    console.log(tarea);
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    const nuevasTareas = tareasStorage.filter(
      (item) => item.value !== tarea.value
    );
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    setEditando(false);
    setTareas(nuevasTareas);
  }

  return (
    <div className=" bg-Dark-900 text-white p-8 lg:w-[800px] w-[375px] rounded-xl border border-gray-500/60 shadow-2xl/70 shadow-Dark-400/50">
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
