import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import defaultImage from "../../assets/images/default_product.png";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dciz8qr49/";

const ProductImageGallery = ({ images, ProductName }) => {
  const [thumbsSwiper] = useState(null);

  // Use default image if none
  const displayImages =
    images && images.length > 0
      ? images
      : [{ image: defaultImage }];

  return (
    <div className="rounded-lg border overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="product-main-slider"
      >
        {displayImages.map((imageObj, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square bg-base-100">
              <img
                src={
                  imageObj.image.startsWith("http")
                    ? imageObj.image
                    : `${CLOUDINARY_BASE_URL}${imageObj.image}`
                }
                alt={ProductName}
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
