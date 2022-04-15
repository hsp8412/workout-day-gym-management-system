let profiles = [
  {
    member_id: 1,
    firstName: "John",
    lastName: "Marston",
    phone: "821-123-4232",
    email: "jmarston@gmail.com",
    username: "john",
    password: "123123123",
    status: "Active",
    gender: "Male",
    emergencyContact: "823-502-2121",
  },
];

export function getProfile() {
  return profiles;
}

export function getProfileById(id) {
  return profiles.find((profile) => {
    return profile.member_id == id;
  });
}
