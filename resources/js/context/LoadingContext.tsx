import React, { createContext, useState, ReactNode } from 'react';

interface TypeLoadingContext {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Membuat konteks dengan nilai default
const LoadingContext = createContext<TypeLoadingContext | undefined>(undefined);

interface LoadingContextProviderProps {
    children: ReactNode;
}

export const LoadingContextProvider: React.FC<LoadingContextProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Hook untuk menggunakan konteks
export const useLoadingContext = (): TypeLoadingContext => {
    const context = React.useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoadingContext must be used within a LoadingContextProvider');
    }
    return context;
};
