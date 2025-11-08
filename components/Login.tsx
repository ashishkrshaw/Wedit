
import React, { useState } from 'react';
import { MagicEditorLogo } from './IconComponents';

interface LoginProps {
    onLogin: (username: string, password: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await onLogin(username, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-color)] p-4">
            <div className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--card-bg-color)] p-8 shadow-2xl shadow-slate-500/10 dark:shadow-black/20 animate-fade-in">
                <div className="mb-8 text-center">
                    <MagicEditorLogo className="mx-auto h-16 w-16" />
                    <h1 className="mt-4 text-2xl font-bold text-[var(--text-color-strong)]">
                        Magic Editor
                    </h1>
                    <p className="mt-1 text-sm text-[var(--text-color)]">
                        Please sign in to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-[var(--text-color-strong)]"
                        >
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full appearance-none rounded-md border border-[var(--border-color)] bg-[var(--input-bg-color)] px-3 py-2 placeholder-[var(--text-color)]/50 shadow-sm focus:border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-[var(--text-color-strong)]"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full appearance-none rounded-md border border-[var(--border-color)] bg-[var(--input-bg-color)] px-3 py-2 placeholder-[var(--text-color)]/50 shadow-sm focus:border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)] sm:text-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-center text-red-600">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md border border-transparent bg-[var(--accent-color)] py-2 px-4 text-sm font-medium text-white dark:text-slate-900 shadow-sm hover:bg-[var(--accent-color-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
