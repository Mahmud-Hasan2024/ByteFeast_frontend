import Features from "../components/features";
import Hero from "../components/Hero";
import Category from "../components/Home/Categories/Category";
import Product from "../components/Home/Products/Product";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Category />
      <Product />
    </div>
  );
};

export default Home;
