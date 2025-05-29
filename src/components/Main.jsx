import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

import { eliminarTarea } from "./utils/eliminarTarea";

import Swal from "sweetalert2";

const Main = ({ tareas, setEditando, editando, userData }) => {
  const alertDelete = (tarea) => {
    Swal.fire({
      theme: "dark",
      width: "27em",
      background: "#151a21",
      title: "Confirmar eliminación",
      text: "¿Está seguro de que desea eliminar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#27aee0",
      cancelButtonColor: "var(--color-red-700)",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTarea(tarea);
        Swal.fire({
          theme: "dark",
          width: "27em",
          background: "#151a21",
          title: "Eliminada",
          text: "La tarea ha sido eliminada.",
          icon: "success",
          confirmButtonColor: "#27aee0",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const editar = (tarea) => {
    setEditando(editando.id === tarea.id ? false : tarea);
  };

  const bgCategory = (category) => {
    const categories = {
      Importante: "bg-red-500/70",
      Trabajo: "bg-amber-500/70",
      Estudio: "bg-cyan-500/70",
      Personal: "bg-emerald-500/70",
      Otros: "bg-gray-600",
    };
    return categories[category] || "bg-gray-400";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <ul>
        {tareas.length === 0 ? (
          <li className="text-center text-lg">
            {userData ? "No tienes tareas pendientes" : "Inicia sesión"}
          </li>
        ) : (
          tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex justify-between items-center bg-Dark-800 p-2 mb-4 rounded-lg transition-all duration-300"
            >
              <div>
                <p className="text-lg overflow-hidden w-[220px] mb-1 lg:w-[610px] text-ellipsis">
                  {tarea.task}
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-4">
                  <p className="w-16">{tarea.dateTask || "Sin fecha"}</p>
                  <span
                    className={`${bgCategory(
                      tarea.category
                    )} px-2 py-0.5 rounded-full text-white`}
                  >
                    {tarea.category || "Otros"}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => editar(tarea)}
                  className={`px-3 py-3 ${
                    editando && editando.id === tarea.id
                      ? "bg-amber-500"
                      : "bg-Dark-100"
                  } rounded-full transition-all duration-300 hover:bg-amber-500`}
                  aria-label="Editar tarea"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => alertDelete(tarea)}
                  className="px-3 py-3 bg-Dark-100 rounded-full hover:bg-red-700 transition-all duration-300"
                  aria-label="Eliminar tarea"
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
