import { useState } from "react";
// import { iconAlert } from "../assets/icons/exclamation.png ";

const SelectCategory = () => {
  const [category, setCategory] = useState("none");
  const [bgSelect, setBgSelect] = useState("bg-Dark-700");

  const optionsSelect = [
    { value: "importante", color: "bg-red-500/70" },
    { value: "trabajo", color: "bg-amber-500/70" },
    { value: "estudio", color: "bg-cyan-500/70" },
    { value: "personal", color: "bg-emerald-500/70" },
    { value: "otros", color: "bg-Dark-700" },
  ];

  const handleSelect = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "none") {
      //   console.log(value);
      const selectedOption = optionsSelect.find(
        (option) => option.value === value
      );
      //   console.log(selectedOption);
      setCategory(value);
      setBgSelect(selectedOption.color);
    } else {
      setBgSelect("bg-Dark-700");
    }
  };

  return (
    <div>
      <select
        name="category"
        id="category"
        className={`mt-4 ${bgSelect} bg-Dark-700 rounded-lg py-1 px-2 outline-0`}
        onChange={handleSelect}
        value={category}
      >
        <option value="none" disabled hidden>
          Categoría
        </option>
        <option value="importante" className="bg-red-500/70">
          Importante
        </option>
        <option value="trabajo" className="bg-amber-500/70">
          Trabajo
        </option>
        <option value="estudio" className="bg-cyan-500/70">
          Estudio
        </option>
        <option value="personal" className="bg-emerald-500/70">
          Personal
        </option>
        <option value="otros">Otros</option>
      </select>
    </div>
  );
};

export default SelectCategory;
