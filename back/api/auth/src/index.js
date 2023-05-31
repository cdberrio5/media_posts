const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/auth');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

const authRoutes = require('./routes/routes');

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error en el servidor' });
});

app.listen(port, () => {
  console.log(`Servidor API en ejecución en http://localhost:${port}`);
});
