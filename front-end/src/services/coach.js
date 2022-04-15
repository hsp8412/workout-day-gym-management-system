const coaches = [
  { _id: 1, name: "Sipeng He" },
  { _id: 2, name: "Yihan wang" },
];

export function getCoachById(id) {
  return coaches.find((coach) => coach._id == id);
}
