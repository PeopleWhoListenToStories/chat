import Cookie from 'js-cookie';

export const getCookie = (key: string) => {
  return Cookie.get(key)
}

export const setCookie = (key: string, value: string) => {
  return Cookie.set(key, value, { expires: new Date(Date.now() * 1 + 60 * 60 * 1000) })
}

export const removeCookie = (key: string) => {
  return Cookie.remove(key)
}