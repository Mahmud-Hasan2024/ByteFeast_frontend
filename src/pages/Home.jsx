import Features from "../components/Features";
import Hero from "../components/Hero";
import Category from "../components/Home/Categories/Category";
import MonthlyDiscount from "../components/Home/MonthlyDiscount";
import TopRatedFoods from "../components/Home/Products/TopRatedFoods";
import MostLikedFoods from "../components/Home/Products/MostLikedFoods";
import DiscountedFoods from "../components/Home/Products/DiscountedFoods";
import SpecialFoods from "../components/Home/Products/SpecialFoods";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Category />
      <TopRatedFoods />
      <MostLikedFoods />
      <SpecialFoods />
      <DiscountedFoods />
      <MonthlyDiscount />
      <Testimonials />
    </div>
  );
};

export default Home;
