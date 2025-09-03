import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import foodPlatter from "../../assets/images/food-platter.png";
import { Link } from "react-router";

const MonthlyDiscount = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [monthName, setMonthName] = useState("");
  const [offerName, setOfferName] = useState("");

  const offers = {
    0: "New Year Feast 🎉",
    1: "Valentine’s Special ❤️",
    2: "Spring Delight 🌸",
    3: "Pohela Boishakh Bonanza 🎊",
    4: "Summer Treat ☀️",
    5: "Eid-ul-Adha Special 🌙",
    6: "Rainy Season Comfort 🌧️",
    7: "Friendship Month ❤️",
    8: "Autumn Fest 🍂",
    9: "Golden Harvest Special 🌾",
    10: "Wedding Season Feast 💍",
    11: "Victory Day & Winter Warmth 🇧🇩",
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    setMonthName(today.toLocaleString("default", { month: "long" }));
    setOfferName(offers[month]);

    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

    const updateCountdown = () => {
      const now = new Date();
      const diff = endOfMonth - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-base-300 py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        {/* Left side image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={foodPlatter}
            alt="Monthly Special Dish"
            className="max-w-sm md:max-w-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Right side text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {offerName} - {monthName}
          </h2>
          <p className="text-lg mb-6 text-base-content/70">
            Enjoy exclusive discounts this {monthName}! Hurry up, offer ends
            soon.
          </p>

          {/* Countdown Timer */}
          <motion.div
            className="flex justify-center md:justify-start gap-4 text-center mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="bg-base-300 p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold">{timeLeft[unit]}</p>
                <p className="text-sm uppercase">{unit}</p>
              </div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <Link to="/menu">
            <motion.button
              className="btn btn-primary px-8 py-3 text-lg rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Grab the Offer 🍽️
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MonthlyDiscount;
