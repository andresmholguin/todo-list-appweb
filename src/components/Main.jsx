const Main = ({ tareas }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Tareas</h1>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}
            <button>Editar</button>
            <button>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
