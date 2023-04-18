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

/* RoleState */
export interface RoleState {
  entireRoles: IRole[]
  entireDepartments: IDepartment[]
  entireMenus: any[]
}

interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}

interface IDepartment {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
}

export type AssemblySizeType = 'default' | 'small' | 'large'

/* SystemState */
export interface ISystemState {
  pageList: any[]
  pageTotalCount: number
}
