import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';


const CarouselComp = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autospeed: 1500,
        pauseOnHover: true
    };

    return (
        <div className='carousel-container'>
            <Slider {...settings}>


                <div className="carousel-1"></div>

                <div className="carousel-2"></div>


                <div className="carousel-3"></div>

            </Slider >
            <div className="flex-container" style={{ position: "absolute", top: "40%", width: '100%', flexDirection: "column" }}>
                <p style={{ fontSize: "4rem" }}>Добре дошли на Victory</p>
                <p style={{ fontSize: "2rem" }}>дънки, панталони и дрехи във всякакви размери</p>
                <div>
                    <Button variant="outline-light" size="lg" style={{ width: "15%" }}>ПАЗАРУВАЙТЕ СЕГА</Button>
                </div>
            </div>

        </div >
    )
}

export default CarouselComp;