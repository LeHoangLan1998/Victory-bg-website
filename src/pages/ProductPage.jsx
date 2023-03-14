import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";

const ProductPage = () => {
  const [productData, setProductData] = useState({});
  const productCollectionRef = collection(db, "products");
  const [productSize, setProductSize] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
  });

  let { product } = useParams();

  useEffect(() => {
    const q = query(productCollectionRef, where("id", "==", product));

    const unSub = onSnapshot(q, (querySnapshot) => {
      /*  const items = [];
             querySnapshot.forEach((doc) => {
                 items.push(doc.data());
             }); */
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
  };

  //<img src={`..\\src\\assets\\products\\${productData.imageRef}`} /* style={{maxWidth:"50%"}} */></img>

  return (
    <>
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
                `}
      </style>

      <NavBar scrollState={true} />

      <div className="grid-container-product" style={{ marginTop: "8rem" }}>
        <div style={{ padding: "40px" }}>
          <img
            src={`..\\src\\assets\\products\\${productData.imageRef}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          ></img>
        </div>

        <div style={{ textAlign: "start" }}>
          <h2>{productData.productName}</h2>

          <hr></hr>

          <h5>Състав и поддръжка:</h5>
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

          <h5>Дизайн & Характеристики:</h5>
          <ul>
            {productData.length ? <li>Дължина: {productData.length}</li> : null}

            {productData.color ? <li>Цвят: {productData.color}</li> : null}

            {productData.material ? (
              <li>Материя: {productData.material}</li>
            ) : null}
          </ul>

          <p>{productData.price} лв.</p>

          <Row>
            <h6>Размер:</h6>
            <Col>
              {productData.size
                ? productData.size.map((singleSize) => {
                    return (
                      <Button
                        variant="secondary"
                        onClick={() => chooseSize(singleSize)}
                        active={productSize[singleSize]}
                      >
                        {singleSize}
                      </Button>
                    );
                  })
                : null}
            </Col>

            <Col>
              <Button variant="secondary" size="lg">
                КУПИ
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
