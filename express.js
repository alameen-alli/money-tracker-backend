// QeuIV7zTEEZu1CEd

const express = require('express');
const cors = require('cors');
// require('dotenv').config();
require('dotenv').config({ path: '.env' });
const app = express();
const Transaction = require('./models/TransactionDB.js');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

 
app.post('/api/transaction', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('strictQuery', false);
  console.log("req.body", req.body);
  const {item, price, description, dateTime, } = req.body;
  const transaction = await Transaction.create({item, price, description, dateTime});
  res.json(transaction);
})


app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

const port = 4040;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// tflhHuk4WqGHOLAe