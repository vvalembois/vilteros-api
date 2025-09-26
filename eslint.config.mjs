import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
	{
		languageOptions: {
			globals: {
				...globals.GlobalsEs2025,
				...globals.node,
				node: true
			},
			ecmaVersion: 2018
		},
		rules: {
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'no-undef': 'off',
		}
	},
	pluginJs.configs.recommended,
];