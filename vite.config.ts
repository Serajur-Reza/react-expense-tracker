// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from "vite-plugin-pwa"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // plugins: [
//   //   VitePWA({
//   //     registerType: 'autoUpdate',
//   //     workbox: {
//   //       globPatterns: ['**/*.{js,css,html,ico,png,svg}']
//   //     }
//   //   })
//   // ]
// })

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto'
    })
  ]
})


// import { defineConfig } from 'vite'
// import { VitePWA } from 'vite-plugin-pwa'
// export default defineConfig({
//   plugins: [
//     VitePWA({
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
//       manifest: {
//         name: 'My Awesome App',
//         short_name: 'MyApp',
//         description: 'My Awesome App description',
//         theme_color: "#317EFB",
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ]
// })
