// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// build an absolute path to our JSON file
const dataPath = path.resolve("./data/invoices.json");

// helper functions
const readInvoices = () =>
  JSON.parse(fs.readFileSync(dataPath, "utf8"));
const writeInvoices = (invoices) =>
  fs.writeFileSync(dataPath, JSON.stringify(invoices, null, 2));

// ROUTES --------------------------------------------------
app.get("/api/invoices", (req, res) => {
  const invoices = readInvoices();
  res.json(invoices);
});

app.post("/api/invoices", (req, res) => {
  const invoices = readInvoices();
  const newInvoice = { id: Date.now(), ...req.body };
  invoices.push(newInvoice);
  writeInvoices(invoices);
  res.status(201).json(newInvoice);
});

app.get("/api/summary", (req, res) => {
  const invoices = readInvoices();
  const totalIncome = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const unpaid = invoices.filter((i) => i.status !== "Paid").length;

  res.json({
    totalIncome,
    totalInvoices: invoices.length,
    unpaidInvoices: unpaid,
  });
});
// ---------------------------------------------------------

app.listen(PORT, () =>
  console.log(`✅ SmartPay API running on port ${PORT}`)
);
