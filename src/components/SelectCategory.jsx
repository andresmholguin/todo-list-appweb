import { useEffect, useState } from "react";
// import { iconAlert } from "../assets/icons/exclamation.png ";

const SelectCategory = ({ category, setCategory }) => {
  const [bgSelect, setBgSelect] = useState("bg-Dark-700");

  const optionsSelect = [
    { value: "Importante", color: "bg-red-500/70" },
    { value: "Trabajo", color: "bg-amber-500/70" },
    { value: "Estudio", color: "bg-cyan-500/70" },
    { value: "Personal", color: "bg-emerald-500/70" },
    { value: "Otros", color: "bg-gray-600" },
  ];

  const handleSelect = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value !== "none") {
      const selectedOption = optionsSelect.find(
        (option) => option.value === value
      );
      setCategory(value);
      setBgSelect(selectedOption.color);
    }
  };

  useEffect(() => {
    if (category == "none") {
      setBgSelect("bg-Dark-700");
    }
  }, [category]);

  return (
    <div className="">
      <select
        name="category"
        id="category"
        className={`${bgSelect} rounded-lg py-1 px-2 outline-0 h-10 w-[150px]`}
        onChange={handleSelect}
        value={category}
        required
      >
        <option value="none" disabled>
          Categoría
        </option>
        <option value="Importante" className="bg-red-500/70">
          Importante
        </option>
        <option value="Trabajo" className="bg-amber-500/70">
          Trabajo
        </option>
        <option value="Estudio" className="bg-cyan-500/70">
          Estudio
        </option>
        <option value="Personal" className="bg-green-500/70">
          Personal
        </option>
        <option value="Otros" className="bg-gray-600">
          Otros
        </option>
      </select>
    </div>
  );
};

export default SelectCategory;
