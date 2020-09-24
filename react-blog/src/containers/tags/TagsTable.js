import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { allTags, getSingleTag, deleteTag } from "../../redux/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import _ from "lodash";

const Tags = ({ setAction, toggle }) => {
  const dispatch = useDispatch();

  const { loading, tagsData } = useSelector((state) => ({
    loading: state.tagReducers.allTags.loading,
    tagsData: state.tagReducers.allTags.tagsData,
  }));

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  const removeTag = (id) => {
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
        dispatch(deleteTag(id));
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
        <Loader
          type="Oval"
          color="#00BFFF"
          height={40}
          width={40}
          className="my-2"
        />
      ) : (
        <Table responsive className="border table-layout">
          <thead className="table-heading">
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tagsData !== null &&
              _.sortBy(tagsData, "created_at")
                .reverse()
                .map((tag) => (
                  <tr>
                    <td>{tag.title}</td>
                    <td>{tag.slug}</td>
                    <td>{tag.description}</td>
                    <td>
                      <Moment format="MMM DD, YYYY">{tag.created_at}</Moment>
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY">{tag.updated_at}</Moment>
                    </td>

                    <td>
                      <FaTrashAlt onClick={() => removeTag(tag.id)} />
                      <FaPencilAlt
                        className="edit-icon"
                        onClick={() => {
                          toggle();
                          setAction("edit");
                          dispatch(getSingleTag(tag.id));
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

export default Tags;
