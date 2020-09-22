import axios from "axios";
import { toast } from "react-toastify";
import { config, errorHandle } from "../../common";

export const createTag = (data, setModal) => {
  const getToken = localStorage.getItem("token");
  console.log(data);
  return (dispatch) => {
    dispatch({ type: "CREATE_TAG_PENDING" });

    axios
      .post(`${config.apiUrl}/tags`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "CREATE_TAG_SUCCESS",
        });
        dispatch(allTags());
        toast.success("Create tag successfully!!");
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "CREATE_TAG_FAILURE", message: error.message });
        errorHandle(error);
      });
  };
};

export const allTags = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_TAGS_PENDING" });

    axios
      .get(`${config.apiUrl}/tags`)
      .then((res) => {
        dispatch({ type: "ALL_TAGS_SUCCESS", tagsData: res.data });
      })
      .catch((error) => {
        dispatch({ type: "ALL_TAGS_FAILURE", message: error.message });
      });
  };
};

export const getSingleTag = (id) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_TAG_PENDING" });

    axios
      .get(`${config.apiUrl}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "GET_SINGLE_TAG_SUCCESS", tag: res.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_SINGLE_TAG_FAILURE", message: error.message });
      });
  };
};

export const deleteTag = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios
      .delete(`${config.apiUrl}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_TAG_SUCCESS" });
        dispatch(allTags());
      })
      .catch((error) => {
        dispatch({ type: "DELETE_TAG_FAILURE", message: error.message });
      });
  };
};

export const updateTag = (data, id, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "UPDATE_TAG_PENDING" });
    axios
      .put(`${config.apiUrl}/tags/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "UPDATE_TAG_SUCCESS",
        });
        dispatch(allTags());
        toast.success("Updated successfully!!");
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_TAG_FAILURE", message: error.message });
        errorHandle(error);
      });
  };
};
