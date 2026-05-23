import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 1. IMPORT GLOBAL GLOBAL CSS (Order matters for responsive overrides)
import "./index.css";
import "./styles/responsive.css"; 

// 2. PAGES & VIEWS LAYOUTS
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Reports/Reports";
import Transactions from "./pages/Transactions/Transactions";
import AdminPanel from "./pages/Admin/AdminPanel"; // Added missing Admin View Component
import NotFound from "./pages/NotFound/NotFound";   // Added missing Account 404 View

// 3. SECURE AUTH GUARD TERMINAL
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  // We remove the static localStorage read from here. 
  // Letting the routes evaluate dynamically prevents layout freezing bugs!

  return (
    <BrowserRouter>
      <Routes>
        
        {/* ==========================================================================
           PUBLIC ACCESSIBLE ROUTES
           ========================================================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* Smart landing page router fallback redirect */}
        <Route 
          path="/" 
          element={
            localStorage.getItem("token") || localStorage.getItem("role") === "admin" ? (
              localStorage.getItem("role") === "admin" ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* ==========================================================================
           PROTECTED USER ROUTE CHANNELS (Using React Router Nested Outlet Layouts)
           ========================================================================== */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>

        {/* ==========================================================================
           PROTECTED ADMIN ROUTE TERMINALS 
           ========================================================================== */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* ==========================================================================
           CATCH-ALL ACCIDENTAL PATH FALLBACKS 
           ========================================================================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;