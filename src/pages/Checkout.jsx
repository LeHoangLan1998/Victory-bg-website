import { useEffect, useContext, useState } from "react";
import classes from "./Checkout.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ShopContext } from "../context/shop-context";
import { useNavigate } from "react-router";

const Checkout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    cartItemsData,
    changeItemAmount,
    totalPrice,
  } = useContext(ShopContext);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      navigate("/login");
    }
  });

  const [cartInventory, setcartInventory] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    setcartInventory(cartItems);
  }, []);

  return (
    <div className={classes.container}>
      {console.log(cartItems)}
      {console.log(cartItemsData)}
      <h3>Поръчай</h3>
      <div className={classes.subContainer}>
        {Object.keys(cartInventory).map((itemid) => {
          if (cartItems[itemid]) {
            return (
              <div key={itemid} className={classes.cartItem}>
                <img
                  src={`..\\src\\assets\\products\\${cartItemsData[itemid].imageRef}`}
                />

                <div>
                  <h6>
                    {cartItemsData[itemid].productName} - {cartItems[itemid]}{" "}
                    Бройки
                  </h6>
                  <p>Размер: {cartItemsData[itemid].chosenSize}</p>
                </div>

                <div className={classes.priceTag}>
                  {(cartItemsData[itemid].price * cartItems[itemid]).toFixed(2)}{" "}
                  лв.
                </div>
              </div>
            );
          }
        })}

        <div style={{ textAlign: "right" }}>
          Финална цена: {totalPrice(cartItems, cartItemsData).toFixed(2)} лв.
        </div>
      </div>

      <form className={classes.form}>
        <div className={classes.fieldHolder}>
          <input
            id="firstname"
            name="firstname"
            value={data.firstname || ""}
            className={data.firstname ? classes.emailInput : classes.email}
            required
            /* onChange={updateData} */
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
            /* onChange={updateData} */
          />
          <label htmlFor="lastname">Фамилия</label>
        </div>

        <div className={classes.fieldHolder}>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email || ""}
            className={data.email ? classes.emailInput : classes.email}
            required
            /* onChange={updateData} */
          />
          <label htmlFor="email">Имейл</label>
        </div>

        <div className={classes.fieldHolder}>
          <input
            id="telephone"
            name="telephone"
            value={data.telephone || ""}
            required
            autoComplete="on"
            className={data.firstname ? classes.emailInput : classes.email}
            /* onChange={updateData} */
          />
          <label htmlFor="telephone">Телефонен номер</label>
        </div>

        <div className={classes.fieldHolder}>
          <input
            id="address"
            name="address"
            value={data.address || ""}
            required
            autoComplete="on"
            className={data.firstname ? classes.emailInput : classes.email}
            /* onChange={updateData} */
          />
          <label htmlFor="address">Адрес или офис на куриер</label>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
