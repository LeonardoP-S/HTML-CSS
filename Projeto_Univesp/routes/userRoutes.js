// route/userRoutes.js
const express = require("express");
const router = express.Router();
const { User } = require('../models');

// Criar novo usuário
router.post('/register', async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
  
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        role
      });
  
      res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  });
  
  module.exports = router;