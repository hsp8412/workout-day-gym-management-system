const appointments = [
  {
    _id: 1,
    coachId: 2,
    startTime: new Date(2022, 4, 26, 10, 0),
    endTime: new Date(2022, 4, 26, 11, 30),
    branchId: "1",
  },
  {
    _id: 2,
    coachId: 1,
    startTime: new Date(2022, 4, 27, 15, 0),
    endTime: new Date(2022, 4, 27, 16, 0),
    branchId: "2",
  },
];

export function getAppointments() {
  return appointments;
}
