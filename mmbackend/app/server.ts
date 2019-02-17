import App from './App';
import * as DEBUG from 'debug';
import * as HTTP from 'http';
import Logger from './utils/logger';
import Secret from './utils/secret';

const PORT = Secret.PORT;

DEBUG('ts-express:server');
App.set('port', PORT);
Logger.info('Server listening on port : ' + PORT);

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
        Logger.logError(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        Logger.logError(`${bind} is already in use`);
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
