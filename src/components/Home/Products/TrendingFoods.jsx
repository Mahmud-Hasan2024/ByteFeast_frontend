import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import apiClient from "../../../services/api-client";
import ErroAlert from "../../ErroAlert";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const TrendingFoods = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/foods/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="ttext-3xl md:text-4xl font-bold text-neutral-content mb-7">
            🔥 Trending Foods
          </h2>
          <Link
            to="/menu"
            className="btn btn-primary rounded-full px-5 py-2 min-h-0 h-auto font-semibold normal-case transition-all border-none mb-7"
          >
            See All Foods
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        )}

        {error && <ErroAlert error={error} />}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No Foods Available</p>
        )}

        {!loading && !error && products.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mt-4"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default TrendingFoods;
