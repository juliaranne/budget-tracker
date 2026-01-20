import "dotenv/config.js";
import Payment from "./models/payment.model.js";
import express from "express";
import mongoose from "mongoose";

const uri = `mongodb+srv://juliaranne:${process.env.CLUSTER0_PASSWORD}@cluster0.ncjxftj.mongodb.net/budget_tracker?appName=Cluster0`;
const app = express();
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("failed to connect");
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find({});

    const paymentByCategory = Object.create(null);
    for (const payment of payments) {
      if (!paymentByCategory[payment.category]) {
        paymentByCategory[payment.category] = payment.amount;
      } else {
        paymentByCategory[payment.category] += payment.amount;
      }
    }
    // console.log(payments);
    res.status(200).json(paymentByCategory);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/api/payment", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(200).json(payment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
