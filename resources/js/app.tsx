import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Importa Preline (solo el CSS y JS base, sin inicialización automática)
import 'preline/preline';


const appName: string = import.meta.env.VITE_APP_NAME || 'Laravel';


createInertiaApp({
  title: (title: string) => `${appName} | ${title}`,
  resolve: (name: string) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#fbbf24',
  },
});
