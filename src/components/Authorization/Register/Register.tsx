import { useState } from "react";

import { authorization } from "services";
import { IUserReg } from "Entities/IAuthorization";
import "./register.css";

// FIXME: написать валидацию на email и пароль
// FIXME: Сделать уведомления пользоваетля

/**
 * Компонент формы регистрации
 * @returns JSX
 */
export const Register = () => {
  const { register } = authorization;
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
    register(data);
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
