import { Formik } from "formik";
import cl from "classnames";

import { authorization } from "services";
import { IUserReg } from "Entities";
import "./register.css";
import { useState } from "react";

/**
 * Компонент формы регистрации
 * @returns JSX
 */
export const Register = () => {
  const [showMessage, setShowMessage] = useState<any>();
  const { register } = authorization;

  const handlerValidate = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const errors: { email?: string; password?: string; name?: string } = {};
    const { email, password, name } = values;

    if (!name) {
      errors.name = "Required";
    } else if (name.length < 4) {
      errors.name = "Invalid name";
    }
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

  const handlerSubmit = (values: IUserReg, { setSubmitting }: any) => {
    setSubmitting(true);

    register(values).then(({ status, data }) => {
      if (status === 200) {
        setShowMessage(messageRegister[0]);
      } else if (status === 417) {
        setShowMessage(messageRegister[1]);
      } else if (status === 422) {
        setShowMessage(messageRegister[2]);
      }
    });

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
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
        <form className="register__form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="register__block">
            <label>Name</label>
            <input
              type="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="register__name"
            />
            <span
              className={cl("register__warning_off", {
                register__warning: errors.name && touched.name,
              })}
            >
              {errors.name && touched.name && errors.name}
            </span>
          </div>
          <div className="register__block">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="register__email"
            />
            <span
              className={cl("register__warning_off", {
                register__warning: errors.email && touched.email,
              })}
            >
              {errors.email && touched.email && errors.email}
            </span>
          </div>
          <div className="register__block">
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
              className={cl("register__warning_off", {
                register__warning: errors.password && touched.password,
              })}
            >
              {errors.password && touched.password && errors.password}
            </span>
          </div>
          {showMessage}
          <button
            className="register__submit-button"
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

const messageRegister = [
  <span className="register__message-okey">Successfully</span>,
  <span className="register__message-error">This user already exists</span>,
  <span className="register__message-error">You need to enter a name</span>,
];
