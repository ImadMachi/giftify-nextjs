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
					blue_light: "#232f3e",
					blue_dark: "#131921",
					orange: "#0ad5d5",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
