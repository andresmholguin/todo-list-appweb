import { useEffect } from "react";
import SelectCategory from "./SelectCategory";
import DateTask from "./DateTask";

const Header = ({
  guardarTarea,
  editando,

  category,
  setCategory,
  dateTask,
  setDateTask,
}) => {
  // const [category, setCategory] = useState("none");
  // const [dateTask, setDateTask] = useState("");

  const saveStorage = (e) => {
    e.preventDefault();
    // console.log("guardando tarea");
    const input = document.getElementById("input");
    const dateTaskInput = document.getElementById("dateTask");
    let date = dateTaskInput.value;
    let value = input.value;
    if (date === null) {
      date = "";
    }
    if (!value) {
      return;
    } else {
      value = value.trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      setDateTask(date);
      guardarTarea(editando.id, value, category, dateTask);
      input.value = "";
      // setEditando(false);
    }
  };

  useEffect(() => {
    const input = document.getElementById("input");
    const btnSubmit = document.getElementById("btnSubmit");
    if (editando) {
      input.value = editando.task;
      input.focus();
      setCategory(editando.category);
      setDateTask(editando.dateTask);
      btnSubmit.innerText = "Actualizar";
    } else {
      input.value = "";
      btnSubmit.innerText = "Agregar";
      setDateTask("");
    }
  }, [editando, setCategory, setDateTask]);

  return (
    <div className="flex flex-col mb-5">
      <h1 className="text-center text-4xl font-bold">TO DO LIST</h1>
      <form action="" className="mt-4">
        <input
          className={`bg-Dark-700 h-12 w-full rounded-lg p-4 outline-none shadow-xl/30 focus:shadow-xl/50 ${
            editando ? "focus:shadow-amber-500/70" : "focus:shadow-Dark-400/70"
          } transition-all duration-200`}
          id="input"
          type="text"
          placeholder="Ejercicio, Estudiar, Compras ..."
        />

        <div className="lg:flex lg:justify-between  lg:gap-4 mt-4">
          <div className="flex flex-1 w-full gap-4 h-12 mb-4 ">
            <SelectCategory category={category} setCategory={setCategory} />
            <DateTask dateTask={dateTask} setDateTask={setDateTask} />
          </div>
          <button
            className={` h-[40px] lg:w-[160px] w-full text-sm right-0 text-Dark-900 ${
              editando ? "bg-amber-500" : " bg-Dark-100"
            } text-center  rounded-lg shadow-md cursor-pointer  font-bold hover:bg-Dark-400 hover:text-white active:bg-Dark-400/40 transition-colors duration-300`}
            id="btnSubmit"
            type="submit"
            onClick={saveStorage}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
