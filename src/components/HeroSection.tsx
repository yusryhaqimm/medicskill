import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type HeroSectionItem = {
  id: number;
  title: string;
  subtitle: string | null;
  media: string; // URL of the image or video
  button_text?: string | null;
  button_link?: string | null;
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
          <div
            style={{
              backgroundImage: item.media.endsWith(".mp4")
                ? undefined
                : `url(${item.media})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {item.media.endsWith(".mp4") ? (
              <video
                src={item.media}
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
            <div
              style={{
                textAlign: "center",
                backgroundColor: item.media.endsWith(".mp4")
                  ? "rgba(0, 0, 0, 0.5)"
                  : "transparent",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h1>{item.title}</h1>
              {item.subtitle && <p>{item.subtitle}</p>}
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
