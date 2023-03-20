import Item from "./Item";
import classes from "./NewestProducts.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";

const NewestProducts = () => {
  const usersCollectionRef = collection(db, "products");
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(usersCollectionRef, orderBy("DateAdded", "desc"), limit(5));
    const getProducts = async () => {
      const data = await getDocs(q, usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  return (
    <div className={classes.container}>
      {console.log(products)}
      <div className={classes["container-custom"]}>
        <h2 style={{ marginBottom: "60px", fontWeight: "100" }}>
          Нови артикули:
        </h2>

        {products.length !== 0 ? (
          <div ref={sliderRef} className="keen-slider">
            {products.map((item) => {
              return (
                <div className="keen-slider__slide number-slide1" key={item.id}>
                  <Item data={item} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewestProducts;
