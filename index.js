const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const API_KEY = 'api_key';

function checkApiKey(req, res, next) {
  const apiKey = req.header('X-Parse-REST-API-Key');
  if (apiKey !== API_KEY) {
      return res.status(403).send('ERROR: Invalid API Key');
  }
  next();
}

function checkJWT(req, res, next) {
  const token = req.header('X-JWT-KWY');
  if (!token) {
      return res.status(403).send('ERROR: No JWT provided');
  }
  
  try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
      next();
  } catch (err) {
      res.status(403).send('ERROR: Invalid JWT');
  }
}

app.post('/DevOps', checkApiKey, checkJWT, (req, res) => {
  const { message, to, from, timeToLifeSec } = req.body;

  if (!message || !to || !from || !timeToLifeSec) {
      return res.status(400).send('ERROR: Missing required fields');
  }

  res.json({
      message: `Hello ${to} your message will be send`
  });
});

app.all('/DevOps', (req, res) => {
  res.send('ERROR');
});

app.listen(port, () => {
  console.log(`Microservice running in port:: ${port}`);
});

