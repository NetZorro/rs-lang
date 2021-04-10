import { useContext, useState } from "react";
import cl from "classnames";
import { Formik } from "formik";

import { Context } from "reducer";
import { authorization } from "services";
import { loginUser } from "utils/lib";
import "./authorization.css";

type AuthorizationContext = {
  state: any;
  dispatch: (action: { type: string; payload: object }) => {};
};

/**
 * Компонент формы авторизации
 * @returns JSX
 */
export const Authorization: React.FC = () => {
  const { dispatch } = useContext<AuthorizationContext>(Context);
  const [showMessage, setShowMessage] = useState<any>();
  const { sigIn } = authorization;

  const handlerSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    setSubmitting(true);

    sigIn(values).then(({ status, data }) => {
      if (status === 200) {
        dispatch(loginUser(data));
        sessionStorage.setItem("user", JSON.stringify(data));
        setShowMessage(messageAuthorization[0]);
      } else if (status === 403) {
        setShowMessage(messageAuthorization[1]);
      } else if (status === 404) {
        setShowMessage(messageAuthorization[2]);
      }
      setSubmitting(false);
    });
  };

  const handlerValidate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};
    const { email, password } = values;

    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Required";
    } else if (
      !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(
        password
      )
    ) {
      errors.password =
        "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={handlerValidate}
      onSubmit={handlerSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="login__block">
            <label>Email</label>
            <input
              className="login__input-email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span
              className={cl("login__warning-block_off", {
                "login__warning-block": errors.email && touched.email,
              })}
            >
              {errors.email && touched.email && errors.email}
            </span>
          </div>
          <div className="login__block">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <span
              className={cl("login__warning-block_off", {
                "login__warning-block": touched.password && errors.password,
              })}
            >
              {errors.password && touched.password && errors.password}
            </span>
          </div>
          {showMessage}
          <button
            className="login__submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};


const messageAuthorization = [
  <span className="login__message-okey">You entered</span>,
  <span className="login__message-error">Invalid Password</span>,
  <span className="login__message-error">No such user found</span>,
];
