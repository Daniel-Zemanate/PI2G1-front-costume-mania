/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      padding: {
        "5vw": "5vw",
      },
      spacing: {
        "1.225rem": "1.225rem",
      },
      flex: {
        2: "2 2 0%",
      },
    },
    colors: {
      "purple-1": "#110633",
      "purple-2": "#710A8B",
      "purple-3": "#B71FD0",
      "orange-1": "#FF941A",
      "orange-2": "#F25F29",
      white: "white",
      red: "#C40F01",
      black: "black",
      grey: "#808080",
      lightGrey: "#D3D3D3",
      green: "#4BB543"
    },
  },
  plugins: [],
};
