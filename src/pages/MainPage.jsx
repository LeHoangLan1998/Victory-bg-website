import { useEffect, useState } from "react";
import "./App.css";
import CarouselComp from "../components/CarouselComp";
import NewestProducts from "../components/NewestProducts";
import Item from "../components/Item";
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
  orderBy,
  limit,
} from "firebase/firestore";
import classes from "./MainPage.module.css";
import { HandCoins, ArrowUDownLeft, PhoneCall } from "@phosphor-icons/react";
import ProductsListPage from "./ProductsListPage";

function MainPage(props) {
  /* const [products, setProducts] = useState([]);
  const usersCollectionRef = collection(db, "products"); */

 /*  useEffect(() => {
    const q = query(usersCollectionRef, orderBy("DateAdded", "desc"), limit(5));
    const getProducts = async () => {
      const data = await getDocs(q, usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    if (products.length === 0) {
      getProducts();
    }
  }, []); */

  return (
    <>
      <CarouselComp />
      <div className={classes.infoBar}>
        <div className={classes["info-element"]}>
          <HandCoins color="white" size="1rem" /> <p>Наложен платеж</p>
        </div>
        <div className={classes["info-element"]}>
          <ArrowUDownLeft color="white" size="1rem" />{" "}
          <p>30 дни право на връщане</p>
        </div>
        <div className={classes["info-element"]}>
          <PhoneCall color="white" size="1rem" />{" "}
          <p>Телефон за връзка: +359 884 35 35 89</p>
        </div>
      </div>

      <NewestProducts products={props.firestoreData} />

      {/* <h2 style={{ marginBottom: "30px", fontWeight: "100" }}>
        Най-търсени продукти:
      </h2> */}
      {/* <div className="grid-container">
        {products.map((product) => {
          return <Item data={product} key={product.id} />;
        })}
      </div> */}
      <ProductsListPage />
    </>
  );
}

export default MainPage;
