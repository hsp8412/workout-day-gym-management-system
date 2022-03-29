const shoppingCart = [
  {
    _id: 1,
    name: "Themed mug",
    quantity: 2,
    createDate: new Date("March 17, 2022 03:24:00"),
    branch: "Calgary center",
    ifFulfilled: false,
    image: "/mug.jpeg",
    description: "A mug with the gym's logo on it.",
  },
  {
    _id: 2,
    name: "Energy Drink",
    quantity: 3,
    createDate: new Date("March 15, 2022 03:24:00"),
    branch: "Calgary NW",
    ifFulfilled: true,
    image: "energy-drink.jpeg",
    description: "Power yourself up.",
  },
];

export function getShoppingCart() {
  return shoppingCart;
}
