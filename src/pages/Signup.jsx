import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { Button } from "react-bootstrap";
import classes from "./Login.module.css";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const usersCollectionRef = collection(db, "users");

  const updateData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      username: `${data.firstname} ${data.lastname}`,
      password: data.password,
      email: data.email,
      createdAt: serverTimestamp(),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCrendential) => {
        //Signed in
        /* const user = userCrendential.user;
        console.log(user); */
        createUser();
        navigate("/");
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

          <div style={{ display: "flex", gap: "10rem" }}>
            <div className={classes.fieldHolder}>
              <input
                id="firstname"
                name="firstname"
                value={data.firstname || ""}
                className={data.firstname ? classes.emailInput : classes.email}
                required
                onChange={updateData}
              />
              <label htmlFor="firstname">Име</label>
            </div>

            <div className={classes.fieldHolder}>
              <input
                id="lastname"
                name="lastname"
                value={data.lastname || ""}
                className={data.lastname ? classes.emailInput : classes.email}
                required
                onChange={updateData}
              />
              <label htmlFor="lastname">Фамилия</label>
            </div>
          </div>

          <div className={classes.fieldHolder}>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email || ""}
              className={data.email ? classes.emailInput : classes.email}
              required
              onChange={updateData}
            />
            <label htmlFor="email">Имейл</label>
          </div>

          <div className={classes.fieldHolder}>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password || ""}
              required
              autoComplete="on"
              className={classes.password}
              onChange={updateData}
            />
            <label htmlFor="password">Парола</label>
          </div>

          <div className={classes.fieldHolder}>
            <input
              id="passwordConf"
              name="passwordConf"
              type="password"
              value={data.passwordConf || ""}
              required
              autoComplete="on"
              className={`${classes.password} ${
                data.passwordConf === data.password ? "" : classes.passwordConf
              }`}
              onChange={updateData}
            />
            <label htmlFor="passwordConf">Повторете паролата</label>
          </div>

          <Button type="submit" variant="outline-dark" size="lg">
            Регистрирайте се
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
