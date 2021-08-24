// import router from './router'
// import store from './store'
// // import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth'
// import axios from 'axios'; // get token from cookie
// // import getPageTitle from '@/utils/get-page-title'
//
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
//
// // const whiteList = ['/login'] // no redirect whitelist
//
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//   const hasToken = getToken()
//   if (hasToken) {
//     if (to.path === '/') {
//       // if is logged in, redirect to the home page
//       next('/main')
//       NProgress.done()
//     } else {
//       next('/main')
//       NProgress.done()
//     }
//     // axios.get('http://127.0.0.1:8080/api/v1/test'
//     // ).then((response) => {
//     //   console.log(response)
//     //   NProgress.done()
//     //   if (to.path === '/') {
//     //     // if is logged in, redirect to the home page
//     //     next({ path: '/main' })
//     //     NProgress.done()
//     //   } else {
//     //     next({ path: '/main' })
//     //     NProgress.done()
//     //   }
//     // }).catch((error) => {
//     //   console.log(error)
//     //   if (to.path === '/') {
//     //     next()
//     //     NProgress.done()
//     //   } else {
//     //     next('/')
//     //     NProgress.done()
//     //   }
//     // })
//   } else {
//     if (to.path === '/') {
//       // if is logged in, redirect to the home page
//       next({ path: '/main' })
//       NProgress.done()
//     } else {
//       next()
//       NProgress.done()
//     }
//     axios.get('http://127.0.0.1:8080/api/v1/test'
//     ).then((response) => {
//       console.log(response)
//       NProgress.done()
//       if (to.path === '/') {
//         // if is logged in, redirect to the home page
//         next({ path: '/main' })
//         NProgress.done()
//       } else {
//         const hasGetUserInfo = store.getters.name
//         if (hasGetUserInfo) {
//           next()
//         } else {
//           // try {
//           //   // get user info
//           //   // await store.dispatch('user/getInfo')
//           //   next()
//           // } catch (error) {
//           //   remove token and go to login page to re-login
//           //   await store.dispatch('user/resetToken')
//           //   Message.error(error || 'Has Error')
//           //   next(`/login?redirect=${to.path}`)
//           // }
//           NProgress.done()
//         }
//       }
//     }).catch((error) => {
//       console.log(error)
//       if (to.path === '/') {
//         next()
//         NProgress.done()
//       } else {
//         next('/')
//         NProgress.done()
//       }
//     })
//   }
//
//   router.afterEach(() => {
//     // finish progress bar
//     NProgress.done()
//   })
// })

