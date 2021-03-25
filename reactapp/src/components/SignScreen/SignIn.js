import React, { useState } from "react";
import { Button,  Input, InputGroup } from "reactstrap";

import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import { useHistory } from "react-router-dom";

function SignIn({ onAddToken, token, details, location }) {
  const [loading, setLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  let history = useHistory();

  const handleSubmitSignin = async () => {
    setLoading(true);
    const data = await fetch(`/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    });
    const body = await data.json();
    setLoading(false);
    if (!body.result) {
      setEmailError(body.emailNotFound);
      setPasswordError(body.invalidPassword);
    } else {
      onAddToken(body.token);
      if (details.shopDetailsID) {
        history.push("/AppointmentScreen");
      } else {
        history.push(`/`);
      }
    }

    switch (body.error) {
      case '"email" is not allowed to be empty':
        setEmailError("L'e-mail ne doit pas être vide");
        break;
      case '"email" must be a valid email':
        setEmailError("L'e-mail doit être une adresse e-mail valide");
        break;
      case '"email" length must be at least 6 characters long':
        setEmailError(
          "La longueur de l'e-mail doit comporter au moins 6 caractères"
        );
        break;
      case '"password" length must be at least 6 characters long':
        setPasswordError(
          "La longueur du mot de passe doit comporter au moins 6 caractères"
        );
        break;
      case '"password" is not allowed to be empty':
        setPasswordError("Le mot de passe ne doit pas être vide ");
        break;

      default:
        break;
    }
  };

  return (
    <div className="signForm">
      <h1 style={{ marginBottom: 26 }}>Se connecter</h1>

      <InputGroup>
        <Input
          type="text"
          placeholder="E-mail"
          className="inputSignUp mb-4"
          value={signInEmail}
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
        />
      </InputGroup>
      {emailError !== null && <h6 style={{ color: "red" }}>{emailError}</h6>}
      <InputGroup>
        <Input
          type="password"
          placeholder="Mot de passe"
          className="inputSignUp mb-4"
          value={signInPassword}
          onChange={(e) => {
            setSignInPassword(e.target.value);
          }}
        />
      </InputGroup>
      {passwordError !== null && (
        <h6 style={{ color: "red" }}>{passwordError}</h6>
      )}
      <Button
        style={{ backgroundColor: "#4280AB" }}
        disabled={loading}
        onClick={() => handleSubmitSignin()}
      >
        {loading ? `Chargement...` : `Valider`}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
