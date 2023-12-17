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
<<<<<<< HEAD
					blue_light: "#232f3e",
					blue_dark: "#131921",
					orange: "#0ad5d5",
=======
					blue_light: "#145369",
					blue_dark: "#0b2d39",
					orange: "#febd69",
>>>>>>> 32521a95a8c8566e91f1307c34cfd17a197f1597
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
