import App from './App';
import * as DEBUG from 'debug';
import * as HTTP from 'http';

const PORT = 3000;


DEBUG('ts-express:server');
App.set('port', PORT);
console.log('Server listening on port : ' + PORT);

const server = HTTP.createServer(App);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

/**
 * On the event of an error.
 * @param error 
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * On listening to port.
   */
  function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    DEBUG(`Listening on ${bind}`);
  }
