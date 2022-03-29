const orders = [
  {
    _id: 1,
    products: [
      { name: "Wholesome meal", price: 20, quantity: 3 },
      { name: "Themed mug", price: 40, quantity: 1 },
    ],
    createDate: new Date("March 17, 2022 03:24:00"),
    branch: "Calgary center",
    ifFulfilled: false,
  },
  {
    _id: 2,
    products: [
      {
        name: "Energy drink",
        price: 10,
        quantity: 2,
      },
    ],
    createDate: new Date("March 15, 2022 03:24:00"),
    branch: "Calgary NW",
    ifFulfilled: true,
    image: "energy-drink.jpeg",
  },
];

export function getOrders() {
  return orders;
}
