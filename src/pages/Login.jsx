import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <style type="text/css">
        {`
    .btn-lg {
      --bs-btn-font-size: 1.rem;
      --bs-btn-border-radius: 0;      
    }
    `}
      </style>

      <div className={classes.container}>
        <div className={classes.subContainer}>
          <form className={classes.form} onSubmit={onLogin}>
            <h6 style={{ marginBottom: "5rem", textTransform: "uppercase" }}>
              Влезте в профила си
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
                autoComplete="on"
                className={classes.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Парола</label>
            </div>

            <Button type="submit" variant="outline-dark" size="lg">
              Започнете сесия
            </Button>
          </form>
          <div
          /* style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }} */
          >
            <h6 style={{ marginBottom: "3rem", textTransform: "uppercase" }}>
              Нямате профил?
            </h6>
            <Button
              type="submit"
              variant="outline-dark"
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Регистрирайте се
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
