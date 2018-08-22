module.exports = {
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:flowtype/recommended",
  ],
  "globals": { "fetch": false },
  "rules": {
    "comma-dangle": ["error", "always-multiline"],
    "object-shorthand": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [{ "allow": "literal" }],
    "react/button-has-type": "off",
  }
};
