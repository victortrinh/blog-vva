import stylisticJs from '@stylistic/eslint-plugin-js';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            "@next/next/no-img-element": "off",
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/quotes': ['error', "double"],
        }
    }
];

export default eslintConfig;