/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-400": "#4f8bff",
        "blue-500": "#007bff",
        "blue-600": "#0056b3",
        "yellow-400": "#fbbf24",
        "red-500": "#f56565",
      },
    },
  },
  plugins: [],
};
