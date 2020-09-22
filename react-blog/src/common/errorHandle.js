import { toast } from "react-toastify";

const errorHandle = (error) => {
  for (const data in error.response.data.data.errors) {
    error.response.data.data.errors[data].map((error) => toast.error(error));
  }
};

export default errorHandle;
