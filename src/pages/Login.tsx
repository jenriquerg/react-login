import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Por favor ingresa ambos campos");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", { username, password });

      if (data.statusCode === 200) {
        const token = data.intDataMessage[0].credentials;
        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userRole = payload.role;

        toast.success("Bienvenido! Has iniciado sesión exitosamente.");
        
        // Redireccionar según el rol
        if (userRole === "master") {
          navigate("/master_home");
        } else {
          navigate("/common_user_home");
        }
      } else {
        toast.error(data.intDataMessage[0].message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.intDataMessage?.[0]?.message || "Error al iniciar sesión");
      } else {
        toast.error("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Bienvenido</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-4.5 right-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleLogin}
        >
          Ingresar
        </button>
        <a href="/register" className="block text-center mt-4 text-blue-500">Registrarme</a>
      </div>
    </div>
  );
};

export default Login;
