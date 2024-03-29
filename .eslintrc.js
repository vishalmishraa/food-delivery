module.exports = {
    extends: 'airbnb',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: {
        node: true,
    },
    rules: {
        indent: ['error', 4],
        'consistent-return': 'off',
        "import/extensions":['never'],
        camelcase: 'off',
        'import/prefer-default-export': 'off',
        'no-const-assign': 'off',
    },
};
