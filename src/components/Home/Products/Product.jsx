import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Navigation, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ErroAlert from "../../ErroAlert";
import apiClient from "../../../services/api-client";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
        <div className="flex justify-between items-center px-4 md:px-8 mb-7">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-content">🔥 Trending Products</h2>
          {/* <a
            href="#"
            className="btn btn-primary px-6 py-3 rounded-full text-lg"
          >
            View All
          </a> */}
        </div>
        {/* Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        )}
        {error && <ErroAlert error={error} />}
        {/* Product Slider */}
        {!isLoading && !error && products.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mt-4 px-4 container"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Products Available
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;