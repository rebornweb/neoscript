module.exports = {
    entry: './js/main.ts',    // Your main TypeScript file
    output: {
      path: __dirname + '/js',   // Output directory
      filename: 'bundle.js'        // Output filename
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
  