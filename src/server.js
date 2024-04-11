const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();
const db = require("./../models");

const app = express();
const PORT = 8080;

//http서버에 express, socketio연결
const server = http.createServer(app);
const io = socketIo(server);

//미들웨어 설정
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

//라우터
app.get("/api", (req, res) => {
    res.send({ message: "hello" });
});

const userRouter = require("../routes/user");
app.use("/api/user", userRouter);

const projectRouter = require("../routes/project");
app.use("/api/project", projectRouter);

const projectBoardRouter = require("../routes/project_board");
app.use("/api/project/board", projectBoardRouter);

db.sequelize
    .sync({ force: false })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`http://localhost:${PORT}/start/`);
        });
    })
    .catch((e) => {
        console.log(`DB생성시오류 : `, e);
    });
