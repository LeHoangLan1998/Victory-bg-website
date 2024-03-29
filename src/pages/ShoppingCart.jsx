import { useEffect, useContext, useState } from "react";
import classes from "./ShoppingCart.module.css";
import { ShopContext } from "../context/shop-context";
import { Plus, Minus } from "phosphor-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const ShoppingCart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    cartItemsData,
    changeItemAmount,
    totalPrice,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [cartInventory, setcartInventory] = useState({});

  useEffect(() => {
    setcartInventory(cartItems);
  }, []);

  return (
    <div className={classes.container}>
      {console.log(cartItems)}
      {console.log(cartItemsData)}
      <div className={classes.subContainer}>
        {Object.keys(cartInventory).map((itemid) => {
          if (cartItems[itemid]) {
            return (
              <div key={itemid} className={classes.cartItem}>
                <img
                  src={`..\\src\\assets\\products\\${cartItemsData[itemid].imageRef}`}
                />

                <div>
                  <h6>{cartItemsData[itemid].productName}</h6>
                  <p>Размер: {cartItemsData[itemid].chosenSize}</p>

                  <div className={classes.amount}>
                    <Minus
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFromCart(itemid)}
                    />
                    <input
                      type="number"
                      name={itemid}
                      value={cartItems[itemid]}
                      onChange={changeItemAmount}
                      onKeyDown={(e) => {
                        if (e.key === "+" || e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Plus
                      style={{ cursor: "pointer" }}
                      onClick={() => addToCart(itemid)}
                    />
                  </div>
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

      <style type="text/css">
        {`
    .btn-lg {
      --bs-btn-font-size: 1.rem;
      --bs-btn-border-radius: 0;
      width: 30%    
    }
    `}
      </style>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => {
            navigate("/checkout");
          }}
          disabled = {Object.keys(cartItems).length === 0 ? true : false}
        >
          Финализиране на поръчката
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
