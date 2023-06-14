import type { App } from 'vue'

import auth from './modules/auth'
import slideIn from './modules/slideIn'

const directivesList: any = {
  auth,
  slideIn
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
