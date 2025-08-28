import resturant_bg from "../assets/images/resturant_bg.jpg"

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:`url(${resturant_bg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">
            Authentic Bangladeshi Flavors Made Fresh
          </h1>
          <p className="mb-5">
            Experience the authentic taste of Bangladesh with our fresh,
            handcrafted dishes. We blend tradition with modern flair, offering a
            diverse menu that satisfies every craving. Explore a world of
            flavors—your journey starts here!
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
