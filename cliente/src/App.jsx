import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./vistas/Home/Home";
import ProductList from "./vistas/Productos/ProductList";
import Contacto from "./vistas/Contacto/Contacto";

import "./App.css";

function App() {
    const [carrito, setCarrito] = useState([]);

    return (
        <>
            <Header
                cartCount={carrito.length}
            />

            <main id="main-content">
                <Routes>
                    <Route
                        path="/"
                        element={<Home/>}
                    />
                    
                    <Route
                        path="/productos"
                        element={
                            <ProductList />
                        }
                    />

                    <Route
                        path="/contacto"
                        element={<Contacto/>}
                    />

                    <Route
                        path="/carrito"
                        element={
                            <section>
                                <h1>Carrito</h1>
                                <p>Productos agregados: {carrito.length}</p>
                            </section>
                        }
                    />
                </Routes>
            </main>

            <Footer/>
        </>
    );
}

export default App;
