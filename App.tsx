import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import type { UserInfo, HistoryItem, EditedResult, OriginalImage, OriginalVideo } from './types';

// Let's create dummy content components to make the app structure clearer
const EditorTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Editor Functionality Here</div>;
const CombineTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Combine Functionality Here</div>;
const VideoTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Video Functionality Here</div>;
const BotTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Bot Functionality Here</div>;
const TrendingTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Trending Prompts Here</div>;
const CommunityTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">Community Prompts Here</div>;
const HistoryTab = () => <div className="p-4 bg-[var(--card-bg-color)] rounded-lg">History of Edits Here</div>;


type Tab = 'Editor' | 'Combine' | 'Video' | 'Trending' | 'History' | 'Community' | 'Bot';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false to show login
    const [activeTab, setActiveTab] = useState<Tab>('Editor');

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = window.localStorage.getItem('theme') as Theme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return savedTheme || (prefersDark ? 'dark' : 'light');
        }
        return 'dark';
    });

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = useCallback(() => {
        setTheme(current => (current === 'light' ? 'dark' : 'light'));
    }, []);

    const handleLogin = async (username: string, password: string): Promise<void> => {
        // Dummy authentication logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'password') {
                    setIsAuthenticated(true);
                    resolve();
                } else {
                    reject(new Error('Invalid username or password'));
                }
            }, 1000);
        });
    };
    
    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
    }, []);

    const handleFeedbackClick = useCallback(() => {
        // In a real app, this would open a modal or navigate to a feedback page.
        alert('Thank you for your feedback!');
    }, []);

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Editor': return <EditorTab />;
            case 'Combine': return <CombineTab />;
            case 'Video': return <VideoTab />;
            case 'Bot': return <BotTab />;
            case 'Trending': return <TrendingTab />;
            case 'Community': return <CommunityTab />;
            case 'History': return <HistoryTab />;
            default: return <EditorTab />;
        }
    };

    if (showSplash) {
        return <SplashScreen />;
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                theme={theme}
                toggleTheme={toggleTheme}
                onFeedbackClick={handleFeedbackClick}
                onLogout={handleLogout}
            />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {renderActiveTab()}
            </main>
        </div>
    );
};

export default App;
