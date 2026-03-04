import { Routes, Route } from "react-router-dom";
import Appshell from "./layout/Appshell";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BudgetTracker from "./pages/BudgetTracker";
import DocumentScanner from "./pages/DocumentScanner";
import SmartPlanner from "./pages/SmartPlanner";
import RewardsDashboard from "./pages/RewardsDashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<Appshell />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<BudgetTracker />} />
        <Route path="/scanner" element={<DocumentScanner />} />
        <Route path="/planner" element={<SmartPlanner />} />
        <Route path="/rewards" element={<RewardsDashboard />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
