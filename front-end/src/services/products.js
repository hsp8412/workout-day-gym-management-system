const products = [
  {
    _id: 1,
    name: "One-year membership",
    description: "One year membership to your nearest fitness center.",
    image: "/member-card.png",
    price: 1000,
  },
  {
    _id: 2,
    name: "Locker for one month",
    description:
      "Rent a locker for one month at the fitness center you are registered at.",
    image: "/locker.jpeg",
    price: 20,
  },
  {
    _id: 3,
    name: "Energy Drink",
    description: "Power yourself up.",
    image: "energy-drink.jpeg",
    price: 10,
  },
  {
    _id: 4,
    name: "One-month membership",
    description: "One month membership to your nearest fitness center.",
    image: "/member-card.png",
    price: 100,
  },
  {
    _id: 5,
    name: "Themed mug",
    description: "A mug with the gym's logo on it.",
    image: "/mug.jpeg",
    price: 50,
  },
];

export function getProducts() {
  return products;
}
