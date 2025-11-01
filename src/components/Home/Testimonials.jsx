// src/components/Home/Testimonials.jsx
const testimonials = [
  {
    id: 1,
    name: "Ayesha Karim",
    role: "Food Blogger",
    quote:
      "The best dining experience I’ve ever had in Dhaka. Every bite feels like love on a plate!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Ahsan Shakib",
    role: "Regular Customer",
    quote:
      "Delicious food, cozy environment, and top-notch service. Highly recommended for everyone!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Nabila Hasan",
    role: "Entrepreneur",
    quote:
      "Their special deals are unbeatable. Always fresh, always tasty. I keep coming back!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-content mb-12">
          What Our Customers Say ❤️
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-primary object-cover"
                />
                <p className="italic text-base-content/80 mb-4">"{t.quote}"</p>
                <h3 className="font-semibold text-lg text-primary">{t.name}</h3>
                <p className="text-sm text-base-content/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
