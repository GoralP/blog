import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Layout } from "../../components";
import { PostModal, PostsTable } from "../../containers";

const Posts = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <Layout>
      <Container fluid className="home-bg">
        <Row className="shadow table-container bg-white">
          <Col xs="12">
            <Button
              color="primary"
              onClick={() => {
                toggle();
                setAction("create");
              }}
              className="create-button"
            >
              Create Post
            </Button>
          </Col>
          <Col xs="12">
            <PostsTable setAction={setAction} toggle={toggle}></PostsTable>
          </Col>

          {modal && (
            <PostModal
              modal={modal}
              action={action}
              setModal={setModal}
              toggle={toggle}
            />
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default Posts;
