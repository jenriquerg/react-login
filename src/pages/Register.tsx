import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !username || !password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    try {
      const newUser = {
        email,
        username,
        password,
        role: "common_user"
      };
      const response = await axios.post("http://localhost:3000/register", newUser);
  
      if (response.data.statusCode === 201) {
        toast.success("Usuario registrado exitosamente.");
        navigate("/login");
      } else {
        toast.error(response.data.intDataMessage?.[0]?.message || "Error en el registro");
      }
    } catch (error: unknown) {
      console.error(error);
  
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.intDataMessage?.[0]?.message || "Error al registrar usuario");
      } else {
        toast.error("Ocurrió un error inesperado");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Registro</h2>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

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
          onClick={handleRegister}
        >
          Registrarse
        </button>
        <a href="/login" className="block text-center mt-4 text-blue-500">Iniciar Sesión</a>
      </div>
    </div>
  );
};

export default Register;