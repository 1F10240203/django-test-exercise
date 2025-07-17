const path = require('path');

module.exports = {
    mode: 'development',
    
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../todo/static/todo/js')
    },
    module: {
        rules: [
			{
				
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							
							['@babel/preset-react', { 'runtime': 'automatic' }],
							
							'@babel/preset-typescript',
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [
									require('tailwindcss'),
									require('autoprefixer'),
								],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},
		],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
	}
};