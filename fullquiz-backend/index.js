const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from Express backend!' });
});

app.get('/api/quiz', (req, res) => {
    const filePath = path.join(__dirname, 'sport.json');
    
    // Lire le fichier JSON et renvoyer son contenu
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON:', err);
            return res.status(500).send('Erreur lors de la récupération des données');
        }

        // Envoyer le contenu du fichier JSON au client
        res.json(JSON.parse(data));
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Serveur backend à l'écoute sur le port ${port}`);
});
