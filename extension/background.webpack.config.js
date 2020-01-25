var webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin({
      REACT_APP_API: "http://localhost:3001/" // use 'localhosts' unless process.env.REACT_APP_API is defined
    })
  ]
};
