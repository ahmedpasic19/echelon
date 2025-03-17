import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            dark: '#121212',
            'my-gray': {
               100: '#1B1B1B',
               200: '#2B2B2B',
               300: '#3B3B3B',
               400: '#4B4B4B',
               500: '#5B5B5B',
               600: '#6B6B6B',
               700: '#7B7B7B',
               800: '#8B8B8B',
               900: '#9B9B9B',
            },
         },
         borderWidth: {
            1: '1px',
         },
      },
   },
   plugins: [],
   darkMode: 'class',
}
export default config
