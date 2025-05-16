const Header = () => {
  const saveStorage = (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    let value = input.value;
    if (value) {
      value = value.trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      tareas.push(value);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      input.value = "";
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">TO DO LIST</h1>
      <form action="">
        <input
          id="input"
          type="text"
          placeholder="Ejercicio, Estudiar, Compras"
        />
        <button type="submit" onClick={saveStorage}>
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Header;
