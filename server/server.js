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

app.post('/completeOrder/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  const transaction = await sequelize.transaction();

  try {
    const order = await Order.findByPk(orderId, { transaction });

    if (order) {
      await CompletedOrder.create({
        name: order.name,
        address: order.address,
        phone: order.phone,
        product: order.product,
        quantity: order.quantity,
      }, { transaction });

      await order.destroy({ transaction });

      await transaction.commit();

      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);

    await transaction.rollback();

    // Send the detailed error message in the response
    res.status(500).json({ error: error.message });
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
