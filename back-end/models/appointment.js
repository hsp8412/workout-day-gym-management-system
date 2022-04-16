const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    coachId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slot: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema, "timeSlot");

module.exports.Appointment = Appointment;