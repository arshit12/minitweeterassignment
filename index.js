import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import tweetRoutes from './routes/tweet.routes.js';
import cros from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config({
    path: ".env"
});
connectDB();
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cros(corsOptions));


//apis
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tweet', tweetRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})