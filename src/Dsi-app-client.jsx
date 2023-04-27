import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Autenticación/Login.jsx";
export const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route  path = "/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    );
};

