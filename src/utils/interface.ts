export interface IMenuItem {
  name: string,
  meta?: {
    icon: any,
    name: string,
    title?: string,
    show: boolean
  },
  children: Array<{
    path: string,
    component?: any,
    meta: {
      name: string,
      title?: string,
      show: boolean,
      view_id: string
    }
  }>
}

export interface IRouerItem {
  path: string,
  name?: string,
  redirect?: string,
  component?: any,
  children?: IRouerItem[],
  meta?: {
    title: string,
    show: boolean,
    component: any,
  }
}