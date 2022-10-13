import webpack from 'webpack';
import envVars from './yourFirebaseConfig';

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
      }
    ]
  },
  serverMiddleware: [
    //{ path: '/', handler: '~/s.js' }
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/normalize.css", "@/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/firebase"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: ["@/assets/scss/main.scss"]
  },
  env: envVars,
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    transpile: [
      "gsap"
    ],
    extend(config, ctx) {

    }
  }
};
