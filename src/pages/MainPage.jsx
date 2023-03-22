import "./App.css";
import CarouselComp from "../components/CarouselComp";
import NewestProducts from "../components/NewestProducts";
import classes from "./MainPage.module.css";
import { HandCoins, ArrowUDownLeft, PhoneCall } from "@phosphor-icons/react";
import ProductsListPage from "./ProductsListPage";

function MainPage(props) {
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
      <ProductsListPage />
    </>
  );
}

export default MainPage;
