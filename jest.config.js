module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: "jsdom" // or "node", depending on your setup
  };