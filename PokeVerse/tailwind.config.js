import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'pokemon-red': '#FF0000',
                'pokemon-blue': '#3B4CCA',
                'pokemon-yellow': '#FFDE00',
                'pokemon-green': '#4ADE80',
                'pokemon-purple': '#A855F7',
                'pokemon-orange': '#FB923C',
                'pokemon-pink': '#EC4899',
                'pokemon-teal': '#14B8A6',
                'pokemon-indigo': '#6366F1',
                'pokemon-gray': '#6B7280',
                'pokemon-dark': '#1F2937',
                'pokemon-light': '#F9FAFB',
            },
            backgroundImage: {
                'gradient-pokemon': 'linear-gradient(135deg, #3B4CCA 0%, #FF0000 100%)',
                'gradient-fire': 'linear-gradient(135deg, #FF0000 0%, #FB923C 100%)',
                'gradient-water': 'linear-gradient(135deg, #3B4CCA 0%, #14B8A6 100%)',
                'gradient-electric': 'linear-gradient(135deg, #FFDE00 0%, #F59E0B 100%)',
                'gradient-grass': 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                'gradient-psychic': 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
            },
            boxShadow: {
                'pokemon-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'pokemon': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'pokemon-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'pokemon-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'pokemon-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'pokemon-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'pokemon-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                'pokemon-glow': '0 0 20px rgba(59, 76, 202, 0.5)',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '112': '28rem',
                '128': '32rem',
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },

    plugins: [forms],
};
