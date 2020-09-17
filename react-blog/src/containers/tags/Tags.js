import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Header } from "../../components";
import { TagModal, TagsTable } from "../../containers";

const Tags = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <>
      <Header></Header>

      <Container fluid className="home-bg">
        <Row className="shadow table-container bg-white">
          <Col xs="12">
            <Button
              color="primary"
              onClick={() => {
                toggle();
                setAction("create");
              }}
              className="mt-3 create-button"
            >
              Create Tag
            </Button>
          </Col>

          <Col xs="12">
            <TagsTable setAction={setAction} toggle={toggle}></TagsTable>
          </Col>
          {modal && (
            <TagModal
              modal={modal}
              action={action}
              setModal={setModal}
              toggle={toggle}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default Tags;
