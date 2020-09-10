import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';

// @ts-ignore
import * as WebpackShellPlugin from 'webpack-shell-plugin-next';


export const ROOT_PATH = __dirname;

const DIST_PATH = path.join(__dirname, 'dist');
const SRC_PATH = path.join(__dirname, 'src');

const PUBLIC_PATH = path.join(DIST_PATH, 'public');
export const SERVER_PATH = path.join(DIST_PATH, 'server');

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '2016', 0);

const config = {
    context: SRC_PATH,
    mode: NODE_ENV,
    module: {
        rules: []
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    filename: 'js/static.js',
                    name: 'static',
                    test: /node_modules|vendors/
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.PORT': JSON.stringify(process.env.PORT || 2016)
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    }
};

module.exports = [

    {
        devtool: NODE_ENV === 'development' ? 'source-map' : null,
        ...config,
        module: {
            rules: [
                ...config.module.rules,
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'awesome-typescript-loader'
                }
            ]
        },
        entry: {
            web: [path.join(SRC_PATH, 'browser', 'browser.tsx')]
        },
        output: {
            filename: 'js/[name].js',
            path: PUBLIC_PATH,
            publicPath: '/'
        },
        plugins: [
            ...config.plugins,
            new HtmlWebpackPlugin({
                filename: '../server/views/index.html',
                template: 'server/views/index.html'
            })
        ],
        target: 'web'
    },
    {
        ...config,
        entry: {
            server: path.join(SRC_PATH, 'server', 'server.tsx')
        },
        module: {
            rules: [
                ...config.module.rules,
                {
                    test: /\.(ts|tsx)?$/,
                    use: {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.server.json' 
                        }
                    }
                }
            ]
        },
        output: {
            filename: '[name].js',
            path: path.join(SERVER_PATH)
        },
        externals: [
            nodeExternals()
        ],
        plugins: [
            ...config.plugins,

            // @ts-ignore
            new WebpackShellPlugin({
                onBuildEnd: {
                    scripts: ['node dist/server/server.js']
                }
            }),
            new webpack.DefinePlugin({
                'global.ROOT_PATH': JSON.stringify(ROOT_PATH),
            })
        ],
        target: 'node'
    }
];
