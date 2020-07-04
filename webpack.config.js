const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

let config = {
    target: 'electron-renderer',
    entry:
    {
        index: Path.resolve(__dirname, './src/web/index.js')
    },
    output:
    {
        path: Path.resolve(__dirname, './dist/'),
        filename: '[name].js'
    },
    module:
    {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /.svg$/,
            loader: 'file-loader',
            options: {
                outputPath: 'resource',
                name: '[name].svg'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, './src/web/index.html')
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.vue', '.js', '.json', '*']
    }
}

if (process.env.NODE_ENV === 'development') {
    config = Object.assign(config, {
        mode: 'development',
        devtool: 'eval-source-map',
        devServer:
        {
            contentBase: Path.resolve(__dirname, './dist/web'),
            historyApiFallback: true,
            inline: true
        }
    })
} else {
    config = Object.assign(config, {
        mode: 'production'
    })
}

module.exports = config
