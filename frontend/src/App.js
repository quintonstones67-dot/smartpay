import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import InvoiceTable from "./components/InvoiceTable";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Cashflow Summary</h2>
          <DashboardCards />
          <InvoiceTable />
        </main>
      </div>
    </div>
  );
}

export default App;
