import { toast } from "react-toastify";

export function notify(type, text = "🦄 Wow so easy!") {
  console.log(type);
  if (!type || type === "default") {
    toast(text, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }
  // default, info, success, warn, error,
  toast[type](text, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
