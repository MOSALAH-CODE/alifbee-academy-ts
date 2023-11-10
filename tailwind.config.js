import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            colors: {
                body: "#F1F2F5",
                primary: {
                    light: "#fee186",
                    DEFAULT: "#fec321",
                    dark: "#fc7311",
                    50: "#fff8e2",
                    100: "#feedb5",
                    200: "#fee186",
                    300: "#fed656",
                    400: "#fecc34",
                    500: "#fec321",
                    600: "#fdb51b",
                    700: "#FCAE39",
                    800: "#fd9216",
                    900: "#fc7311",
                },
                secondary: {
                    light: "#c7a9c1",
                    DEFAULT: "#83567a",
                    dark: "#422a47",
                    50: "#ffe6f4",
                    100: "#e4c9dd",
                    200: "#c7a9c1",
                    300: "#ad88a4",
                    400: "#8E7F91",
                    500: "#83567a",
                    600: "#68556C",
                    700: "#664161",
                    800: "#543655",
                    900: "#422a47",
                },
            },
            fontFamily: {
                sans: ["Roboto", "Figtree", ...defaultTheme.fontFamily.sans],
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },

    plugins: [forms],
};
