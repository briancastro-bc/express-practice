import nodemon from "nodemon";

nodemon({
  // Archivo que queremos qu escuche
  script: './src/server.js',
  // Extensiones que queremos escucharj
  ext: 'ts,js',
  // Proceso que queremos ejecutar
  exec: 'node'
}).on('start', () => {
  // Mensaje que se muestra cuando se inicializa el servidor
  console.log('Server initialize');
});