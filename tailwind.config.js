/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				amazon: {
					blue_light: "#145369",
					blue_dark: "#0b2d39",
					orange: "#febd69",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
