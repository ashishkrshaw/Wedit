
import React, { useState } from 'react';
import { MagicEditorLogo, UserIcon, LockClosedIcon, AlertTriangleIcon } from './IconComponents';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'ashishkrshaw' && password === 'Kalavu@#8999') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-color)] p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <MagicEditorLogo className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color-strong)] mt-4">
            Magic Editor
          </h1>
          <p className="text-sm text-[var(--text-color)]">Please sign in to continue</p>
        </div>

        <div className="bg-[var(--card-bg-color)] p-8 rounded-xl shadow-lg border border-[var(--border-color)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--text-color-strong)]">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-[var(--text-color)]/50" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 bg-[var(--input-bg-color)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] sm:text-sm"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-color-strong)]">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-[var(--text-color)]/50" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 bg-[var(--input-bg-color)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start text-sm text-red-600">
                <AlertTriangleIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white dark:text-slate-900 bg-[var(--accent-color)] hover:bg-[var(--accent-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)] transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
