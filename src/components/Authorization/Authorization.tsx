import { useState, useContext } from "react";

import { Context } from "reducer";
import { authorization } from "services";
import { IUserAuth } from "interfaces/IAuthorization";
import "./authorization.css";

type AuthorizationContext = {
  state: any;
  dispatch: (action: { type: string; payload: object }) => {};
};

export const Authorization: React.FC = () => {
  const { state, dispatch } = useContext<AuthorizationContext>(Context);
  const [data, setData] = useState<IUserAuth>({
    email: "",
    password: "",
  });
  const handleChange = ({ target }: React.SyntheticEvent) => {
    let t = target as HTMLInputElement;
    setData({
      [t.name]: t.value,
    } as IUserAuth);
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    authorization.userAuth(data, dispatch);
  };
  return (
    <div className="authorization">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
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
