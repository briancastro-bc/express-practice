import express from 'express';
import { createServer, } from 'http';

function main() {
  const app = express();
  const port = process.env.PORT ?? 3005;

  /**
   * 
   * Rutas:
   * En la ruta inicial /
   * Nos muestre un mensaje de Hola mundo.
   * 
   */
  app.get('/', (req, res) => {
    res.send('Hola a todos');
  });

  app.get('/hola', (req, res) => {
    res.status(200).json({
      message: 'Hola',
    });
  });

  app.get('/sum', (req, res) => {
    let result = 0;
    Object.values(req.query)
      .forEach(v => result += +v);

    return res
      .status(200)
      .json({
        result,
      });
  });

  app.get('/search', (req, res) => {
    const elements = ["Hola", "Lola", "Pola", "Lolo", "Avion"];

    const { value } = req.query;

    const result = elements
      .find(v => v == value);
    
    if (!result) {
      return res
        .status(404)
        .json({
          message: 'No se encontro ningun elemento',
        });
    }
    
    return res
      .status(200)
      .json({
        result,
      })
  });

  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port)
  });
}

main();