'use client'

import { create } from 'zustand';

interface AppState {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    loading: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    sidebarOpen: false,
    theme: 'light',
    loading: false,
    toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open: boolean) =>
        set({ sidebarOpen: open }),
    setTheme: (theme: 'light' | 'dark') =>
        set({ theme }),
    setLoading: (loading: boolean) =>
        set({ loading }),
}));
