import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, getSinglePost, deletePost } from "../../redux/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import { Spin } from "antd";
import _ from "lodash";

const PostsTable = ({ setAction, toggle }) => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => ({
    loading: state.postReducers.allPosts.loading,
    posts: state.postReducers.allPosts.posts,
  }));

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  const removePost = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record file! !",
      icon: "warning",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        no: {
          text: "Cancel",
          value: "no",
          className: "sweet-cancel btn-center",
        },
        yes: {
          text: "Yes, delete it!",
          value: "yes",
          className: "sweet-warning btn-center",
        },
      },
    }).then((value) => {
      if (value === "yes") {
        dispatch(deletePost(id));
        swal({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            ok: {
              text: "Ok",
              className: "sweet-ok swal-footer",
            },
          },
        });
      }
      return false;
    });
  };

  return (
    <>
      {loading ? (
        <Spin size="large" className="spin" />
      ) : (
        <Table responsive className="border table-layout">
          <thead>
            <tr className="table-heading">
              <th>Title</th>
              <th>Slug</th>
              <th>Content</th>
              <th>Username</th>
              <th>Categories</th>
              <th>Tags</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="">
            {posts !== null &&
              _.sortBy(posts, "created_at")
                .reverse()
                .map((post) => (
                  <tr>
                    <td>{post.title}</td>
                    <td>{post.slug}</td>
                    <td>{post.content}</td>
                    <td>{post.user && post.user.username}</td>
                    <td>
                      {post.categories.map((catagory) => (
                        <>{catagory.title}</>
                      ))}
                    </td>
                    <td>
                      {post.tags.map((tag) => (
                        <>{tag.title}</>
                      ))}
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY">{post.created_at}</Moment>
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY">{post.updated_at}</Moment>
                    </td>

                    <td>
                      <FaTrashAlt onClick={() => removePost(post.id)} />

                      <FaPencilAlt
                        className="edit-icon"
                        onClick={() => {
                          toggle();
                          setAction("edit");
                          dispatch(getSinglePost(post.id));
                        }}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PostsTable;
