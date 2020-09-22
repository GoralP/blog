import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Layout } from "../../components";
import { CategoryModal, CategoriesTable } from "../../containers";

const Categories = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <Layout>
      <Container fluid className="home-bg">
        <Row className="shadow table-container bg-white">
          <Col xs="12">
            <Button
              onClick={() => {
                toggle();
                setAction("create");
              }}
              className=" create-button"
            >
              Create Category
            </Button>
          </Col>
          <Col xs="12">
            <CategoriesTable
              setAction={setAction}
              toggle={toggle}
            ></CategoriesTable>
          </Col>

          {modal && (
            <CategoryModal
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

export default Categories;
