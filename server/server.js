// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
const Order = require('./models/order');
const CompletedOrder = require('./models/completedorder');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/createOrder', async (req, res) => {
  try {
    const { name, address, phone, product, quantity } = req.body;
    const order = await Order.create({ name, address, phone, product, quantity });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllOrders', async (req, res) => {
  try {
    const allOrders = await Order.findAll();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// server.js
app.delete('/completeOrder/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const result = await Order.destroy({ where: { id: orderId } });

    if (result) {
      res.status(204).send(); // Successfully completed and deleted
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.get('/getAllCompletedOrders', async (req, res) => {
  try {
    const completedOrders = await CompletedOrder.findAll();
    res.status(200).json(completedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
