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
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();
    const lastMonth = !today.getMonth() ? 11 : today.getMonth() - 1;

    const currentPayments = payments.filter(
      (payment) =>
        payment.date.getFullYear() === thisYear &&
        payment.date.getMonth() === thisMonth,
    );

    const last_month_total = payments.reduce((total, payment) => {
      if (payment.date.getMonth() === lastMonth) {
        return (total += payment.amount);
      }
      return total;
    }, 0);

    const paymentByCategory = {
      total: 0,
      last_month: last_month_total,
      results: {},
    };
    for (const payment of currentPayments) {
      if (!paymentByCategory.results[payment.category]) {
        paymentByCategory.results[payment.category] = payment.amount;
      } else {
        paymentByCategory.results[payment.category] += payment.amount;
      }
      paymentByCategory.total += payment.amount;
    }

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
