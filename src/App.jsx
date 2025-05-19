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

  return (
    <div className=" bg-Dark-900 text-white p-8 w-[460px] rounded-xl h-[600px]">
      <Header />
      <Main tareas={tareas} />
    </div>
  );
}

export default App;
