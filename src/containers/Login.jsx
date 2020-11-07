import { useState } from "react";
import { Auth } from "aws-amplify";
import { Form } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";


export default function Login() {
  const [{
    email,
    password,
  }, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}