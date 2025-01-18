/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        screens: { sm: "100%", md: "100%", lg: "100%", xl: "75rem" },
        padding: {
          DEFAULT: "1rem",
          sm: "0.5rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem",
        },
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(700px, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
