import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, TrendingUp } from "lucide-react";
import axios from "axios";

const DashboardCards = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalInvoices: 0,
    unpaidInvoices: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  const cards = [
    {
      title: "Total Income",
      value: `$${summary.totalIncome}`,
      icon: <DollarSign className="text-green-500" size={22} />,
      change: "+12.5%",
    },
    {
      title: "Pending Invoices",
      value: summary.unpaidInvoices,
      icon: <Clock className="text-yellow-500" size={22} />,
      change: "-1 this week",
    },
    {
      title: "Payments Received",
      value: summary.totalInvoices - summary.unpaidInvoices,
      icon: <CheckCircle className="text-blue-500" size={22} />,
      change: "+8 since last week",
    },
    {
      title: "Cashflow Trend",
      value: "Stable",
      icon: <TrendingUp className="text-purple-500" size={22} />,
      change: "Updated daily",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            {card.icon}
          </div>
          <p className="text-2xl font-semibold text-gray-800 mt-3">
            {card.value}
          </p>
          <span className="text-sm text-gray-500 mt-2">{card.change}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardCards;
