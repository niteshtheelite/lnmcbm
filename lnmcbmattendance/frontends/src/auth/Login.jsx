// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginAuthMutation } from "../redux/apiSlice";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginAuthMutation();
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login({ email, password }).unwrap();

//       if (res.success) {
//         // ✅ Store User Data in Redux Store
//         dispatch(setUser(res.user));

//         // ✅ Store Token in LocalStorage
//         localStorage.setItem("token", res.token);

//         // ✅ Redirect Based on Role
//         if (res.user.role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (res.user.role === "teacher") {
//           navigate("/teacher/dashboard");
//         }
//       }
//     } catch (error) {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAuthMutation } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginAuthMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await login({ email, password }).unwrap();

      if (res.success) {
        dispatch(setUser(res.user));
        localStorage.setItem("token", res.token);

        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.user.role === "teacher") {
          navigate("/teacher/dashboard");
        }
      }
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Please login to your account
        </p>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
