import React, { createContext, useContext, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';


export type AppTheme = 'light' | 'dark';


type Ctx = { theme: AppTheme; toggle: () => void };


const ThemeCtx = createContext<Ctx | null>(null);


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const system = (useColorScheme() as AppTheme) || 'light';
    const [theme, setTheme] = useState<AppTheme>(system);
    const value = useMemo(() => (
        {
            theme,
            toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
        }),
        [theme]);
        
    return (
        <ThemeCtx.Provider value={value}>
            {children}
        </ThemeCtx.Provider>
    );
};


export const useAppTheme = () => {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
    return ctx;
};