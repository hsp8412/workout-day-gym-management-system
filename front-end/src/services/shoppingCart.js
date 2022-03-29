const shoppingCart = [
  {
    _id: 1,
    name: "Themed mug",
    price: 50,
    quantity: 2,
    image: "/mug.jpeg",
    description: "A mug with the gym's logo on it.",
  },
  {
    _id: 2,
    name: "Energy Drink",
    price: 10,
    quantity: 3,
    image: "energy-drink.jpeg",
    description: "Power yourself up.",
  },
];

export function getShoppingCart() {
  return shoppingCart;
}
