const express = require("express");
const app = require("../app");
const router = express.Router();

// Data
const rooms = [
  {
    id: 1,
    room_no: "Hall 1",
    seats: 125,
    amenities: ["A/c", "Sound System", "Security Camera"],
    pricePerHourInRupees: 6500,
  },
  {
    id: 2,
    room_no: "Hall 2",
    seats: 200,
    amenities: ["Free Parking", "Wifi", "Security Camera"],
    pricePerHourInRupees: 10000,
  },
];

// Initial rooms & created
router.get("/", (req, res) => {
  res.send(rooms);
});

const bookedRooms = [
  {
    id: 1,
    customer_name: "Shivam",
    roomID: 2,
    status: "booked",
    date: "17 Nov 2021",
    startTime: "09:00:00",
    endTime: "14:00:00",
  },
  {
    id: 2,
    customer_name: "Raghav",
    roomID: 1,
    status: "booked",
    date: "25 Nov 2021",
    startTime: "11:00:00",
    endTime: "16:00:00",
  },
  {
    id: 3,
    customer_name: "Aman",
    roomID: 2,
    status: "booked",
    date: "30 Nov 2021",
    startTime: "17:00:00",
    endTime: "21:00:00",
  },
];

// Create Room
router.post("/create", (req, res) => {
  try {
    const obj = {
      id: rooms.length + 1,
      ...req.body,
    };
    rooms.push(obj);
    // console.log(rooms)
    res.send({
      message: "Room created",
    });
  } catch (error) {
    console.log(error);
  }
});

// Book room
router.post("/booking", (req, res) => {
  try {
    const bookingData = req.body.roomID;
    const bookedDateStartTime = new Date(
      `${req.body.date} ${req.body.startTime}`
    );

    // Check already booked room
    const alreadyBooked = bookedRooms.some((elem) => {
      const elemDateStartTime = new Date(`${elem.date} ${elem.startTime}`);
      const elemDateEndTime = new Date(`${elem.date} ${elem.endTime}`);
      if (
        elem.roomID === bookingData &&
        bookedDateStartTime >= elemDateStartTime &&
        bookedDateStartTime <= elemDateEndTime
      ) {
        return true;
      }
    });

    if (alreadyBooked) {
      res.send({
        message: "Room not available for that date & time",
      });
    } else {
      bookedRooms.push({
        bookedStatus: true,
        ...req.body,
      });
      res.send({
        message: "Room booked",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// List all rooms

router.get("/rooms", (req, res) => {
  try {
    const data = bookedRooms.map((elem) => {
      const index = rooms.findIndex((ele) => ele.id === elem.roomID);
      return {
        roomName: rooms[index].room_no,
        customerName: elem.customer_name,
        bookedStatus: elem.status,
        date: elem.date,
        startTime: elem.startTime,
        endTime: elem.endTime,
      };
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// Get all customers
router.get("/customers", (req, res) => {
  try {
    const data = bookedRooms.map((elem) => {
      const index = rooms.findIndex((ele) => ele.id === elem.roomID);
      return {
        customerName: elem.customer_name,
        roomName: rooms[index].room_no,
        date: elem.date,
        startTime: elem.startTime,
        endTime: elem.endTime,
      };
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
