// CommonJS - ESModule
// CommonJS
// const express = require('express');

// ESModule equivalent
import cors from 'cors';
import morgan from 'morgan';
import express from 'express'; // Esto importa todo, lo que tiene la libreria/framework/etc
import { createServer, } from 'http' // Cuando se utiliza {} se importa una funcion, clase, interfaz, etc. Especifica

import userRouter from './routes/user.routes.js';

async function bootstrap() {
  const app = express();
  const port = process.env.PORT ?? 3005;
  
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Rutas
  app.use('/users', userRouter);
  // app.use('/books', userRouter);
  
  // The app will run in port - 3005
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port', port);
  });
}

bootstrap()
  .catch(err => console.error(err));