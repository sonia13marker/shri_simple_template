const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    entry: {
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },


    mode: 'production',
    target: 'web',

    module: {
        rules: [
            {
        test: /\, (ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],


            // @TODO js rule

            {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader
      },



            // @TODO css rule
            //написано также перед этим: file.js    import css from "file.css"; 
            test: /\.css$/i,
        use: ["style-loader", "css-loader"],
            


            //еще одна попытка загрузить сss loader
            loader: 'css-loader',
            options: {
                modules: true
            }


           
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts','.js'],

    }



  // @TODO optimizations
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        innerGraph: true, 
        concatenateModules: true,

    //(возможно относится к @TODO chunk for runtime)
        splitChunks: {
            minChunks: 2,
            chunks: 'all',
            minSize: 0,
        }

  // создание распределенного файла времени выполнения (runtime) (возможно относится к @TODO chunk for runtime)
  runtimeChunk: 'single',

  }


    // @TODO lodash treeshaking


    // @TODO chunk for lodash
    // @TODO chunk for runtime
  
    // @TODO fallback for crypto
};

module.exports = config;
