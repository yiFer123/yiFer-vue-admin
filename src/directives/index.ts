import type { App } from 'vue'

import auth from './modules/auth'

const directivesList: any = {
  auth
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
