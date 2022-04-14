const branches = [
  {
    _id: 1,
    name: "North Hill",
    yearlyProfit: "100,000,000",
    location: "3011 Morley Trail NW",
  },
  {
    _id: 2,
    name: "Banff Trail",
    yearlyProfit: "100,000,000",
    location: "4044 CrowFoot Dr NV",
  },
];

export function getBranchById(id) {
  return branches.find((branch) => branch._id == id);
}

export function getBranches() {
  return branches;
}
