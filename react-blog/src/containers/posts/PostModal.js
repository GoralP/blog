import React, { useEffect } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
  allCategories,
  allTags,
} from "../../redux/actions";
import Loader from "react-loader-spinner";

const postsSchema = yup.object().shape({
  title: yup.string().required("Title is a required field."),
  slug: yup.string().required("Slug is a required field."),
  content: yup.string().required("Content is a required field."),
});

const PostModal = ({ modal, setModal, toggle, action }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(postsSchema),
  });

  const dispatch = useDispatch();

  const { loading, post, categoriesData, tagsData } = useSelector((state) => ({
    loading: state.postReducers.getSinglePost.loading,
    post: state.postReducers.getSinglePost.post,
    categoriesData: state.categoryReducers.allCategories.categoriesData,
    tagsData: state.tagReducers.allTags.tagsData,
  }));

  useEffect(() => {
    dispatch(allCategories());
    dispatch(allTags());
  }, [dispatch]);

  const userid = localStorage.getItem("userid");

  const onSubmit = (data) => {
    const user = userid;
    const newUser = { ...data, user };
    action === "create"
      ? dispatch(createPost(newUser, setModal))
      : dispatch(updatePost(data, post.id, setModal));
  };

  return (
    <Modal isOpen={modal}>
      <ModalHeader toggle={toggle}>
        {action === "create" ? "Create Post" : "Update Post"}
      </ModalHeader>

      {loading ? (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={40}
          width={40}
          className="my-2"
        />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormGroup>
              <Label> Title </Label>:
              <Controller
                as={Input}
                control={control}
                name="title"
                type="text"
                placeholder="Enter Title"
                defaultValue={
                  action === "edit" ? post !== null && post.title : ""
                }
                ref={register}
                className={errors && errors.title ? "is-invalid" : ""}
              />
              {errors && errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Slug</Label>
              <Controller
                as={Input}
                control={control}
                name="slug"
                type="text"
                placeholder="Enter Title"
                defaultValue={
                  action === "edit" ? post !== null && post.slug : ""
                }
                ref={register}
                className={errors && errors.slug ? "is-invalid" : ""}
              />
              {errors && errors.slug && (
                <span className="text-danger">{errors.slug.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label> Content </Label>:
              <Controller
                as={Input}
                control={control}
                name="content"
                type="textarea"
                placeholder="Enter Content"
                defaultValue={
                  action === "edit" ? post !== null && post.content : ""
                }
                ref={register}
                className={errors && errors.content ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.content && (
                <span className="text-danger">{errors.content.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label> Categories </Label>:
              <Controller
                as={Select}
                options={categoriesData}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.title}
                control={control}
                name="categories"
                isMulti
                defaultValue={
                  action === "edit" ? post !== null && post.categories : ""
                }
                ref={register}
                className={errors && errors.categories ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.categories && (
                <span className="text-danger">{errors.categories.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label> Tags </Label>:
              <Controller
                as={Select}
                options={tagsData}
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.title}
                control={control}
                name="tags"
                isMulti
                defaultValue={
                  action === "edit" ? post !== null && post.tags : ""
                }
                ref={register}
                className={errors && errors.tags ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.tagsText && (
                <span className="text-danger">{errors.tags.message}</span>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              {action === "create" ? "Add" : "Update"}
            </Button>
            <Button color="secondary" onClick={toggle}>
              cancel
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Modal>
  );
};

export default PostModal;
