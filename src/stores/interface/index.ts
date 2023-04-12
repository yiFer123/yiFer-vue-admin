/* LoginState */
export interface LoginState {
  token: string
  userInfo: any
  userMenus: any
}

/* ThemeState */
export interface ThemeState {
  language: string
  assemblySize: AssemblySizeType
}

export type AssemblySizeType = 'default' | 'small' | 'large'
