import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { LoadingContextProvider } from './context/LoadingContext'; // Import provider Anda

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        return resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );
    },
    setup({ el, App, props }) {
        // Bungkus aplikasi dengan LoadingContextProvider
        if (import.meta.env.SSR) {
            hydrateRoot(el, <LoadingContextProvider><App {...props} /></LoadingContextProvider>);
            return;
        }

        createRoot(el).render(<LoadingContextProvider><App {...props} /></LoadingContextProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
