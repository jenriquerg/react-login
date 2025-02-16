import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const checkTokenExpiration = () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          toast.error("Sesión expirada, por favor inicie sesión de nuevo");
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
        localStorage.removeItem("token");
        toast.error("Hubo un problema con el token. Por favor, inicie sesión de nuevo.");
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h2 className="text-2xl text-white font-bold mb-4">Bienvenido al Home mi may</h2>
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => { 
          localStorage.removeItem("token");
          toast.success("Has cerrado sesión exitosamente");
          navigate("/"); 
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
