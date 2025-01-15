const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const { MONGO_URL } = process.env;
const PORT = 4000;

const userRoute = require("./routes/UserRoute");
const meetingRoute = require("./routes/MeetingRoute");
const taskRoute = require("./routes/TaskRoute");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/users", userRoute);
app.use("/meetings", meetingRoute);
app.use("/tasks", taskRoute);
