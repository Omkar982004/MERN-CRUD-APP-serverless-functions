import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      if (res.token) {
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default LoginForm;