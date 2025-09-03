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

  // If no images are passed, use the local default image
  const displayImages =
    images && images.length > 0 ? images : [{ image: defaultImage }];

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
        {displayImages.map((imageObj, index) => {
          const isLocal =
            imageObj.image === defaultImage ||
            imageObj.image.startsWith("/") ||
            imageObj.image.startsWith("data:") ||
            imageObj.image.startsWith("blob:");

          const imageUrl = isLocal
            ? imageObj.image 
            : imageObj.image.startsWith("http")
            ? imageObj.image
            : `${CLOUDINARY_BASE_URL}${imageObj.image}`;

          return (
            <SwiperSlide key={index}>
              <div className="aspect-square bg-base-100">
                <img
                  src={imageUrl}
                  alt={ProductName}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
