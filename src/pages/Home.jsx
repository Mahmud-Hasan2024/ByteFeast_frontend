import Features from "../components/Features";
import Hero from "../components/Hero";
import Category from "../components/Home/Categories/Category";
import MonthlyDiscount from "../components/Home/MonthlyDiscount";
import DiscountedProducts from "../components/Home/Products/DiscountedProducts";
import Product from "../components/Home/Products/Product";
import SpecialProducts from "../components/Home/Products/SpecialProducts";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Category />
      <Product />
      <SpecialProducts />
      <DiscountedProducts />
      <MonthlyDiscount />
      <Testimonials />
    </div>
  );
};

export default Home;
