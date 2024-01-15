import { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-background-color': '#e5eaf1',
      },
    },
  },
} satisfies Config;
