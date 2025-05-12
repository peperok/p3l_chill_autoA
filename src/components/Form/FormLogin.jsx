import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/auth/LoginPage';

const FormLogin = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);
    if (newData.username.trim().length > 0 && newData.email.trim().length > 0 && newData.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const Login = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        navigate('/user');
        sessionStorage.setItem('token', 'mock-access-token');
        sessionStorage.setItem('user', JSON.stringify({ email: data.email }));
        console.log('Login successful');
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper" style={{maxWidth: '800px', margin: 'auto'}}>
        <div className="auth-alert">
          <h3><strong>Atma</strong>Hub</h3>
          <p>Selamat datang. Silahkan masuk ke akun Anda.</p>
        </div>

        <form onSubmit={Login} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan Email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan Password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isDisabled || loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>

          <div className="auth-footer">
            <p>
              Don't have an Account? <Link to="/register">Click Here!</Link>
            </p>
          </div>
        </form>
      </div>
      
      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f4f4f4;
          font-family: 'Arial', sans-serif;
          padding: 20px;
        }

        .auth-wrapper {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 800px;
          padding: 30px;
          box-sizing: border-box;
        }

        .auth-alert {
          background-color: #e6f2ff;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 25px;
          text-align: center;
        }

        .auth-alert h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .auth-alert p {
          margin: 0;
          color: #666;
        }

        .auth-form .form-group {
          margin-bottom: 20px;
        }

        .auth-form label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 600;
        }

        .auth-form input {
          width: 100%;
          padding: 12px;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .auth-form input:focus {
          outline: none;
          border-color: #4a90e2;
        }

        .auth-button {
          width: 100%;
          padding: 14px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 15px;
        }

        .auth-button:disabled {
          background-color: #a0c4e8;
          cursor: not-allowed;
        }

        .auth-button:hover:not(:disabled) {
          background-color: #3a7bd5;
        }

        .auth-footer {
          text-align: center;
          margin-top: 20px;
          color: #777;
        }

        .auth-footer a {
          color: #4a90e2;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
export default LoginPage;