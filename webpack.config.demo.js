const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

//TO DO: check if necessary
//var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src/demo'),
  dist: path.join(__dirname, 'dist/demo'),
  assets: path.join(__dirname, 'assets'),
  mocks: path.join(__dirname, 'mocks'),
  deps: path.join(__dirname, 'node_modules')
};

const production = 'production';
const isProduction = process.env.NODE_ENV === 'production'

const version = process.env.VERSION || '0.0.0'

let config = { 
	
	entry: 'src/demo/index.tsx'
	
	, output: { 
		publicPath : '/demo/',
		path: PATHS.dist, 
		filename: '[name].[hash].js',
	}

	// 	app is entirely responsible for building library, which may go beyond app concerns,
	, module: { 
		rules: [

			{ test: /\.png$/, loader: "url-loader?mimetype=image/png" },
        	{ test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff&name=[path][name].[ext]?[hash]' },
        	{ test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff2&name=[path][name].[ext]?[hash]' },
        	{ test: /\.eot$/, loader: 'url-loader?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]?[hash]' },
        	{ test: /\.[ot]tf$/, loader: 'url-loader?mimetype=application/octet-stream&name=[path][name].[ext]?[hash]' },
        ],
	}
	
	, resolve: { 
	
		// second entry tells webpack to find peers of linked libraries in the app.
		modules: [ 'node_modules', path.resolve('node_modules') ] ,

		// second entry tells webpack we're working with typescript modules.
		mainFields: ["main","types"],
		extensions: [ '.js', '.ts', '.tsx', '.json', '.png' ]

		, alias: { 

			inherits$: path.resolve(__dirname, 'node_modules/inherits') ,
			util$: path.resolve(__dirname, 'node_modules/util'),
			src: path.resolve(__dirname, 'src/'),
			assets: path.resolve(__dirname, 'assets/'),
			MaterialIcons$: path.resolve(__dirname, 'node_modules/material-design-icons/iconfont/material-icons.css'),
			Bootstrap$: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
		}
	}

	, plugins: [

		// for scope hoisting over modules: concatenate the scope of all modules into one closure
		// and allow for code to have a faster execution time in the browser
		new webpack.optimize.ModuleConcatenationPlugin(),

        //fork ts into a different threads
        new ForkTsCheckerWebpackPlugin({
        	//checks for both syntactic errors and semantic errors
        	checkSyntacticErrors: true,
        	silent: isProduction?true:false
        }),

		new HtmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.ejs',
			title: 'Web Admin', appMountId: 'app', inject: false
		}),

		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),

		new webpack.DefinePlugin({
			'process.env.VERSION': JSON.stringify(version)
		}),

	]
}


switch (process.env.NODE_ENV) {
	case production:

		//create an happypack threadpool
		//change the size to fit the numbers of core in the machine
		//happypack reduces build time of ~2.5s in 2 core local machine

		config.module.rules = [

			...config.module.rules,

			{ test: /\.tsx?$/,  use: [ { loader:'ts-loader', options: { transpileOnly: true} } ] },

			{ test: /\.s?css$/, use: ["style-loader","css-loader","sass-loader"]},

		]

		//make use of the chunkhashes only at buildtime for performance reasons
		config.output.filename = '[name].[chunkhash].js';

		config.plugins = [
			
			...config.plugins, // ES6 array destructuring, available in Node 5+

			//setup production NODE_ENV setting to remove all the development oriented warnings and overhead
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(production)
			}),

			new HtmlWebpackPlugin({
				template: 'node_modules/html-webpack-template/index.ejs',
				title: 'React Virtualized Tabl Demo',
				appMountId: 'app',
				inject: false,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),

			//intermediate caching step for modules
			//run webpack twice for see results in performances
			//it does not affect normal chunkhash working
			//new HardSourceWebpackPlugin()

		]

		break;
	default:

		config['devtool'] = "eval-source-map";

		config.module.rules = [

			...config.module.rules,

			{ test: /\.tsx?$/,  use: [ { loader:'ts-loader', options: { transpileOnly: true} } ] },

			{ test: /\.s?css$/, use: ["style-loader","css-loader","sass-loader"]},

		]

		config.plugins = [

			...config.plugins,

			new webpack.NamedModulesPlugin(),

			new webpack.HotModuleReplacementPlugin(),
			
			new HtmlWebpackPlugin({
				template: 'node_modules/html-webpack-template/index.ejs',
				title: 'React Virtualized Table Demo',
				appMountId: 'app',
				inject: false
			})
		]


		const host = 'localhost';
		const port = process.env.APP_PORT_HTTP || '8081'

		config['devServer'] = {
			contentBase: PATHS.dist,
			host: process.env.HOST,
			port: process.env.PORT,

			// Enable history API fallback so HTML5 History API base routing works.
			historyApiFallback: true,

			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},

			//enable HMR
			hot: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only'
		};

		//this option specifies the public URL of the output directory when referenced in a browser
		config.output['publicPath'] = '/'

		break;
}

module.exports = config;