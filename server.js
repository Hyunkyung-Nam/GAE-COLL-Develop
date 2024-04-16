const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
require("dotenv").config();
const db = require("./models");

const app = express();
const PORT = 8080;

//http서버에 express, socketio연결
const server = http.createServer(app);
const io = socketIo(server);

//미들웨어 설정
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./build")));

//라우터

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

const projectRouter = require("./routes/project");
app.use("/api/project", projectRouter);

const projectBoardRouter = require("./routes/project_board");
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
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
