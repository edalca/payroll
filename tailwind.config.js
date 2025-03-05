
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        'node_modules/preline/dist/*.js',
    ],
    plugins: [require("tailwindcss-animate"), require('preline/plugin'),require('@tailwindcss/forms')]
};
