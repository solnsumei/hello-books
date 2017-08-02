// This will be our application entry. We will set up our server here
import http from 'http';
import app from '../app';

const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
