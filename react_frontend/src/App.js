import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

import CompraPage from "./pages/Compra/CompraPage";

import ComprasPage from "./pages/Compras/ComprasPage";
import RegistrarPagoPage from "./pages/RegistrarPago/RegistrarPagoPage";
import CultivosPais from "./pages/CultivosPais/CultivosPais";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import VentaPage from "./pages/Venta/VentaPage";
import Cosechas from "./pages/Cosechas/Cosechas";
import Pedidos from "./pages/Pedidos/pedidos";
import ModificarPedido from "./pages/Pedidos/modificarPedido";
import SeguimientoPedido from "./pages/Pedidos/seguimientoPedido";
import RetroalimentacionPedido from "./pages/Pedidos/retroalimentacionPedido";
import CrearUsuario from "./pages/Usuario/crearUsuario";
import Comentarios from "./pages/Cosechas/comentarios"


import CosechasPage from "./pages/admin/CosechasPage/CosechasPage";
import NotificationsPage from "./pages/admin/NotificationsPage/NotificationsPage";
import NotFoundPage from "./pages/404/NotFoundPage";
import RegistrarEventualidadPage from "./pages/admin/RegistrarEventualidad/RegistrarEventualidadPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Login from "./pages/Login/Login.js";

import PerfilPage from "./pages/Perfil/PerfilPage";
import EditarPage from "./pages/Perfil/editar/EditarPage";
import Historial from "./pages/HistorialCompras/Historial";
import ReseñaPage from "./pages/Reseña/Reseña";

import UnauthorizedPage from "./pages/UnauthorizedPage";

import PrivateRouteWithRole from './components/PrivateRouteWithRole';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/compras" element={<ComprasPage />} />
                <Route path="/app/payment-method/" element={<RegistrarPagoPage />} />
                <Route path="/cosechas/" element={<Cosechas />} />

                {/* <Route path="/pais/" element={<CultivosPais />} /> */}
                <Route path="/login/" element={<Login />} />
                <Route path="/checkout" element={<CheckoutPage />} />


                <Route path="*" element={<NotFoundPage />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/pedidos/:idPedido" element={<ModificarPedido />} />
                <Route path="/seguimiento/:id" element={<SeguimientoPedido />} />
                <Route path="/retroalimentacion/:id" element={<RetroalimentacionPedido />} />
                <Route path="/registrarse" element={<CrearUsuario />} />
                <Route path="/comentarios" element={<Comentarios />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/perfil/editar" element={<EditarPage />} />
                <Route path="/historial" element={<Historial />} />

                {/* Rutas privadas por rol */}
                <Route element={<PrivateRouteWithRole requiredRole="organizacion" />}>
                    <Route path="/pais" element={<CultivosPais />} />
                </Route>

                <Route element={<PrivateRouteWithRole requiredRole = "comprador"/>}>
                <Route path="/compra" element={<CompraPage />} />
                <Route path="/reseñar" element={<ReseñaPage />} />
                </Route>

                <Route path="/no-autorizado" element={<UnauthorizedPage />} />

                {/* Rutas para administrador */}
                <Route path="/admin/">
                    <Route path="notificaciones/" element={<NotificationsPage />} />
                    <Route path="cosechas" element={<CosechasPage />} />
                    <Route path="registrar-eventualidad" element={<RegistrarEventualidadPage />} />
                    <Route path="estadisticas" element={<AdminPage />} />
                </Route>
            </Routes>

            <Footer />
        </>
    );
}

export default App;
