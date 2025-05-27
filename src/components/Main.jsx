import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

import Swal from "sweetalert2";

const Main = ({ tareas, eliminarTarea, setEditando, editando }) => {
  function alertDelete(tarea) {
    Swal.fire({
      theme: "dark",
      width: "27em",
      background: "#151a21",
      title: "Confirmar eliminación",
      text: "Esta seguro que desea eliminar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#27aee0",
      cancelButtonColor: "var(--color-red-700)",
      confirmButtonText: "¡Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(tarea);
        Swal.fire({
          theme: "dark",
          width: "27em",
          background: "#151a21",
          title: "Eliminada!",
          text: "La tarea ha sido eliminada.",
          icon: "success",
          confirmButtonColor: "#27aee0",
        });
        setTimeout(() => {
          Swal.close();
        }, 2000);
      }
    });
  }

  const eliminar = (tarea) => {
    eliminarTarea(tarea);
  };

  const editar = (tarea) => {
    if (editando.id === tarea.id) {
      setEditando(false);
      return;
    }
    setEditando(tarea);
  };

  const bgCategory = (bgCategory) => {
    const optionsSelect = [
      { value: "Importante", color: "bg-red-500/70" },
      { value: "Trabajo", color: "bg-amber-500/70" },
      { value: "Estudio", color: "bg-cyan-500/70" },
      { value: "Personal", color: "bg-emerald-500/70" },
      { value: "Otros", color: "bg-gray-400" },
    ];

    const selectedOption = optionsSelect.find(
      (option) => option.value === bgCategory
    );
    return selectedOption ? selectedOption.color : "bg-gray-400";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <ul>
        {tareas.length === 0 ? (
          <li className="text-center text-lg">No hay tareas</li>
        ) : (
          tareas.map((tarea) => (
            <li
              key={tarea.id}
              className=" flex justify-between items-center bg-Dark-800 p-2 mb-4 overflow-hidden rounded-lg transition-all duration-300"
            >
              <div>
                <p className=" text-lg overflow-hidden text-ellipsis">
                  {tarea.task}
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-2">
                  <p>{tarea.dateTask == "" ? "Sin fecha" : tarea.dateTask}</p>
                  <span
                    className={`${bgCategory(
                      tarea.category
                    )} px-2 py-0.5  rounded-full text-white`}
                  >
                    {tarea.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => editar(tarea)}
                  className={`px-3 py-3 ${
                    editando.id == tarea.id ? "bg-amber-500" : "bg-Dark-100"
                  } cursor-pointer rounded-full transition-all duration-300 hover:bg-amber-500`}
                >
                  <EditIcon />
                </button>

                <button
                  onClick={() => alertDelete(tarea)}
                  className="px-3 py-3 bg-Dark-100 rounded-full cursor-pointer hover:bg-red-700 transition-all duration-300"
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
