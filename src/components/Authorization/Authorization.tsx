import { useContext } from "react";
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
        setSubmitting(false);
      }
    });
  };

  const handlerValidate = (values: { email: string; password: string }) => {
    const errors: { email?: string } = {};
    // TODO: доделать валидацию и сделать в регистрацие 
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password) console.log("yes");
    return errors;
  };

  return (
    <div className="authorization__login">
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
              {errors.email && touched.email && errors.email}
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
              {errors.password && touched.password && errors.password}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
