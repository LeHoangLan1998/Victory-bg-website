import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


const CarouselComp = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        /* fade: true, */
        autoplay: true,
        autospeed: 1500,
        /* pauseOnHover: true */
    };

    return (
        <div className='carousel-container'>
            <Slider {...settings}>


                {/* <div className="carousel-1"></div> */}
                <Image fluid src="src\assets\pexels-neosiam-603022.jpg"></Image>

                {/* <div className="carousel-2"></div */}
                <Image fluid src="src\assets\pexels-kai-pilger-996329.jpg"></Image>

                {/* <div className="carousel-3"></div> */}
                <Image fluid src="src\assets\pexels-terje-sollie-298863.jpg"></Image>

            </Slider >
            <div className="flex-container" style={{ position: "absolute", top: "40%", width: '100%', flexDirection: "column" }}>
                <p style={{ fontSize: "4rem" }}>Добре дошли на Victory</p>
                <p style={{ fontSize: "2rem" }}>дънки, панталони и дрехи във всякакви размери</p>
                <div>
                    <Button variant="outline-light" size="lg" style={{ width: "15%" }} href="products">ПАЗАРУВАЙТЕ СЕГА</Button>
                </div>
            </div>

        </div >
    )
}

export default CarouselComp;