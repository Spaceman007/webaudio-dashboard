
console.log('eslint your files, wait...')
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "warn",
            "never"
        ],
      "no-console": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "space-infix-ops": ["error", { "int32Hint": false }],
      "space-before-function-paren": ["error", "always"],
      "comma-spacing": ["error", { "before": false, "after": true }]
    }
};
