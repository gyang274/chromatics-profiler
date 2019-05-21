import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#7c4dff',
    secondary: '#ff6e40',
    accent: '#651fff',
    error: '#ff3d00',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107', 
  }
})
