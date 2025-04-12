const express = require("express");
const http = require("http"); 
const nodeCron = require("node-cron");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const apex = require("./src/routes/apex.js");
const auth = require("./src/routes/auth.js");
const ralis = require("./src/routes/ralis.js");
const connect = require("./src/config/mongodb.js");
const User = require("./src/models/user.js");
const socketHandler = require("./src/sockets/io.js");

const app = express();
const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT;


connect();

app.use(cors());
app.use(express.json());

app.use("/", apex);
app.use("/auth", auth);
app.use("/ralis", ralis);

// Cron Job
nodeCron.schedule("0 * * * *", async () => {
  console.log(" Hourly reset starting...");
  await User.updateMany({}, { $set: { seen: [] } });
  console.log(" All users' seen lists cleared");
});


io.on("connection", (socket) => {
  socketHandler(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//http://localhost:3000/

//PARTS:
//1:APEX-the main page,about page, terms and conditions DONE
//2:AUTH-The signup process and login process, account making process NOT DONE(HAVE TO WAIT TILL THE WEB APP BACKEND IS READY) DONE
//3:DATABASE AND MODELS-The mongodb models and dbs and how data is stored and utilized and managed DONE
//4:Main functioning of the app-The necessary functioninng of : DONE
//sliding and swiping,the main algorithmn,updating in genral, okay like updating status,school,form,age,images,profilepic,lookingfor,username.The search and filter according to school,status
//5:Images-cloudinary and images management


