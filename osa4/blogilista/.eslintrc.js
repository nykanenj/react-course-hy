module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 2018
    },
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
  }
};
