let fitnessProfiles = [
  {
    member_id: 1,
    height: 180,
    weight: 75,
    BFP: 21,
    BMI: 21.2,
    updateDate: new Date("March 17, 2022 03:24:00"),
  },
];

export function getFitnessProfile() {
  return fitnessProfiles;
}

export function getFitnessProfileById(id) {
  return fitnessProfiles.find((profile) => {
    return profile.member_id == id;
  });
}
