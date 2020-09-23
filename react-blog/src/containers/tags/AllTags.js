import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../../redux/actions";
import Loader from "react-loader-spinner";

const AllTags = () => {
  const dispatch = useDispatch();

  const { loading, tagsData } = useSelector((state) => ({
    loading: state.tagReducers.allTags.loading,
    tagsData: state.tagReducers.allTags.tagsData,
  }));

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  return (
    <Layout>
      <Container fluid className="home-bg">
        <Row className="shadow mx-1 tags-title-container bg-white">
          <Col sm="12" className="tags-title">
            Tags
          </Col>
          <Col xs="12">
            {loading ? (
              <Loader type="Oval" color="#00BFFF" height={40} width={40} />
            ) : (
              <>
                {tagsData !== null &&
                  tagsData
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((tags) => (
                      <Button className="tags-title-button">
                        #{tags.title}
                      </Button>
                    ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AllTags;
