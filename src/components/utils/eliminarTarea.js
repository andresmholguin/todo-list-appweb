import supabase from "../../supabase-client";
import Swal from "sweetalert2";

export const eliminarTarea = async (tarea) => {
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
