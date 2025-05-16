import { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasStorage);
  }, []);
  return (
    <>
      <Header />
      <Main tareas={tareas} />
    </>
  );
}

export default App;
