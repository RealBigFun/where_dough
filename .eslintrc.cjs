module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['svelte3', '@typescript-eslint', "simple-import-sort"],
    ignorePatterns: ['*.cjs'],
    overrides: [
        {
            files: ['*.svelte'], 
            processor: 'svelte3/svelte3'
        },
        // override "simple-import-sort" config
        {
            "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
            "rules": {
                "simple-import-sort/imports": [
                    "error",
                    {
                        "groups": [
                            // Packages `react` related packages come first.
                            ["^svelte", "^@?\\w"],
                            // Internal packages.
                            ["^(@|components)(/.*|$)"],
                            // Side effect imports.
                            ["^\\u0000"],
                            // Parent imports. Put `..` last.
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            // Style imports.
                            ["^.+\\.?(css)$"]
                        ]
                    }
                ]
            }
        }
    ],
    settings: {
        'svelte3/typescript': () => require('typescript')
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    }
};
