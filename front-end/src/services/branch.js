const branches = [
  { _id: 1, name: "North Hill" },
  { _id: 2, name: "Banff Trail" },
];

export function getBranchById(id) {
  return branches.find((branch) => branch._id == id);
}
