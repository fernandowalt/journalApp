import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    name: "walter",
    email: "fernan@gmail.com",
    password: "123456",
    confirm: "123456",
  });

  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const { name, email, password, confirm } = formValues;

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is no valid"));
    } else if (password !== confirm || password.length < 5) {
      dispatch(setError("password should be at least characters"));
    } else {
      dispatch(removeError());
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
     dispatch(startRegisterWithEmailPassword(email,password,name)) 
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister} class="animate__animated animate__fadeIn animate__faster">
        {msgError && <div className="auth__alert-error"> {msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm"
          name="confirm"
          value={confirm}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link mt-5" to="/auth/login">
          Already Register?
        </Link>
      </form>
    </>
  );
};
