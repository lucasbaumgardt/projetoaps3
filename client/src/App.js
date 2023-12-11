import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Inicial/Home";
import Cadastra from "./pages/Cadastros/Cadastra";
import "./index.css";

import { CartProvider } from "./context/Carrinho";
import ThemeProvider from "./context/theme";
import CarrinhoCompras from "./pages/Carrinho/Carrinho";
import DetalhesProduto from "./pages/ExibeProdutos/DetalhesProduto";

const App = () => {

return (
  <ThemeProvider>
    <CartProvider>
    <Router>
      <NavBar/>

      <Routes>

        <Route path="/" element={<Navigate to="/mostra-produtos" />} />

        <Route path="/mostra-produtos" element={<Home/>}></Route>

        <Route path="/produto/:id" element={<DetalhesProduto/>} />

        <Route path="/cart" element={<CarrinhoCompras/>}></Route>

        <Route path="/cadastra-produtos" element={<Cadastra/>}></Route>

      </Routes>
    </Router>
    </CartProvider>
  </ThemeProvider>
);

}

export default App;