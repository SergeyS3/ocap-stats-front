import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import tsconfig from './tsconfig.json'
import { Configuration, DefinePlugin } from 'webpack'
import dotenv from 'dotenv'


dotenv.config()

type Config = Configuration & Required<Pick<Configuration, 'plugins'>>

const srcDir = path.join(__dirname, 'src')

export default (env: {}, argv: { mode?: Configuration['mode'] }) => {
  const config: Config = {
    mode: argv.mode || 'development',
    entry: {
      main: `${srcDir}/index.tsx`,
    },
    output: {
      filename: '[contenthash].js',
      publicPath: '/',
      path: path.join(__dirname, tsconfig.compilerOptions.outDir),
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: 'file-loader',
        },

      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Loading...',
        favicon: `${srcDir}/assets/images/favicon.ico`,
      }),
      new DefinePlugin({
        'process.env': ['BOT_API_URL'].reduce((acc, varName) => ({
          ...acc,
          [varName]: JSON.stringify(process.env[varName]),
        }), {}),
      }),
    ],
    stats: {
      modules: false,
    },
  }

  if (argv.mode === 'production') {
    config.plugins.push(
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { cssDeclarationSorter: false }],
        },
      }),
    )
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.uglifyJsMinify,
        }),
      ],
    }
  } else
    config.devtool = 'source-map'

  return config
}
