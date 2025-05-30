
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, forgotPassword } from './authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false); // Register comes first
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div
      className="auth-page-background"
      style={{
    background: 'linear-gradient(135deg, #4caf50, #81c784 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    position: 'relative',
  }}
    >
      
      

      <div className="auth-container" style={{ position: 'relative', zIndex: 10 }}>
        <h2 className="auth-title">
          {isForgotPassword ? 'Reset Password' : isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div
            className={`form-slider ${
              isForgotPassword ? 'slide-forgot' : isLogin ? 'slide-login' : 'slide-register'
            }`}
          >
            {/* Register Form */}
            <div className="form-slide">
              {!isLogin && !isForgotPassword && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="show-hide-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="show-hide-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Login Form */}
            <div className="form-slide">
              {isLogin && !isForgotPassword && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="show-hide-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Forgot Password Form */}
            <div className="form-slide">
              {isForgotPassword && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="show-hide-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">
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
                Don’t have an account?{' '}
                <span className="switch-link" onClick={() => setIsLogin(false)}>
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="switch-link" onClick={() => setIsLogin(true)}>
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
    </div>
  );
};

export default AuthForm;
