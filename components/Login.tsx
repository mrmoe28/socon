import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AuthError } from '../services/authService';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'signin' | 'signup' | 'forgot';

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('signin');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signIn(email, password);
      resetForm();
      onClose();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      setSuccess('Account created successfully! You can now sign in.');
      setTimeout(() => {
        setViewMode('signin');
        resetForm();
      }, 2000);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Check your inbox for instructions.');
      setTimeout(() => {
        setViewMode('signin');
        resetForm();
      }, 3000);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (err: unknown) => {
    const authError = err as AuthError;
    let errorMessage = 'An error occurred. Please try again.';
    
    switch (authError.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'An account with this email already exists. Please sign in instead.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak. Please use a stronger password.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        errorMessage = authError.message || errorMessage;
    }
    
    setError(errorMessage);
  };

  const handleClose = () => {
    resetForm();
    setViewMode('signin');
    onClose();
  };

  const getTitle = () => {
    switch (viewMode) {
      case 'signup':
        return 'CREATE ACCOUNT';
      case 'forgot':
        return 'RESET PASSWORD';
      default:
        return 'PORTAL LOGIN';
    }
  };

  const getSubtitle = () => {
    switch (viewMode) {
      case 'signup':
        return 'Create a new account to get started';
      case 'forgot':
        return 'Enter your email to reset your password';
      default:
        return 'Sign in to access your account';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-industrial-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-md relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="p-8 pb-6 border-b border-zinc-800">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                  {getTitle()}
                </h2>
                <p className="text-zinc-400 text-sm">
                  {getSubtitle()}
                </p>
              </div>

              {/* Form */}
              <form 
                onSubmit={
                  viewMode === 'signup' 
                    ? handleSignUp 
                    : viewMode === 'forgot' 
                    ? handleForgotPassword 
                    : handleSignIn
                } 
                className="p-8 space-y-6"
              >
                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <p className="text-green-400 text-sm">{success}</p>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-industrial-accent focus:border-transparent transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field - Hidden in forgot password mode */}
                {viewMode !== 'forgot' && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-industrial-accent focus:border-transparent transition-all"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {/* Confirm Password Field - Only in signup mode */}
                {viewMode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-industrial-accent focus:border-transparent transition-all"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-industrial-accent text-black font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      {viewMode === 'signup' ? 'Creating account...' : viewMode === 'forgot' ? 'Sending...' : 'Signing in...'}
                    </>
                  ) : (
                    viewMode === 'signup' ? 'CREATE ACCOUNT' : viewMode === 'forgot' ? 'SEND RESET EMAIL' : 'SIGN IN'
                  )}
                </button>

                {/* Mode Toggle Links */}
                <div className="space-y-2 text-center">
                  {viewMode === 'signin' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setViewMode('forgot');
                        }}
                        className="text-sm text-industrial-accent hover:text-orange-400 transition-colors"
                      >
                        Forgot password?
                      </button>
                      <p className="text-xs text-zinc-500">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setViewMode('signup');
                          }}
                          className="text-industrial-accent hover:text-orange-400 transition-colors font-medium"
                        >
                          Sign up
                        </button>
                      </p>
                    </>
                  )}
                  
                  {viewMode === 'signup' && (
                    <p className="text-xs text-zinc-500">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setViewMode('signin');
                        }}
                        className="text-industrial-accent hover:text-orange-400 transition-colors font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  )}

                  {viewMode === 'forgot' && (
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setViewMode('signin');
                      }}
                      className="text-sm text-industrial-accent hover:text-orange-400 transition-colors"
                    >
                      Back to sign in
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Login;
