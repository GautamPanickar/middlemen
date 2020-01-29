const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/app.tsx',
        // Currently cusing one chunk, if at a later point you are interested in splitting bundles,
        // do it as given below. Or refer code splitting in webpack.
        // global: './src/staticassets.ts', 
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        // 'contentBase' - Tells the server where to serve content from. 
        // This is only necessary if you want to serve static files.
        contentBase: path.resolve(__dirname, '/dist/'),
        compress: true,
        port: 8080
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.json', '.js', '.css']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            // For css loader
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            // Used for loading fonts and images
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BASE_URL': `'http://localhost:3000'`
            }
        }),
        // This is necessary to let webpack know your index file.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            // When separate chunks are needed it can be specified as follows
            // chunks: ['main', 'global'],
            chunks: ['main'],
            chunksSortMode: 'manual',
        }),
        // This is used for generating css bundles
        // Not using this for the time being, as the CSS is currently linked via
        // new ExtractTextPlugin('[name].css'),

        // To prevent the public path issue when loading external static css, this needs to be done
        new CopyWebpackPlugin([
            { from: './content/', to: 'content' },
            // { from: './content/img/favicon.ico', to: 'favicon.ico' }
        ]),
    ],

    /**
     * When importing a module whose path matches one of the following, just 
     * assume a corresponding global variable exists and use that instead.
     * This is important because it allows us to avoid bundling all of our
     * dependencies, which allows browsers to cache those libraries between builds.
     * ----------------------------------------------------------
     * For some reason this happens to be not working as expected. 
     * There are workarounds offered, but I prefer not to use that.
     * ---------------------------------------------------------
     */
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // }
};