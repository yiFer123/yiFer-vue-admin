import type { RouteRecordRaw } from 'vue-router'

// 类型
interface IBreadcrumbs {
  name: string
  path: string
}

/**
 * 加载本地路由
 */
function loadLocalRoutes() {
  // 创建本地路由对象
  const localRoutes: RouteRecordRaw[] = []
  // 通过vite的方式读取路由文件
  const files: Record<string, any> = import.meta.glob('@/routers/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

// 全局状态下的第一个菜单信息
export let firstMenu: any = null

/**
 * 将菜单栏映射成对应路由
 */
export default function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()

  // 根据菜单匹配正确路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    if (!menu.children.length) {
      const route = localRoutes.find((item) => item.path === menu.url)
      if (route) {
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = menu
    }
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给顶层一级菜单添加重定向路由，但是只需要添加一次即可
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    if (!menu.children.length && menu.url === path) return menu
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * 通过路由映射对应面包屑
 * @param menus 菜单信息
 * @param path 路由地址
 * @returns 面包屑item
 */
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  // 1.两层遍历
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 根据菜单数组映射成id列表
 * @param menuList 菜单数组
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  // 递归获取id
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}
