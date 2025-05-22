import { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasStorage);
  }, []);

  function guardarTarea(tarea, index) {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    if (!editando) {
      tareasStorage.push(tarea);
      // localStorage.setItem("tareas", JSON.stringify(tareasStorage));
      // setTareas(tareasStorage);
    } else {
      // console.log("inicia guardar");

      tareasStorage[index] = tarea;
      // console.log(tareasStorage[index]);
    }
    localStorage.setItem("tareas", JSON.stringify(tareasStorage));
    setTareas(tareasStorage);
  }

  function eliminarTarea(tarea) {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    const nuevasTareas = tareasStorage.filter((item) => item !== tarea);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    setEditando(false);
    setTareas(nuevasTareas);
  }

  return (
    <div className=" bg-Dark-900 text-white p-8 sm:w-[520px] w-[375px] rounded-xl border border-gray-500/60 shadow-2xl/70 shadow-Dark-400/50">
      <Header
        guardarTarea={guardarTarea}
        editando={editando}
        setEditando={setEditando}
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
