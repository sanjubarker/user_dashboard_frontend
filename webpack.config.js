import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

export default {
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve('./dist'), // Your output path
    filename: 'bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile using Babel
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys), // Inject environment variables
  ],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'), // Add polyfills if needed
    },
  },
};
