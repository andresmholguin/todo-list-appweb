import { useEffect } from "react";

const DateTask = ({ dateTask, setDateTask }) => {
  useEffect(() => {
    const dateTask = document.getElementById("dateTask");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = today.getFullYear();
    dateTask.setAttribute("min", `${year}-${month}-${day}`);
  }, []);
  return (
    <div>
      <input
        type="date"
        className="rounded-lg py-1 pl-3 outline-0 bg-Dark-700 w-[130px]"
        name="dateTask"
        id="dateTask"
        value={dateTask}
        onChange={(e) => setDateTask(e.target.value)}
        required
      />
    </div>
  );
};

export default DateTask;
