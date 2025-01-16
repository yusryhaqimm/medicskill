import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type HeroSectionItem = {
  id: number;
  media: string; // URL of the image or video
};

const HeroSection = () => {
  const [heroItems, setHeroItems] = useState<HeroSectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/homepage/hero/"
        );
        console.log("HeroSection API Response:", response.data); // Debugging
        if (Array.isArray(response.data)) {
          setHeroItems(response.data);
        } else {
          console.error("HeroSection API did not return an array");
          setHeroItems([]);
        }
      } catch (error) {
        console.error("Error fetching HeroSection data:", error);
        setHeroItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (heroItems.length === 0) {
    return <div>No hero content available.</div>;
  }

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
      {heroItems.map((item) => (
        <SwiperSlide key={item.id}>
          {item.media.endsWith(".mp4") ? (
            <video
              src={item.media}
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                backgroundImage: `url(${item.media})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: "100%",
                transform: "translateY(10px)", // Move the image down
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
