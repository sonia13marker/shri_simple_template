const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const LodashWebpackPlugin = require('lodash-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    entry: {
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
    main: {
      dependOn: ['about', 'home'],
      import: './src/index.js',
    },
      },

    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'public/index.html'),
        }),

        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),

        new LodashWebpackPlugin({
          coercions: true,
          exotics: true,
          memoizing: true,
          collections: true,
          paths: true
        }),
        new CleanWebpackPlugin(),

    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },


    mode: 'production',
    target: 'web',

    devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },

    module: {
        rules: [
            {

            // @TODO js rule
            test: /\.(js|jsx)$/i,
            use: { loader: 'babel-loader',
            options: {
            presets: [
              '@babel/preset-env', ['@babel/preset-react', { 
                runtime: 'automatic' }
                ]
                ],
                },
                },
            exclude: /(node_modules)/,

            resolve: { extensions: ['.js', '.jsx'] },
        },
        
        {

            // @TODO css rule
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
           


        //Это для TypeScript, пока не трогать, на будущее пусть будет
        // test: /\, (ts|tsx)$/i,
        // loader: 'ts-loader',
        // exclude: ['/node_modules/'],

    }, 
           
        ],
},
        // @TODO optimizations
 optimization: {
        minimize: true,
        emitOnErrors: true,
        concatenateModules: true,
        moduleIds: 'size',
        mergeDuplicateChunks: true,
        runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
    },
      },
  },


    // @TODO fallback for crypto
     target: 'web',

     resolve: {
    fallback: {
    'crypto': require.resolve('crypto'),
    },
      alias: {
        'crypto-browserify': path.resolve(__dirname, 'src/crypto-fallback.js'),
        'react-is': path.resolve(__dirname, 'node_modules/react-is/cjs/react-is.production.min.js'),
      },
    },
};

    // @TODO lodash treeshaking
    // @TODO chunk for lodash
    // @TODO chunk for runtime

module.exports = config;


const stats = {
    all: false,
    Modules: true,
    children: true,
    chunks: true,
    chunksModules: true,
    chunksOrigins: true,
    entrypoints: true,
    hash: true,
    reasons: true,

};
