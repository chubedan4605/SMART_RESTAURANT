import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar";
import FloatingBillRequest from "../Components/FloatingBillRequest";
import useCustomerSocket from "../hooks/useCustomerSocket";
import KitchenLayout from "./KitchenLayout";
import CustomerLayout from "./CustomerLayout";
import WaiterLayout from "./WaiterLayout";
import AdminLayout from "./AdminLayout";

const MainLayout = () => {
  // Lấy thông tin table session từ context hoặc localStorage
  const tableId = localStorage.getItem("tableCode");
  const sessionId = localStorage.getItem("tableSessionId");

  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
  console.log("User in MainLayout:", user); // Debug thông tin user

  // Kích hoạt socket listener cho toàn bộ customer pages
  const { isConnected } = useCustomerSocket();

  return (
    <>
      {user ? (
        <CustomerLayout />
      ) : user.role === "customer" ? (
        <CustomerLayout />
      ) : user.role === "admin" ? (
        <AdminLayout />
      ) : user.role === "waiter" ? (
        <WaiterLayout />
      ) : user.role === "kitchen" ? (
        <KitchenLayout />
      ) : (
        <CustomerLayout />
      )}
    </>
  );
};

export default MainLayout;
