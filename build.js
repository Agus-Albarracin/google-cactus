const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Función para determinar el contexto de construcción
async function determineContext() {
  try {
    // Intenta requerir la librería que utilizas solo en el servidor
    require.resolve('express');
    // Si la anterior línea no falla, significa que estamos en el servidor
    return 'server';
  } catch (error) {
    // Si la librería no se pudo resolver, estamos probablemente en el cliente
    return 'client';
  }
}

// Determina el contexto actual
async function main() {
  const context = await determineContext();

  // Ejecuta la construcción correspondiente al contexto actual
  if (context === 'server') {
    try {
      await exec('npm i cactus-google-srv');
      await exec('cd srv && npm run build');
    } catch (error) {
      console.error('Error installing or building cactus-google-srv:', error);
    }
  } else {
    try {
      await exec('npm i cactus-google-cli');
      await exec('cd cli && npm run build');
    } catch (error) {
      console.error('Error installing or building cactus-google-cli:', error);
    }
  }
}

main();
