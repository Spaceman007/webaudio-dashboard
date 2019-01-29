const path = require('path')
const lintConfig = require('./.eslintrc.js')

export default {
  urlLoaderExcludes: [/\.md$/],
  base: '/',
  publicPath: '/',
  exportStatic: {},
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: true,
      routes: {
        exclude: [
          /models/,
          /components/,
          /utils/,
          /documents/
        ]
      }
    }]
  ],
  proxy: {
    '/music': {
      'target': 'http://localhost:9000/',
    }
  },
  alias: {
    '@': path.resolve('./src'),
    '@components': path.resolve('./src/components'),
    '@utils': path.resolve('./src/utils'),
    '@documents': path.resolve('./src/documents')
  },
  chainWebpack(config, { webpack }) {
    config.module.rule('markdown')
      .test(/\.md/)
      .pre()
      .use('markdown')
      .loader('raw-loader')

    // config.module
    //   .rule('lint')
    //     .test(/\.js$/)
    //     .pre()
    //     .include
    //       .add(path.resolve('src'))
    //       .end()
    //     .use('eslint')
    //       .loader('eslint-loader')
    //       .options(lintConfig)
  }
}
