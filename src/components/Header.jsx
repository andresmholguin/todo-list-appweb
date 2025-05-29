import { useEffect } from "react";
import SelectCategory from "./SelectCategory.jsx";
const Header = ({ guardarTarea, editando, setEditando }) => {
  const saveStorage = (e) => {
    e.preventDefault();

    const input = document.getElementById("input");
    let value = input.value;
    if (value) {
      value = value.trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      guardarTarea(value, editando[1]);
      input.value = "";
      setEditando(false);
    }
  };

  useEffect(() => {
    const input = document.getElementById("input");
    const btnSubmit = document.getElementById("btnSubmit");
    if (editando) {
      input.value = editando[0];
      input.focus();
      btnSubmit.innerText = "Actualizar";
    } else {
      input.value = "";
      btnSubmit.innerText = "Agregar";
    }
  }, [editando]);

  return (
    <div className="flex flex-col mb-5">
      <h1 className="text-center text-4xl font-bold">TO DO LIST</h1>
      <form action="" className="mt-4">
        <div className="flex justify-between">
          <input
            className={`bg-Dark-700 h-12 w-[100%] rounded-l-lg p-4 outline-none shadow-xl/30 focus:shadow-xl/50 ${
              editando
                ? "focus:shadow-amber-500/70"
                : "focus:shadow-Dark-400/70"
            } transition-all duration-200`}
            id="input"
            type="text"
            placeholder="Ejercicio, Estudiar, Compras ..."
          />
          <button
            className={`h-[48px] w-[100px] text-sm right-0 text-Dark-900 ${
              editando ? "bg-amber-500" : " bg-Dark-100"
            } text-center  rounded-r-lg shadow-md cursor-pointer  font-bold hover:bg-Dark-400 hover:text-white active:bg-Dark-400/40 transition-all duration-300`}
            id="btnSubmit"
            type="submit"
            onClick={saveStorage}
          >
            Agregar
          </button>
        </div>

        {/* <SelectCategory /> */}
      </form>
    </div>
  );
};

export default Header;
