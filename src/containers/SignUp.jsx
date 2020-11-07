import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Alert, Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./SignUp.css";
import { LinkContainer } from "react-router-bootstrap";

export default function SignUp() {
  const [{
    email,
    password,
    confirmPassword,
    confirmationCode,
  }, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {

      if (e.code === 'UsernameExistsException') {
        setNewUser({ username: email });
        setErrorMessage(<span>Username already exists. Please enter the verification code or try to <LinkContainer to="/login"><Alert.Link>login</Alert.Link></LinkContainer></span>);
      } else {
        onError(e);
      }
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bsSize="large">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={confirmationCode}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
        </Form.Group>

        <LoaderButton
          block
          type="submit"
          size="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="password" size="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" size="large">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={confirmPassword}
          />
        </Form.Group>

        <LoaderButton
          block
          type="submit"
          size="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }
  return (
    <div className="Signup">
      {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}