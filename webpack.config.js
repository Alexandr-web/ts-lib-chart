const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const devConfig = {
	entry: "./src/ts/index.ts",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 9000,
		compress: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			templateParameters: { title: "DevPage", },
		}),
		new MiniCssExtractPlugin({ filename: "index.css", })
	],
	resolve: { plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json", })], },
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
					"postcss-loader"
				],
			},
			{
				test: /\.([cm]?ts|tsx)$/,
				loader: "ts-loader",
			}
		],
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
};

const productionConfig = {};

module.exports = (env, args) => {
	switch (args.mode) {
		case "development":
			return devConfig;
		case "production":
			return productionConfig;
	}
};