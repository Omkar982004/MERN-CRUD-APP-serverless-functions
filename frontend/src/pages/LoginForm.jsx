import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      if (res.token) {
        localStorage.setItem("token", res.token); // Save token
        toast.success("Login successful!");
        navigate("/"); // Redirect to home
        setTimeout(() => {
          window.location.reload(); // reload after 2s
        }, 2);
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <section className="bg-indigo-50 min-h-screen flex items-center justify-center">
        <div className="container max-w-md py-24">
          <div className="bg-white px-6 py-8 shadow-md rounded-md border">
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
