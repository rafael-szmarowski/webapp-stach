import React, { useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";

import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

function SignUp({ onAddToken, details }) {
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [emailErrorSignUp, setEmailErrorSignUp] = useState(null);
  const [passwordErrorSignUp, setPasswordErrorSignUp] = useState(null);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [inputError, setInputError] = useState(null);

  let history = useHistory();

  const handleSubmitSignUp = async () => {
    setLoadingSignUp(true);
    const data = await fetch(`/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        phoneNumber: signUpPhoneNumber,
        email: signUpEmail,
        password: signUpPassword,
      }),
    });

    const body = await data.json();
    setLoadingSignUp(false);
    if (!body.result) {
      setEmailErrorSignUp(body.emaiExist);
      setPasswordErrorSignUp(body.invalidPassword);
    } else {
      onAddToken(body.token);
      if (details.shopDetailsID) {
        history.push("/AppointmentScreen");
      } else {
        history.push(`/`);
      }
    }

    if (body.error) {
      setInputError("Un des champs n'est pas valide");
    } else {
      setInputError(null);
    }
  };

  return (
    <div className="signForm">
      <h1 style={{ marginBottom: 26 }}>S'inscrire</h1>

      <InputGroup>
        <Input
          type="text"
          placeholder="Prenom"
          className="inputSignUp mb-4"
          value={signUpFirstName}
          onChange={(e) => {
            setSignUpFirstName(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          placeholder="Nom de famille"
          className="inputSignUp mb-4"
          value={signUpLastName}
          onChange={(e) => {
            setSignUpLastName(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          placeholder="Mot de passe"
          className="inputSignUp mb-4"
          value={signUpPassword}
          onChange={(e) => {
            setSignUpPassword(e.target.value);
          }}
        />
      </InputGroup>
      {passwordErrorSignUp !== null && (
        <h6 style={{ color: "red" }}>{passwordErrorSignUp}</h6>
      )}
      <InputGroup>
        <Input
          type="text"
          placeholder="Telephone"
          className="inputSignUp mb-4"
          value={signUpPhoneNumber}
          onChange={(e) => {
            setSignUpPhoneNumber(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          placeholder="E-mail"
          className="inputSignUp mb-4"
          value={signUpEmail}
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        />
      </InputGroup>
      {emailErrorSignUp !== null && (
        <h6 style={{ color: "red" }}>{emailErrorSignUp}</h6>
      )}
      {inputError !== null && <h6 style={{ color: "red" }}>{inputError}</h6>}
      <Button
        style={{ backgroundColor: "#4280AB" }}
        disabled={loadingSignUp}
        onClick={() => handleSubmitSignUp()}
      >
        {loadingSignUp ? `Chargement...` : `Valider`}
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
