import express from "express";
import http from "http";
import { Server } from "socket.io";
import { db } from "./db.js";
import cors from "cors";
import multer from "multer";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use(express.static('plugin'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
},
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    const imageUrl = file.filename;
    res.status(200).json(imageUrl);
});

app.get('/', (req, res) => {
    return res.json('connect api!');
});

app.get('/api/imgs', (req, res) => {
    const page = req.query.page || 1;
    const perPage = 10; // Number of images per page
    const offset = (page - 1) * perPage;

    let q = `SELECT * FROM imgs`;
    const category = req.query.category || ''; 
    if (category) {
        q += ` WHERE category = '${category}'`;
    }

    q += ` LIMIT ${perPage} OFFSET ${offset}`;

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/api/imgs/:id', (req, res) => {
    const fetchId = req.params.id;
    const q = "SELECT * FROM imgs WHERE id = ?";
    db.query(q, fetchId, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/api/imgs', (req, res) => {
    const q = "INSERT INTO imgs(`name`, `category`, `img`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.category,
        req.body.img,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        io.emit("newImage", req.body);
        return res.json("Post has been created.");
    });
});

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("newImage", (data) => {
        console.log(data.message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected.");
    });
});

server.listen(8800, () => {
    console.log("Connected!");
});