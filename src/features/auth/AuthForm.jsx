
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, forgotPassword } from './authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      if (!email || !password) {
        alert('Please enter email and new password');
        return;
      }
      dispatch(forgotPassword({ email, newPassword: password }))
        .unwrap()
        .then(() => {
          alert('Password reset successful! Please login.');
          setIsForgotPassword(false);
          setIsLogin(true);
          setPassword('');
        })
        .catch(() => {});
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = isLogin
      ? { email, password }
      : { name, email, password, confirmPassword };

    const action = isLogin ? loginUser : registerUser;

    dispatch(action(payload))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch(() => {});
  };

  return (
    <div className="auth-container">
      <h2>
        {isForgotPassword
          ? 'Forgot Password'
          : isLogin
          ? 'Login'
          : 'Register'}
      </h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && !isForgotPassword && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={
            isForgotPassword ? 'New Password' : 'Password'
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && !isForgotPassword && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">
          {status === 'loading'
            ? 'Loading...'
            : isForgotPassword
            ? 'Reset Password'
            : isLogin
            ? 'Login'
            : 'Register'}
        </button>
      </form>

      {isLogin && !isForgotPassword && (
        <p
          className="forgot-password"
          onClick={() => {
            setIsForgotPassword(true);
            setIsLogin(false);
          }}
        >
          Forgot Password?
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      {!isForgotPassword && (
        <p className="switch-text">
          {isLogin ? (
            <>
              Don’t have any account?{' '}
              <span
                className="switch-link"
                onClick={() => setIsLogin(false)}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="switch-link"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      )}

      {isForgotPassword && (
        <p className="switch-text">
          Remembered your password?{' '}
          <span
            className="switch-link"
            onClick={() => {
              setIsForgotPassword(false);
              setIsLogin(true);
            }}
          >
            Login
          </span>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
