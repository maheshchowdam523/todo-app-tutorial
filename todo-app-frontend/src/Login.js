import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Login(props) {
  const username = useFormInput("");
  const password = useFormInput("");

  // handle button click of login form
  const handleLogin = () => {
    props.validateUser(username, password);
  };

  return (
    <div style={{ textAlign: "center" }}>
      Login<br />
      <br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {props.errorMessage && (
        <>
          <small style={{ color: "red" }}>{props.errorMessage}</small>
          <br />
        </>
      )}
      <br />
      {/*<input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />*/}
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};

export default Login;
