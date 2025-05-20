import { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [tareas, setTareas] = useState([]);
  // const [nuevaTarea, setNuevaTarea] = useState(false);

  useEffect(() => {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasStorage);
  }, []);

  function guardarTarea(tarea) {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasStorage.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareasStorage));
    setTareas(tareasStorage);
  }

  function eliminarTarea(tarea) {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    const nuevasTareas = tareasStorage.filter((item) => item !== tarea);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    setTareas(nuevasTareas);
  }

  return (
    <div className=" bg-Dark-900 text-white p-8 w-[460px] rounded-xl">
      <Header guardarTarea={guardarTarea} />
      <Main tareas={tareas} eliminarTarea={eliminarTarea} />
    </div>
  );
}

export default App;
