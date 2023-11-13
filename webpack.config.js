import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const config = {
    entry: './src/business-model-canvas.ts',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: ['ts-loader', 'minify-html-literals-loader'],
            exclude: /node_modules/,
        }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'business-model-canvas.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ]
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin
        ]
    },
    devServer: {
        static: path.join(__dirname, './dist'),
        compress: true,
        port: 4000
    },
};

export default config;