module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest/globals": true,
    },
    "extends": [ 
      "airbnb",
      "plugin: react/recommended" 
    ],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
      "react", "jest"
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
            "error",
            "always"
        ],
	"no-console": 0,
	"prefer-destructuring": 0,
	"consistent-return": 0,
	"no-underscore-dangle": 0,
	"no-param-reassign": 0,
  "arrow-parens": 0,
  "global-require": 0,
  "no-restricted-syntax": 0,
  "no-await-in-loop": 0,
  "no-throw-literal": 0,
  "react/jsx-filename-extension": 0,
  "react/require-default-props": 0,
  "no-shadow": 0,
  "object-curly-newline": 0,
  "react/prop-types": 0,
  "import/no-extraneous-dependencies": 0,
  }
};
