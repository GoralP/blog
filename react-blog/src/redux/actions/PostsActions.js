import axios from "axios";
import { toast } from "react-toastify";
import { config, errorHandle } from "../../common";

export const createPost = (data, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "CREATE_POST_PENDING" });

    axios
      .post(`${config.apiUrl}/posts`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "CREATE_POST_SUCCESS",
        });
        dispatch(allPosts());
        toast.success("Create post successfully!!");
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "CREATE_POST_FAILURE", message: error.message });
        errorHandle(error);
      });
  };
};

export const allPosts = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_POSTS_PENDING" });

    axios
      .get(`${config.apiUrl}/posts`)
      .then((res) => {
        dispatch({ type: "ALL_POSTS_SUCCESS", posts: res.data });
      })
      .catch((error) => {
        dispatch({ type: "ALL_POSTS_FAILURE", message: error.message });
      });
  };
};

export const getSinglePost = (id) => {
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_POST_PENDING" });

    axios
      .get(`${config.apiUrl}/posts/${id}`)
      .then((res) => {
        dispatch({ type: "GET_SINGLE_POST_SUCCESS", post: res.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_SINGLE_POST_FAILURE", message: error.message });
      });
  };
};

export const deletePost = (id) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });

    axios
      .delete(`${config.apiUrl}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_POST_SUCCESS" });
        dispatch(allPosts());
      })
      .catch((error) => {
        dispatch({ type: "DELETE_POST_FAILURE", message: error.message });
      });
  };
};

export const updatePost = (data, id, setModal) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "UPDATE_POST_PENDING" });
    axios
      .put(`${config.apiUrl}/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "UPDATE_POST_SUCCESS",
        });
        dispatch(allPosts());
        toast.success("Updated successfully!!");
        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_POST_FAILURE", message: error.message });
        errorHandle(error);
      });
  };
};
