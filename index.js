const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
  // Implementar el mecanismo de autenticación aquí
  // ...
  //   // Verificar si existe un token de acceso almacenado en la sesión
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado. Token no proporcionado." });
  }

  try {
    // Verificar el token usando la clave secreta para decodificarlo
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Almacenar los datos del usuario en la solicitud para su uso posterior si es necesario
    req.user = decodedToken;

    // Llamar a la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
});

app.post("/customer/login", (req, res) => {
  // Aquí debes validar el usuario y contraseña proporcionados en la solicitud
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas. Acceso no autorizado." });
  }

  // Si las credenciales son válidas, generamos un token con la información del usuario
  const token = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key');

  // Almacenar el token en la sesión del cliente
  req.session.token = token;

  return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
});

app.post("/customer/login", (req, res) => {
  // Aquí debes validar el usuario y contraseña proporcionados en la solicitud
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas. Acceso no autorizado." });
  }

  // Si las credenciales son válidas, generamos un token con la información del usuario
  const token = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key');

  // Almacenar el token en la sesión del cliente
  req.session.token = token;

  return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
});









const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));




