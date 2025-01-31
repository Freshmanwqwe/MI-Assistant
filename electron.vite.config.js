import { resolve, join } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

const publicDir = resolve('./public')
const envDir = resolve('.')
// process.env = {...process.env, ...loadEnv(mode, process.cwd())};

export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode);
  // console.log(env)
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return {
    main: {
      envDir,
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      publicDir,
      envDir,
      // envPrefix: "RENDERER_",
      resolve: {
        alias: {
          '@renderer': resolve(join(__dirname, 'src/renderer/src')),
          '@store' : resolve(join(__dirname, 'src/renderer/src/store')),
          '@views' : resolve(join(__dirname, 'src/renderer/src/views'))
        }
      },
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ]
    },
}})


