import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import tsconfig from './tsconfig.json'
import { Configuration, EnvironmentPlugin } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import dotenv from 'dotenv'


dotenv.config()

type Config = Configuration & Required<Pick<Configuration, 'plugins'>> & { devServer?: DevServerConfiguration }
type WebpackConfigurationGenerator = (env: {}, argv: { mode?: Configuration['mode'] }) => Config

const srcDir = path.join(__dirname, 'src')

const config: WebpackConfigurationGenerator = (env, argv) => {
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
          type: 'asset/resource',
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
      new EnvironmentPlugin(['BOT_API_URL']),
    ],
    stats: {
      modules: false,
    },
    performance: {
      maxEntrypointSize: 1_500_000,
      maxAssetSize: 1_500_000,
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
  } else {
    if (!process.env.PORT)
      throw new Error('Env PORT is not set')

    config.devtool = 'source-map'
    config.devServer = {
      historyApiFallback: true,
      hot: false,
      port: process.env.PORT,
    }
  }

  return config
}

export default config
