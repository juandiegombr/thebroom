const path = require('path')

const baseUrl = '/thebroom/'

module.exports = {
	outputDir: path.join('./docs'),
	baseUrl,
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/css/variables.scss";`
			}
		}
	},
	configureWebpack: {
		devtool: 'source-map'
	}
}
