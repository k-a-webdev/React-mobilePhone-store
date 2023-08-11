import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
    const slideText = [
        "Here you will find the best phone options",
        "The latest models",
        "Today's style",
        "An affordable price for each of you",
    ];

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            className="slider"
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        >
            {Array(4)
                .fill("")
                .map((el, index) => (
                    <SwiperSlide className="slide_wrapper" key={index}>
                        <div
                            className="slide"
                            style={{
                                backgroundImage: `url(img/slides/slide_${
                                    index + 1
                                }.webp)`,
                            }}
                        >
                            <h1>{slideText[index]}</h1>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
