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
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-Dark-800 p-4 mb-2 rounded-lg"
          >
            {tarea}
            <div className="flex gap-2">
              <button
                onClick={() => editar(tarea, index)}
                className="px-4 py-2 bg-Dark-100 rounded-sm"
              >
                <EditIcon />
              </button>
              {/* <Delete /> */}
              <button
                onClick={() => eliminar(tarea)}
                className="px-4 py-2 bg-Dark-100 rounded-sm cursor-pointer"
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
