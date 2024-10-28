import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const port = process.env.PORT

//CORS config
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
};
app.use(cors(corsOptions));


//Routes
import studentRoute from './routes/studentRoute.js'

app.use(express.json());

// API's
app.use('/api/student', studentRoute);


//Established Connection
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB)
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json())

app.listen(port, () => {
    connect();
    console.log(`Connected to PORT ${port}`);
})