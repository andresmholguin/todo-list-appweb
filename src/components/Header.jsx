import { useEffect } from "react";
import SelectCategory from "./SelectCategory";
import DateTask from "./DateTask";

const Header = ({
  guardarTarea,
  editando,
  setEditando,
  category,
  setCategory,
  dateTask,
  setDateTask,
}) => {
  // const [category, setCategory] = useState("none");
  // const [dateTask, setDateTask] = useState("");

  const saveStorage = (e) => {
    e.preventDefault();

    const input = document.getElementById("input");
    const dateTaskInput = document.getElementById("dateTask");
    const date = dateTaskInput.value;
    let value = input.value;
    console.log(value);
    console.log(category);
    console.log(date);

    if (!value || date === "" || category === "none") {
      return;
    } else {
      value = value.trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      setDateTask(date);
      guardarTarea(value, editando[1], category, dateTask);
      input.value = "";
      setEditando(false);
    }
  };

  useEffect(() => {
    const input = document.getElementById("input");
    const btnSubmit = document.getElementById("btnSubmit");
    if (editando) {
      console.log(editando[0].category);
      input.value = editando[0].value ? editando[0].value : editando[0];
      input.focus();
      setCategory(editando[0].category);
      setDateTask(editando[0].dateTask);
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
          className={`bg-Dark-700 h-12 w-[100%] rounded-lg p-4 outline-none shadow-xl/30 focus:shadow-xl/50 ${
            editando ? "focus:shadow-amber-500/70" : "focus:shadow-Dark-400/70"
          } transition-all duration-200`}
          id="input"
          type="text"
          placeholder="Ejercicio, Estudiar, Compras ..."
        />

        <div className="flex justify-between gap-3 mt-4">
          <SelectCategory category={category} setCategory={setCategory} />
          <DateTask dateTask={dateTask} setDateTask={setDateTask} />
          <button
            className={`h-[32px] w-[100px] text-sm right-0 text-Dark-900 ${
              editando ? "bg-amber-500" : " bg-Dark-100"
            } text-center  rounded-lg shadow-md cursor-pointer  font-bold hover:bg-Dark-400 hover:text-white active:bg-Dark-400/40 transition-all duration-300`}
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
