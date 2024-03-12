import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './routes'

import dotenv from "dotenv";
import MessageResponse from "./interfaces/MessageResponse";
import connectDB from "./db/db";

dotenv.config();
connectDB()

const app: Express = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app