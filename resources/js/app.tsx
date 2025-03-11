import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { HSStaticMethods } from 'preline';
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
    const initializePreline = () => {
      HSStaticMethods.autoInit();
    };

    // Ejecutar `autoInit` inicialmente al cargar la página
    initializePreline();

    // Observar cambios dinámicos en el DOM
    const observer = new MutationObserver(() => {
      initializePreline();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    el.removeAttribute('data-page');
  },
  progress: {
    color: '#fbbf24',
  },
});
