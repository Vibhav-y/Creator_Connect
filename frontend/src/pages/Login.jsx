import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Button from '../components/Button';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1 = details, 2 = otp entry
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, sendOtp, verifyOtp } = useUser();
  const navigate = useNavigate();

  // Handles the first stage of auth (Login or initial Signup step)
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } else {
      // For signup, request the OTP first
      const res = await sendOtp(email);
      setLoading(false);
      if (res.success) {
        setStep(2);
      } else {
        setError(res.message);
      }
    }
  };

  // Handles the OTP verification and final registration
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const verifyRes = await verifyOtp(email, otp);
    if (!verifyRes.success) {
      setLoading(false);
      setError(verifyRes.message);
      return;
    }

    const signupRes = await signup({ name, email, password });
    setLoading(false);
    if (signupRes.success) {
      navigate('/');
    } else {
      setError(signupRes.message);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '400px', margin: '5rem auto' }}>
      <h1>{isLogin ? 'LOGIN' : (step === 1 ? 'SIGN UP' : 'VERIFY EMAIL')}</h1>
      
      {step === 1 ? (
        <form onSubmit={handleInitialSubmit} className="settings-section">
          {!isLogin && (
            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label>Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid black' }}
              />
            </div>
          )}
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid black' }}
            />
          </div>
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid black' }}
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          <Button 
            type="submit" 
            style={{ width: '100%', marginTop: '2rem' }} 
            isLoading={loading}
          >
            {isLogin ? 'ENTER' : 'SEND OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="settings-section">
          <p style={{ marginBottom: '1rem' }}>Enter the code sent to <strong>{email}</strong></p>
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <label>OTP CODE</label>
            <input 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
              maxLength={6}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid black', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          <Button 
            type="submit" 
            style={{ width: '100%', marginTop: '2rem' }} 
            isLoading={loading}
          >
            VERIFY & REGISTER
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => setStep(1)}
            disabled={loading}
          >
            BACK
          </Button>
        </form>
      )}

      {step === 1 && (
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
