import express, { Router, } from 'express';
import { createServer, } from 'http';

/**
 * 
 * Simulación de una Base de Datos
 * 
 */
const books = [
  {
    id: 1,
    name: '100 annos de soledad',
    author: 'Gabriel Garcia Marquez',
  },
  {
    id: 2,
    name: 'Satanas',
    author: 'Mario Mendoza',
  },
  {
    id: 3,
    name: 'Cronica de una muerte anunciada',
    author: 'Gabriel Garcia Marquez',
  },
];

// Paso 4. Es crear un controlador que se encargue de validar y devolver los libros disponibles
function getAllBooks(request, response, next) {
  // console.log('parametros de consulta', request.query);
  console.log('router');

  // Obtengo los parametros de consulta que me envia el cliente
  const {
    id,
    name,
    author
  } = request.query;

  // Relleno mi base de datos con la info
  let results = books;

  // Valido si existe el id
  if (id) {
    results = results.filter(book => book.id === +id);
  }

  if (name) {
    results = results.filter(book => book.name === name);
  }

  if (author) {
    results = results.filter(book => book.author === author);
  }

  request.body = {
    books,
  };

  next();
}

function myMiddleware(request, response, next) {
  console.log('first middlware');

  const {
    id,
    name,
    author,
  } = request.query;

  if (!id) {
    return response
      .status(400)
      .json({ message: 'Falta el parametro id' });
  }

  if (!name) {
    return response
      .status(400)
      .json({ message: 'Falta el parametro name' });
  }

  if (!author) {
    return response
      .status(400)
      .json({ message: 'Falta el parametro author' });
  }

  next();
}

function timestampMiddleware(request, response, next) {
  console.log('last middleware');

  return response
    .status(200)
    .json({
      ...request.body,
      timestamp: Date.now(),
    });
}

/**
 * 
 * Analogía de este código
 * Es como construir los cimientos de un edificio: una librería, una casa, un apartamento, etc.
 * 
 */
function main() {
  const app = express();
  const port = process.env.PORT ?? 3005;

  /**
   * 
   * Para crear un estante de libros, necesitamos un ruta o un identificador de acceso a un recurso
   * Esto lo hacemos de la siguiente forma:
   *
   * El Request (req) nos sirve para obtener datos que nos envia el cliente.
   *  
   */

  // Paso 1. Creacion del router.
  const libraryRouter = Router();

  // Paso 3. Estamos llenando el estante de libros
  libraryRouter.get('/', getAllBooks);

  // Paso 2. Añadir el router a nuestro servidor
  app.use(express.json());
  app.use(myMiddleware);
  app.use('/library', libraryRouter);
  app.use(timestampMiddleware);

  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port)
  });
}

main();