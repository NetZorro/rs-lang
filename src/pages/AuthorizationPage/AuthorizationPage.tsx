import { useState } from "react";

import { Authorization, Register } from "components/Authorization";

import "./authorizationPage.css";

export const AuthorizationPage = () => {
  const [formRegister, setFormRegister] = useState(false);
  return (
    <div className="authorization">
      {formRegister ? <Register /> : <Authorization />}
      <span className="authorization__handler-login" onClick={() => setFormRegister(!formRegister)}>
        {formRegister ? "Login" : "Register"}
      </span>
    </div>
  );
};
