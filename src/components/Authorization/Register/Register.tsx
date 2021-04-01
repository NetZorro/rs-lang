import { useState, useContext } from "react";

import { Context } from "reducer";
import { authorization } from "services";
import { IUserReg } from "interfaces/IAuthorization";

export const Register = () => {
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState<IUserReg>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }: React.SyntheticEvent) => {
    let t = target as HTMLInputElement;
    setData({
      [t.name]: t.value,
    } as IUserReg);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    authorization.userReg(data, dispatch);
  };
  return (
    <div className="authorization">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <input
          name="name"
          placeholder="Email"
          value={data.name}
          onChange={handleChange}
          className="authorization__login"
        />
        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="authorization__login"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
