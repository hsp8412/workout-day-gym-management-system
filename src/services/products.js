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
];

export function getProducts() {
  return products;
}
