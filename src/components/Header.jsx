import { useEffect } from "react";

const Header = ({ guardarTarea, editando, setEditando }) => {
  const saveStorage = (e) => {
    e.preventDefault();

    const input = document.getElementById("input");
    let value = input.value;
    if (value) {
      value = value.trim();
      value = value.toLowerCase();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      // const valor = [value, editando[1]];
      // setEditando(valor);
      guardarTarea(value, editando[1]);
      input.value = "";
      setEditando(false);
    }
  };

  // const editar = (e) => {
  //   e.preventDefault();
  //   const input = document.getElementById("input");
  //   let value = input.value;
  //   if (value) {
  //     value = value.trim();
  //     value = value.charAt(0).toUpperCase() + value.slice(1);
  //     guardarTarea(value);
  //     input.value = "";
  //     setEditando(false);
  //   }
  // }

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
    <div className="flex flex-col mb-12">
      <h1 className="text-center text-4xl font-bold">TO DO LIST</h1>
      <form action="" className="relative flex justify-between gap-2 mt-4">
        <input
          className="bg-Dark-700 h-12 w-[100%] rounded-lg p-4 outline-none shadow-xl/30 focus:shadow-xl/50 focus:shadow-Dark-400/70 transition-all duration-200"
          id="input"
          type="text"
          placeholder="Ejercicio, Estudiar, Compras ..."
        />

        <button
          className="absolute h-[48px] w-[80px] text-sm right-0 bg-Dark-100 text-center  rounded-r-lg shadow-md cursor-pointer text-Dark-900 font-bold hover:bg-Dark-400 hover:text-white active:bg-Dark-400/40 transition-all duration-300"
          id="btnSubmit"
          type="submit"
          onClick={saveStorage}
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Header;
