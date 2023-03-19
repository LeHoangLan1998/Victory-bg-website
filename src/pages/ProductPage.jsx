import { db } from "../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import classes from "./ProductPage.module.css";
import { ShopContext } from "../context/shop-context";

const ProductPage = () => {
  const [productData, setProductData] = useState({});
  const productCollectionRef = collection(db, "products");
  const [productSize, setProductSize] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
  });
  const [modal, setModal] = useState(false);

  const { addToCart, cartItems } = useContext(ShopContext);
  let { product } = useParams();

  useEffect(() => {
    const q = query(productCollectionRef, where("id", "==", product));

    const unSub = onSnapshot(q, (querySnapshot) => {
      let items = {};
      querySnapshot.forEach((doc) => {
        items = doc.data();
      });
      setProductData(items);
    });
    return () => {
      unSub();
    };
  }, []);

  const chooseSize = (size) => {
    setProductSize({ S: false, M: false, L: false, XL: false });
    setProductSize((values) => ({ ...values, [size]: true }));
    setProductData((prev) => ({ ...prev, chosenSize: size }));
  };

  const sizePicked = (sizeObj) => {
    for (const size in sizeObj) {
      if (sizeObj[size] === true) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={classes.container}>
      <style type="text/css">
        {`
            .btn-sizeButton {
              --bs-btn-color: #000;
              --bs-btn-bg: #fff;
              --bs-btn-border-color: grey;
              
              --bs-btn-hover-bg: #grey;
              --bs-btn-hover-border-color: #0a58ca;
                --bs-btn-focus-shadow-rgb: 49,132,253;
                
                --bs-btn-active-color: #fff;
              }
              .btn-custom-size {
                color: black;
                --bs-btn-border-radius: 50%;
                width: 35px;
                height: 35px;
                padding: 0;
              }
              .btn-custom-size:hover {
                border: 1px solid black;
              }
              .btn.active {
                --bs-btn-border-radius: 50%;
                color: white;
                background-color: black;
              }

              .btn-lg {
                --bs-btn-font-size: 1.rem;
                --bs-btn-border-radius: 0;
                /* max-width: 230px; */
              }
                `}
      </style>

      {console.log(productData)}
      {console.log(cartItems)}

      <div className={classes["grid-container-product"]}>
        <div className={classes.image}>
          <img
            src={`..\\src\\assets\\products\\${productData.imageRef}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          ></img>
        </div>

        <div className={classes["details-container"]}>
          <h2 style={{ fontWeight: "100" }}>{productData.productName}</h2>

          <hr />

          <p>BGN {productData.price} лв.</p>

          <div className={classes["size-container"]}>
            {productData.size
              ? productData.size.map((singleSize) => {
                  return (
                    <Button
                      key={singleSize}
                      variant="custom-size"
                      onClick={() => chooseSize(singleSize)}
                      active={productSize[singleSize]}
                    >
                      {singleSize}
                    </Button>
                  );
                })
              : null}
          </div>

          <h5 style={{ fontWeight: "100" }}>Състав и поддръжка:</h5>
          <ul>
            {productData.material ? (
              <li>Материя: {productData.material}</li>
            ) : null}
            {productData.treatmentInstructions ? (
              <li>
                Инструкция за третиране: {productData.treatmentInstructions}
              </li>
            ) : null}
          </ul>

          <h5 style={{ fontWeight: "100" }}>Дизайн & Характеристики:</h5>
          <ul>
            {productData.length ? <li>Дължина: {productData.length}</li> : null}

            {productData.color ? <li>Цвят: {productData.color}</li> : null}

            {productData.material ? (
              <li>Материя: {productData.material}</li>
            ) : null}
          </ul>

          <Button
            variant="outline-dark"
            size="lg"
            onClick={() => {
              sizePicked(productSize)
                ? addToCart(
                    productData.id + "-" + productData.chosenSize,
                    productData
                  )
                : setModal(true);
            }}
          >
            Добави в кошницата
          </Button>

          <AlertSize
            show={modal}
            onHide={() => {
              setModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const AlertSize = (props) => {
  return (
    <Modal {...props} size="sm" centered>
      <Modal.Body>
        <div className={classes["modal-container"]}>
          <h6>Предупреждение</h6>
          <p>Моля, изберете размер.</p>
          <Button variant="outline-dark" size="lg" onClick={props.onHide}>
            Разбрах
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductPage;
