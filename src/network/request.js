import axios from 'axios'
import store from 'store'
import router from '../router'

export function request(config) {
  const instance = axios.create({
    baseURL: '/apis',
    // timeout: 5000,
  })

  instance.interceptors.request.use(config => {
    // console.log(config)
    if(store.state.token) {
      config.headers.common['Authorization'] = store.state.token
      // xmlhttp.setRequestHeader("Content-Type","application/json");
    }
    // if (config.method === 'post') {
    //   config.headers.common['Content-Type'] = 'application/json;charset=utf-8';
    // }

    return config
  }, err => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    // console.log('response',response);
    if (response.data.code == 200 && response.data.result.code == "003002") {
      store.commit('DELETE_TOKEN')
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return response
  }, err => {
    if (err.response) {
      switch (err.response.status) {
        case 401: 
        store.commit('DELETE_TOKEN')
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
    }
  })

  return instance(config);
}