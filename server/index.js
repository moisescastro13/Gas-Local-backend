const express = require('express');
const morgan = require('morgan');
const ip = require('ip');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./src/models/index');

const server = express();

server.set('port', process.env.PORT || 3001);

const corsConfig = {
  origin: '*',
  credentials: true,
};

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(cors(corsConfig));
server.use(express.static(__dirname + '/public'));

// implementing routes in external file
require('./src/routes')(server); 

/* const auth = require('./src/routes/auth');
server.use('/authentication', auth); */

// server.get('/', (req, res) =>{
//   console.log(__dirname);
//   res.json({})
// });

server.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const serverInst = server.listen(server.get('port'), () => {
  console.log('\u001b[1;36mServer on:', ip.address() + ':' + server.get('port'));
  sequelize.sync({force:false})
  .then((a) =>{
    console.log('db is connected')
  })
  .catch( err => {
    throw new Error(err);
  });
  // sequelize.authenticate()
  // .then(() => {
  //   console.log('DB is connected');
  // })
  // .catch(err => {
  //   throw new Error(err);
  // });
});