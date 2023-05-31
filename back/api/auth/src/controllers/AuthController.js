const jwt          = require('jsonwebtoken');
const bcrypt       = require('bcrypt');
const User         = require('./../models/User');
const BcrypCompare = require('./../middlewares/bcrypCompare');

require('dotenv').config();

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.getByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const compare = await BcrypCompare(password, user.password);

      if (!compare) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  static async register(req, res) {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
      const user = await User.getByEmail(email);

      if(user) {
        return res.status(401).json({ message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.createUser(fullName, email, hashedPassword);
      
      const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }
}

module.exports = AuthController;