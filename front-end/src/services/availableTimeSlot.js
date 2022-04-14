const timeSlots = [
  {
    _id: 1,
    startTime: new Date(2022, 4, 15, 10, 0),
    endTime: new Date(2022, 4, 15, 11, 0),
    coachId: 1,
    branchId: 2,
    isBooked: false,
  },
  {
    _id: 2,
    startTime: new Date(2022, 4, 15, 13, 0),
    endTime: new Date(2022, 4, 15, 15, 0),
    coachId: 2,
    branchId: 1,
    isBooked: false,
  },
  {
    _id: 3,
    startTime: new Date(2022, 4, 16, 11, 0),
    endTime: new Date(2022, 4, 16, 12, 0),
    coachId: 2,
    branchId: 1,
    isBooked: false,
  },
  {
    _id: 4,
    startTime: new Date(2022, 4, 16, 14, 0),
    endTime: new Date(2022, 4, 16, 16, 0),
    coachId: 1,
    branchId: 1,
    isBooked: true,
  },
];

export default function getTimeSlots() {
  return timeSlots;
}
