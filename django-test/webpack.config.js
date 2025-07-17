const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../django_react/react_app/static/js')
    },
    module: {
        rules: [
			{
				test: /\.js[x]?$/,  
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react' 
						],
						plugins: ['@babel/plugin-syntax-jsx'] 
					}
				}
			},
			{
				test: /\.ts[x]?$/,  
				exclude: /node_modules/,
				use: 'ts-loader',
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
		],	
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
	}
};
