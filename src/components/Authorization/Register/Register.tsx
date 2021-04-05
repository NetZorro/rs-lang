import { useState, useContext } from "react";

import { Context } from "reducer";
import { authorization } from "services";
import { IUserReg } from "interfaces/IAuthorization";
import "./register.css";


/**
 * Компонент формы регистрации
 * @returns JSX
 */
export const Register = () => {
  const { dispatch } = useContext(Context);
  const [data, setData] = useState<IUserReg>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }: React.SyntheticEvent) => {
    let t = target as HTMLInputElement;
    setData({
      ...data,
      [t.name]: t.value,
    } as IUserReg);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    authorization.userReg(data);
  };
  return (
    <div className="authorization__register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="register__block">
          <label>Username</label>
          <input
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="register__name"
          />
        </div>
        <div className="register__block">
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="register__email"
          />
        </div>
        <div className="register__block">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
