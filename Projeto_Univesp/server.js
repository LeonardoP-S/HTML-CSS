//server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./models');

app.use(bodyParser.json());

// Importa as rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

// Testar conexão com banco e inicia o servidor
sequelize.authenticate()
   .then(() => {
    console.log('📦 Conexão com o banco de dados foi bem-sucedida!');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
   })
   .catch(err => {
     console.error('❌ Não foi possível conectar ao banco:', err);
   });