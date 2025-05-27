import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import Swal from "sweetalert2";

import Header from "./components/Header";
import Main from "./components/Main";
import LoginAuth from "./components/LoginAuth";

/**
 * Main application component for managing the Todo list.
 * It handles fetching, creating, updating, and deleting tasks,
 * and subscribes to real-time updates from Supabase.
 */
function App() {
  // State to store the list of tasks
  const [tareas, setTareas] = useState([]);
  // State to manage the editing mode and store the task being edited (or true if a new task is being created in edit mode, though typically holds a task object or false)
  const [editando, setEditando] = useState(false);
  // State for the selected category of a task
  const [category, setCategory] = useState("none");
  // State for the selected date of a task
  const [dateTask, setDateTask] = useState("");

  /**
   * Validates and syncs tasks from localStorage to the Supabase "TodoList" table.
   * Retrieves tasks from 'localStorageTasks', transforms them to the required schema,
   * inserts them into Supabase, and then clears them from localStorage.
   * Includes error handling and console logging for each step.
   */
  const validateLocalStorageAndSync = async () => {
    console.log("Checking localStorage for tasks...");
    try {
      const localTasks = localStorage.getItem("localStorageTasks");
      if (localTasks) {
        console.log("Tasks found, attempting to save to DB...");
        const parsedTasks = JSON.parse(localTasks);

        if (
          Array.isArray(parsedTasks) &&
          parsedTasks.length > 0 &&
          parsedTasks.every((item) => typeof item === "string")
        ) {
          const tasksToInsert = parsedTasks.map((taskString) => ({
            task: taskString,
            category: "Otros",
            dateTask: "",
            isCompleted: false,
            delete: false,
          }));

          try {
            const { error: insertError } = await supabase
              .from("TodoList")
              .insert(tasksToInsert);

            if (insertError) {
              console.error(
                "Error saving tasks from localStorage to DB:",
                insertError
              );
            } else {
              console.log(
                "Tasks saved to DB successfully, clearing localStorage."
              );
              localStorage.removeItem("localStorageTasks");
            }
          } catch (dbError) {
            console.error("Exception during DB insert operation:", dbError);
          }
        } else {
          console.log("No tasks to insert or data is not in expected format.");
          // Optionally, clear localStorage if the data is malformed and unusable
          // localStorage.removeItem('localStorageTasks');
        }
      } else {
        console.log("No tasks found in localStorage.");
      }
    } catch (error) {
      console.error("Error processing tasks from localStorage:", error);
      // Potentially corrupted data in localStorage, consider removing it
      // localStorage.removeItem('localStorageTasks');
    }
  };

  // Main effect hook for initializing data and setting up real-time updates.
  // Fetches initial tasks and subscribes to changes in the "TodoList" table via Supabase channels.
  // Cleans up the channel subscription when the component unmounts.
  useEffect(() => {
    validateLocalStorageAndSync();
    fetchTareas();
    const channel = supabase
      .channel("realtime-todolist")
      .on(
        "postgres_changes",
        {
          event: "*", // Monitorea todos los eventos: INSERT, UPDATE, DELETE
          schema: "public",
          table: "TodoList", // Especifica la tabla
        },
        (payload) => {
          handleRealtimePayload(payload);
        }
      )
      .subscribe();

    // Limpiar la suscripción al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /**
   * Handles real-time updates received from the Supabase channel.
   * Updates the local 'tareas' state based on INSERT, UPDATE, or DELETE events.
   * For UPDATE events, it also handles soft deletes by filtering out tasks where `delete` is true.
   * @param {object} payload - The data received from the Supabase channel.
   * @param {string} payload.eventType - The type of database event (e.g., "INSERT", "UPDATE", "DELETE").
   * @param {object} payload.new - The new state of the row (for INSERT and UPDATE).
   * @param {object} payload.old - The old state of the row (for DELETE).
   */
  const handleRealtimePayload = (payload) => {
    console.log("Cambio detectado:", payload);

    switch (payload.eventType) {
      case "INSERT":
        setTareas((prevTareas) => [...prevTareas, payload.new]);
        break;
      case "UPDATE":
        if (payload.new.delete === true) {
          setTareas((prevTareas) =>
            prevTareas.filter((tarea) => tarea.id !== payload.new.id)
          );
        } else {
          setTareas((prevTareas) =>
            prevTareas.map((tarea) =>
              tarea.id === payload.new.id ? payload.new : tarea
            )
          );
        }
        break;
      case "DELETE":
        setTareas((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== payload.old.id)
        );
        break;
      default:
        break;
    }
  };

  /**
   * Fetches tasks from the Supabase "TodoList" table.
   * Only retrieves tasks that are not marked as deleted (`delete: false`).
   * Orders the tasks by 'dateTask' in ascending order.
   * Updates the 'tareas' state with the fetched data or shows an error alert.
   */
  const fetchTareas = async () => {
    const { data, error } = await supabase
      .from("TodoList")
      .select("*")
      .order("dateTask", { ascending: true })
      .eq("delete", false);

    if (error) {
      console.error("Error al obtener las tareas:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error fetching tasks: ${error.message}`,
      });
    } else {
      setTareas(data);
    }
  };

  /**
   * Saves or updates a task in the Supabase "TodoList" table.
   * If 'editando' state is true (contains a task id), it updates an existing task.
   * Otherwise, it inserts a new task.
   * Shows success or error alerts accordingly.
   * @param {string|null} id - The ID of the task to update, or null for a new task.
   * @param {string} value - The text content of the task.
   * @param {string} category - The category of the task.
   * @param {string} dateTask - The due date of the task.
   */
  const guardarTarea = async (id, value, category, dateTask) => {
    const newTaskData = {
      task: value,
      category: category == "none" ? "Otros" : category,
      dateTask: !dateTask ? "" : dateTask,
      isCompleted: false,
    };

    if (editando) {
      // Actualizar tarea existente
      const { error } = await supabase
        .from("TodoList")
        .update(newTaskData)
        .eq("id", id);
      if (error) {
        console.error("Error al actualizar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error updating task: ${error.message}`,
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Task updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        resetCampos();
      }
      return;
    } else {
      // Insertar nueva tarea
      const { error } = await supabase.from("TodoList").insert([newTaskData]);
      if (error) {
        console.error("Error al guardar la tarea:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error saving task: ${error.message}`,
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Task saved successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        resetCampos();
      }
    }
  };

  /**
   * Resets the input fields and editing state.
   * Sets 'editando' to false, 'category' to "none", and 'dateTask' to an empty string.
   */
  function resetCampos() {
    setEditando(false);
    setCategory("none");
    setDateTask("");
  }

  /**
   * Performs a soft delete on a task by setting its 'delete' flag to true in Supabase.
   * The actual removal from the UI is handled by the real-time update mechanism.
   * Shows an error alert if the operation fails.
   * @param {object} tarea - The task object to be soft-deleted.
   * @param {string} tarea.id - The ID of the task.
   */
  const eliminarTarea = async (tarea) => {
    console.log(tarea);

    const { error } = await supabase
      .from("TodoList")
      .update({ delete: true })
      .eq("id", tarea.id);
    if (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error deleting task: ${error.message}`,
      });
      return;
    } else {
      // UI update is handled by handleRealtimePayload
    }
  };

  return (
    <div className=" bg-Dark-900 text-white p-4 lg:px-8 lg:w-[800px] w-[375px] rounded-xl border border-gray-500/60 shadow-2xl/70 shadow-Dark-400/50">
      <LoginAuth />
      <Header
        guardarTarea={guardarTarea}
        editando={editando}
        setEditando={setEditando}
        category={category}
        setCategory={setCategory}
        dateTask={dateTask}
        setDateTask={setDateTask}
      />
      <Main
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        setEditando={setEditando}
        editando={editando}
      />
    </div>
  );
}

export default App;
