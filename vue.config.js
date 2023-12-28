const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Moods',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './public/service-worker.js'
    }
  },
  publicPath: process.env.NODE_ENV ? '/moods/' : '/'
})
