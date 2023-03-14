import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import classes from "./CarouselComp.module.css";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const CarouselComp = () => {
  //keen-slider
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className={classes.carouselContainer}>
      <div
        ref={sliderRef}
        className="keen-slider"
        style={{ maxHeight: "85vh" }}
      >
        <div className="keen-slider__slide">
          <Image fluid src="src\assets\pexels-neosiam-603022.jpg"></Image>
        </div>

        <div className="keen-slider__slide">
          <Image fluid src="src\assets\pexels-kai-pilger-996329.jpg"></Image>
        </div>

        <div className="keen-slider__slide">
          <Image fluid src="src\assets\pexels-terje-sollie-298863.jpg"></Image>
        </div>
      </div>
      <div
        className="flex-container"
        style={{
          position: "absolute",
          top: "40%",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: "4rem" }}>
          Добре дошли във{" "}
          <span className="carousel-title">Victory online!</span>
        </p>
        <p style={{ fontSize: "2rem" }}>
          дънки, панталони и дрехи във всякакви размери
        </p>
        <div>
          <Button
            variant="outline-light"
            size="lg"
            style={{ width: "15%" }}
            href="products"
          >
            ПАЗАРУВАЙТЕ СЕГА
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselComp;
