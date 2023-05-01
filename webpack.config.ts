import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import tsconfig from './tsconfig.json'
import webpack from 'webpack'


const srcDir = path.join(__dirname, 'src')

export default (env: {}, argv: { mode?: webpack.Configuration['mode'] }) => {
  const config: webpack.Configuration = {
    mode: argv.mode || 'development',
    entry: {
      main: `${srcDir}/react/index.tsx`,
    },
    output: {
      filename: '[contenthash].js',
      publicPath: '/',
      path: path.join(__dirname, tsconfig.compilerOptions.outDir),
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
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
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Loading...',
        favicon: `${srcDir}/static/images/favicon.ico`,
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
          preset: ['default', {
            discardComments: { removeAll: true },
            cssDeclarationSorter: true,
          }],
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
