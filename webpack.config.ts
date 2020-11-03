import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';


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
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/i,
                exclude: [/\.global\.scss$/i],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            modules: {
                                exportLocalsConvention: 'camelCaseOnly',
                                localIdentName:
                                    NODE_ENV === 'development'
                                        ? '[local]--[hash:base64:3]'
                                        : '[hash:base64:6]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {

                        }
                    }
                ],
            }, {
                test: /\.global\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {

                        }
                    }
                ],
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    filename: 'js/static.js',
                    name: 'static',
                    test: /node_modules/
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.PORT': JSON.stringify(process.env.PORT || 2016)
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            "@kitcon/core": path.join(ROOT_PATH, '..', 'kitcon-core', 'src'),
            "@kitcon/ui": path.join(ROOT_PATH, '..', 'kitcon-ui', 'src'),
            "@kitcon/node": path.join(ROOT_PATH, '..', 'kitcon-node', 'src')
        }
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
            web: [path.join(SRC_PATH, 'browser', 'browser.tsx')],
            vendors: [path.join(SRC_PATH, 'vendors', 'index.ts')],
        },
        output: {
            filename: 'js/[name].js',
            path: PUBLIC_PATH,
            publicPath: '/'
        },
        plugins: [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'assets',
                        to: 'assets'
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                filename: '../server/views/index.mst',
                template: 'server/views/index.mst'
            }),
            new webpack.DefinePlugin({
                'global.IS_BROWSER': true,
            })
        ],
        target: 'web'
    },
    {
        ...config,
        devtool: NODE_ENV === 'development' ? 'source-map' : null,
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
            nodeExternals({
                allowlist: [/kitcon\//]
            })
        ],
        plugins: [
            ...config.plugins,
            new webpack.DefinePlugin({
                'global.ROOT_PATH': JSON.stringify(ROOT_PATH),
            }),
            // @ts-ignore
            new WebpackShellPlugin({
                onBuildEnd: {
                    scripts: ['node dist/server/server.js']
                }
            }),
        ],
        target: 'node'
    }
];
