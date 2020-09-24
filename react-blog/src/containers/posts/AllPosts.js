import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../redux/actions";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Loader from "react-loader-spinner";
import { FaUser, FaCalendarAlt, FaList, FaTags } from "react-icons/fa";
import _ from "lodash";
import blogs from "../../images/blog-post.jpg";

const AllPosts = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => ({
    loading: state.postReducers.allPosts.loading,
    posts: state.postReducers.allPosts.posts,
  }));

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  return (
    <Layout>
      <Container className="home-bg " fluid={true}>
        <h2 className="allpost-heading">All Posts</h2>
        {loading ? (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={40}
            width={40}
            className="my-2"
          />
        ) : (
          <>
            {posts !== null &&
              _.sortBy(posts, "created_at")
                .reverse()
                .map((post) => (
                  <Row className="card">
                    <Col
                      sm="12"
                      className="text-info font-weight-bold allpost-card-title"
                    >
                      {post.title}
                    </Col>
                    <Col sm="12" className="blog-text">
                      <Row>
                        <Col sm="3">
                          <img
                            alt="Blog"
                            className="allpost-card-image"
                            src={
                              post.featured_media
                                ? `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                                : blogs
                            }
                          />
                        </Col>

                        <Col sm="9">
                          <p className="line-clamp ">
                            {post.content.substring(0, 270) + "..."}
                          </p>

                          <Button className="read-more-button">
                            <Link
                              className="read-more-text"
                              to={`${post.slug}-${post.id}`}
                            >
                              Read More
                            </Link>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12">
                      <FaUser /> by
                      <span className="text-info blog-user-text">
                        {post.user && post.user.username}
                      </span>
                      |
                      <FaCalendarAlt className="blog-user-text" />
                      <Moment format="MMM DD, YYYY">{post.created_at}</Moment> |
                      <FaList className="blog-user-text" /> Categories :
                      {post.categories.map((catagory) => (
                        <span className="tags-button bg-info font-weight-bold">
                          {catagory.title}
                        </span>
                      ))}
                      <span className="icon-tags">|</span>
                      <FaTags className="blog-user-text" />
                      Tags :
                      {post.tags.map((tag) => (
                        <span className="tags-button bg-info font-weight-bold">
                          {tag.title}
                        </span>
                      ))}
                    </Col>
                  </Row>
                ))}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default AllPosts;
