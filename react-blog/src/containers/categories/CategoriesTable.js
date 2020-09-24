import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories,
  getSingleCategory,
  deleteCategory,
} from "../../redux/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import _ from "lodash";

const CategoriesTable = ({ setAction, toggle }) => {
  const dispatch = useDispatch();

  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.categoryReducers.allCategories.loading,
    categoriesData: state.categoryReducers.allCategories.categoriesData,
  }));

  useEffect(() => {
    dispatch(allCategories());
  }, [dispatch]);

  const removeCategory = (id) => {
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
        dispatch(deleteCategory(id));
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
        <Table className="border table-layout">
          <thead>
            <tr className="table-heading">
              <th>Title</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categoriesData !== null &&
              _.sortBy(categoriesData, "created_at")
                .reverse()
                .map((category) => (
                  <tr>
                    <td>{category.title}</td>
                    <td>{category.slug}</td>
                    <td>{category.description}</td>
                    <td>
                      <Moment format="MMM DD, YYYY">
                        {category.created_at}
                      </Moment>
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY">
                        {category.updated_at}
                      </Moment>
                    </td>

                    <td>
                      <FaTrashAlt onClick={() => removeCategory(category.id)} />

                      <FaPencilAlt
                        className="edit-icon"
                        onClick={() => {
                          toggle();
                          setAction("edit");
                          dispatch(getSingleCategory(category.id));
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

export default CategoriesTable;
