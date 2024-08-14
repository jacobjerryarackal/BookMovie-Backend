import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import dbConnection from "./utils/db.js";
import troutes from "./routes/theatersroute.js";
import tickroutes from "./routes/ticketroutes.js";
import movroutes from "./routes/moviesroute.js";
import admrouter from "./routes/adminroute.js";
import morgan from "morgan";
import themovrouter from "./routes/theatermoviesroute.js";
import booktktrouter from "./routes/bookticketroutes.js";
import userrouter from "./routes/userroutes.js";
import payroutes from "./routes/paymentroute.js";
import whatsapproute from "./routes/whatsapproute.js";

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'))

app.use(cors())

dotenv.config();

const PORT =process.env.PORT || 7000;

dbConnection()

app.use("/api/theater",troutes);
app.use("/api/ticket",tickroutes);
app.use("/api/movies",movroutes);
app.use('/admin', admrouter);
app.use("/api/theatermovies",themovrouter)
app.use("/api/users",userrouter)
app.use("/api/bookticket",booktktrouter)
app.use("/api/payment", payroutes)
app.use("/api",whatsapproute)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
});