import { toast } from "react-toastify";

export function notify(type, text = "😻 Wow so easy!", autoClose = 2500) {
  console.log(type);
  if (!type || type === "default") {
    toast(text, {
      position: "bottom-right",
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }
  // default, info, success, warn, error,
  toast[type](text, {
    position: "bottom-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
