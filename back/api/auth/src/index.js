const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000;

const authRoutes = require('./routes/routes');

app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({origin: true, credentials: true, methods: 'POST, GET'}));

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error en el servidor' });
});

app.listen(port, () => {
  console.log(`Servidor API en ejecución en http://localhost:${port}`);
});
