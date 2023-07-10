import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notification = {
  echec: (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  },
  reussite: (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  },
};

export default notification;