import { useState } from "react";

import { Authorization, Register } from "components/Authorization";

import "./authorizationPage.css";

export const AuthorizationPage = () => {
  const [formRegister, setFormRegister] = useState(false);
  return (
    <div>
      {formRegister ? <Register /> : <Authorization />}
      <span onClick={() => setFormRegister(!formRegister)}>
        {formRegister ? "Login" : "Register"}
      </span>
    </div>
  );
};
