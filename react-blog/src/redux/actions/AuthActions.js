import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const login = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/auth/local`, {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("userid", res.data.user.id);

        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
        });
        toast.success(`welcome ${res.data.user.username}!!`);
        history.push("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE", message: error.message });
        console.log(error.response.data);
        error.response.data.message.map((error) =>
          error.messages.map((item) => toast.error(item.message))
        );
      });
  };
};

export const registration = (data) => {
  return (dispatch) => {
    dispatch({ type: "REGISTRATION_PENDING" });

    axios
      .post(`${config.apiUrl}/auth/local/register`, data)

      .then((res) => {
        dispatch({
          type: "REGISTRATION_SUCCESS",
        });

        toast.success("Registration successfully done!!");
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE", message: error.message });
        error.response.data.message.map((error) =>
          error.messages.map((item) => toast.error(item.message))
        );
      });
  };
};
