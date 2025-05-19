// import { Delete } from "../assets/icons/delete.svg";
// import { Edit } from "../assets/icons/edit.svg";

const Main = ({ tareas }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      <ul>
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-Dark-800 p-4 mb-2 rounded-lg"
          >
            {tarea}
            <div className="flex gap-2">
              <button className="px-4 bg-Dark-100 rounded-sm">+</button>
              <button className="px-4 bg-Dark-100 rounded-sm">-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
