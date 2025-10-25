import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Overdue: "bg-yellow-100 text-yellow-700",
  };

  // Handle Add Invoice
  const handleAddInvoice = async () => {
    const client = prompt("Client name?");
    const amount = Number(prompt("Amount?"));
    const due = prompt("Due date (YYYY-MM-DD)?");

    if (!client || !amount || !due) {
      alert("All fields are required.");
      return;
    }

    const newInvoice = { client, amount, due, status: "Unpaid" };

    try {
      const response = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      });
      const data = await response.json();
      alert(`Invoice for ${data.client} added!`);
      setInvoices((prev) => [...prev, data]); // Update state
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow p-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Invoices</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="pb-2">ID</th>
            <th className="pb-2">Client</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Due Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr
              key={inv.id}
              className="border-b last:border-none hover:bg-gray-50 transition-all"
            >
              <td className="py-2">{inv.id}</td>
              <td>{inv.client}</td>
              <td>${inv.amount}</td>
              <td>{inv.due}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[inv.status]}`}
                >
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddInvoice}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
      >
        Add Invoice
      </button>
    </motion.div>
  );
}
