import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Button } from "react-bootstrap";
import classes from "./Login.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCrendential) => {
        //Signed in
        const user = userCrendential.user;
        console.log(user);
        navigate("/login");
        //...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        //...
      });
  };

  const customStyle = () => {
    return (
      <style type="text/css">
        {`
        .btn-lg {
        --bs-btn-font-size: 1.rem;
        --bs-btn-border-radius: 0;      
        }
        `}
      </style>
    );
  };

  return (
    <div className={classes.container}>
      {customStyle()}
      <div className={classes.subContainer}>
        <form onSubmit={onSubmit}>
          <h6 style={{ marginBottom: "5rem", textTransform: "uppercase" }}>
            Лични данни
          </h6>
          <div className={classes.fieldHolder}>
            <input
              id="email"
              type="email"
              value={email}
              className={email ? classes.emailInput : classes.email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Имейл</label>
          </div>
          <div className={classes.fieldHolder}>
            <input
              id="password"
              type="password"
              value={password}
              required
              className={classes.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Парола</label>
          </div>
          <Button type="submit" variant="outline-dark" size="lg">
            Започнете сесия
          </Button>
        </form>
        <div>
          <h6 style={{ marginBottom: "3rem", textTransform: "uppercase" }}>
            Вече имате създаден профил?
          </h6>
          <Button
            type="submit"
            variant="outline-dark"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Влезте тук
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
