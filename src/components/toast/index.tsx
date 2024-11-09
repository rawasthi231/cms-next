import toast, { ToastOptions } from "react-hot-toast";

const createToast =
  (type: "success" | "error") => (message: string, props?: ToastOptions) => {
    toast.dismiss();
    toast(message, {
      icon: type === "success" ? "🎯" : "❌",
      position: "top-right",
      style: {
        borderRadius: "200px",
        background: "#002134",
        color: "#fff",
      },
      duration: 2000,
      ...props,
    });
  };

export const successToast = createToast("success");
export const errorToast = createToast("error");
