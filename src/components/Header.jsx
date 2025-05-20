import { useEffect } from "react";

const Header = ({ guardarTarea, editando }) => {
  const saveStorage = (e) => {
    e.preventDefault();

    const input = document.getElementById("input");
    let value = input.value;
    if (value) {
      value = value.trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      // const valor = [value, editando[1]];
      // setEditando(valor);
      guardarTarea(value, editando[1]);
      input.value = "";
      // setEditando(false);
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
    const btnEditar = document.getElementById("btnEditar");
    if (editando) {
      input.value = editando[0];
      btnEditar.innerText = "Guardar";
    } else {
      input.value = "";
      btnEditar.innerText = "Agregar";
    }
  }, [editando]);

  return (
    <div className="flex flex-col mb-12">
      <h1 className="text-center text-4xl font-bold">TO DO LIST</h1>
      <form action="" className="flex justify-between gap-6 mt-4">
        <input
          className="bg-Dark-700 h-12 w-[270px] rounded-lg p-4 shadow-md"
          id="input"
          type="text"
          placeholder="Ejercicio, Estudiar, Compras"
        />
        <button
          className="bg-Dark-100 px-6 rounded-lg shadow-md cursor-pointer text-Dark-900 font-bold hover:bg-Dark-400 hover:text-white active:bg-Dark-400/40 transition-all duration-300"
          id="btnEditar"
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
