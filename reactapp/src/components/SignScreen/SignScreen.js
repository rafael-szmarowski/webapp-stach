import React from "react";
import { Col, Row, Container } from "reactstrap";

import Header from "../Header";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function SignScreen() {
  return (
    <div className="containerHomeScreen">
      <Header />
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-4 mb-4">
            <SignIn />
          </Col>
          <Col xs={12} md={6} className="mt-4  mb-4">
            <SignUp />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToken: (token) => {
      dispatch({ type: "ADD_TOKEN", token });
    },
  };
};

const mapStateToProps = (state) => {
  return { token: state.token, details: state.details };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignScreen);
