/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "iceberg-blue": "#8BABD8",
        "light-green": "#78E378",
        "navy-grey": "#707991",
        red: "#F71735",
        "rich-black": "#011627",
        main: "url(/public/bg.png),_lightgray_0%_0%_/_60.00000238418579px_60.00000238418579px_repeat",
      },
    },
    colors: {
      "iceberg-blue": "#8BABD8",
      "light-green": "#78E378",
      "light-grey": "#F5F5F5",
      "navy-grey": "#707991",
      red: "#F71735",
      "rich-black": "#011627",
    },
  },
  plugins: [],
};
