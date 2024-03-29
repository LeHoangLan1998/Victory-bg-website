import Item from "./Item";
import classes from "./NewestProducts.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

const NewestProducts = (props) => {
  //screen size
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  //////////////////////////////////////////////////////////

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: windowSize[0] > 1000 ? 3 : 1,
      spacing: 15,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const products = props.products;

  return (
    <div className={classes.container}>
      <div className={classes["container-custom"]}>
        <h1 style={{ marginBottom: "60px", fontWeight: "100" }}>
          Нови артикули:
        </h1>

        {products && products.length !== 0 ? (
          <div className={classes["navigation-wrapper"]}>
            <div ref={sliderRef} className="keen-slider">
              {products.map((item) => {
                return (
                  <div
                    className="keen-slider__slide number-slide1"
                    key={item.id}
                  >
                    <Item data={item} />
                  </div>
                );
              })}
            </div>

            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewestProducts;

function Arrow(props) {
  const disabeld = props.disabled ? classes["arrow--disabled"] : "";
  return (
    <svg
      onClick={props.onClick}
      className={`${classes.arrow} ${
        props.left ? classes["arrow--left"] : classes["arrow--right"]
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
