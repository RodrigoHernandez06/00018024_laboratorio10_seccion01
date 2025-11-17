import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Home from "./components/Home";
import CustomerList from "./components/CustomerList";
import SalesReport from "./components/SalesReport";
import SalesList from "./components/SalesList";
import SearchCustomers from "./components/SearchCustomers";
import NewSale from "./components/NewSale";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<Protected />} />
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/report" element={<SalesReport />} />
      <Route path="/sales" element={<SalesList />} />
      <Route path="/search" element={<SearchCustomers />} />
      <Route path="/new-sale" element={<NewSale />} />
    </Routes>
  </Router>
);

export default App;
