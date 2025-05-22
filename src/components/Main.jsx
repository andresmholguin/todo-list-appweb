// import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

const Main = ({ tareas, eliminarTarea, setEditando }) => {
  const eliminar = (tarea) => {
    eliminarTarea(tarea);
  };

  const editar = (tarea, index) => {
    setEditando([tarea, index]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <ul>
        {tareas.length === 0 ? (
          <li className="text-center text-lg">No hay tareas</li>
        ) : (
          tareas.map((tarea, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-Dark-800 p-3 mb-2 rounded-lg transition-all duration-300"
            >
              {tarea}
              <div className="flex gap-2">
                <button
                  onClick={() => editar(tarea, index)}
                  className="px-3 py-2 bg-Dark-100 cursor-pointer rounded-sm transition-all duration-300 hover:bg-amber-500"
                >
                  <EditIcon />
                </button>
                {/* <Delete /> */}
                <button
                  onClick={() => eliminar(tarea)}
                  className="px-3 py-2 bg-Dark-100 rounded-sm cursor-pointer hover:bg-red-700 transition-all duration-300"
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Main;
