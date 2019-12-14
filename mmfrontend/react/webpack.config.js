const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app.tsx",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },

    devServer: {
        // 'contentBase' - Tells the server where to serve content from. 
        // This is only necessary if you want to serve static files.
        contentBase: path.resolve(__dirname, '/content/'),
        compress: true,
        port: 8080
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".json", ".js", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // For css loader
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
            'NODE_ENV': JSON.stringify('production')
            }
        }),
        // This is necessary to let webpack know your index file.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
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
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};