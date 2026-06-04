// config.js - cargar los archivos JSON en el navegador
var configData;

fetch('./config.json')
  .then(response => response.json())
  .then(data => {
    configData = data;
    console.log(data);
  })
  .catch(error => console.error('Error:', error));