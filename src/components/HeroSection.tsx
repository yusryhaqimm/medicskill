// src/components/HeroSection.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      style={{ height: "400px", marginBottom: "50px" }}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundColor: "#1976d2",
            height: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Slide 1: Workshop on Web Development</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundColor: "#388e3c",
            height: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Slide 2: 50% Off on All Courses</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage: 'url("/path-to-image.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button style={{ padding: "10px 20px", fontSize: "18px" }}>
            Explore Now
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
