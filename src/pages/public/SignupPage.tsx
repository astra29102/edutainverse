import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification
  const [otp, setOtp] = useState('');
  
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const validateForm = () => {
    if (!name.trim()) {
      setFormError('Full name is required');
      return false;
    }
    
    if (!email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    if (!email.includes('@gmail.com')) {
      setFormError('Only Gmail accounts are allowed for registration');
      return false;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormError('');
    
    // Simulate OTP verification step
    setStep(2);
  };
  
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim() || otp.length !== 6) {
      setFormError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setFormError('');
    
    try {
      // Register the user
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {step === 1 ? (
              <form className="space-y-6\" onSubmit={handleSubmit}>
                {(formError || error) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{formError || error}</span>
                  </div>
                )}
                
                <div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full name"
                    autoComplete="name"
                    required
                    leftIcon={<User size={20} />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    autoComplete="email"
                    required
                    leftIcon={<Mail size={20} />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Only Gmail accounts are allowed for registration"
                  />
                </div>
                
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                    required
                    leftIcon={<Lock size={20} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText="Password must be at least 6 characters long"
                  />
                </div>
                
                <div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm password"
                    autoComplete="new-password"
                    required
                    leftIcon={<Lock size={20} />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleVerify}>
                <div className="text-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900">Verify your email</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    We've sent a 6-digit code to <span className="font-medium">{email}</span>
                  </p>
                </div>
                
                {(formError || error) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{formError || error}</span>
                  </div>
                )}
                
                <div>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    label="Verification code"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-xl tracking-widest"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Verify & Complete Signup
                  </Button>
                </div>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                  >
                    Didn't receive a code? Resend
                  </button>
                </div>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-500 text-sm"
                    onClick={() => setStep(1)}
                  >
                    Go back to signup
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;