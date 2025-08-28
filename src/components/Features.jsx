import { FaShoppingCart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const Features = () => {
  const features = [
    {
      icon: <MdVerified className="text-amber-300 text-4xl" />,
      title: "Authentic Recipes",
      description:
        "Our chefs use traditional Bangladeshi recipes passed down through generations.",
    },
    {
      icon: <FaTags className="text-amber-300 text-4xl" />,
      title: "Fresh & Local Ingredients",
      description:
        "We source the freshest local produce and spices to ensure the best flavor.",
    },
    {
      icon: <BsShieldLock className="text-amber-300 text-4xl" />,
      title: "Hygienic Kitchen",
      description:
        "We maintain the highest standards of cleanliness and hygiene in our kitchen.",
    },
    {
      icon: <FaShoppingCart className="text-amber-300 text-4xl" />,
      title: "Fast Delivery",
      description:
        "Enjoy your favorite dishes delivered hot and fresh to your doorstep.",
    },
  ];

  return (
    <section className="px-8 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;