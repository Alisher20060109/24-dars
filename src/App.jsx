import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // BrowserRouter qo'shildi
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/Layout";
import FilterPage from "./pages/filter/FilterPage";
import HomePage from "./pages/home/HomePage";
import SinglPage from "./pages/singl/SinglPage";
import Cartpage from "./pages/cart/Cartpage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> {/* Xatoni tuzatish uchun shu yerda bo'lishi shart */}
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="cart" element={<Cartpage />} />
            <Route path="filter" element={<FilterPage />} />
            <Route path="product/:id" element={<SinglPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;