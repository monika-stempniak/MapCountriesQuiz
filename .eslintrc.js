module.exports = {
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:flowtype/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    fetch: false,
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "object-shorthand": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "react/jsx-one-expression-per-line": [
      {
        allow: "literal",
      },
    ],
    "react/button-has-type": "off",
    "no-console": "warn",
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",
    "no-debugger": "off",
    "jsx-a11y/label-has-for": [
      2,
      {
        components: ["Label"],
        required: {
          some: ["nesting", "id"],
        },
        allowChildren: false,
      },
    ],
  },
};
