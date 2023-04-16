import http from './index.js'
/* 登录 */
export const UserLogin = data => {
  return http({
    url: '/account/login',
    method: 'post',
    data
  })
}
/* 注册 */
export const UserRegister = data => {
  return http({
    url: '/account/register',
    method: 'post',
    data
  })
}
/* 获得当前登录用户基本信息 */
export const UserState = () => {
  return http({
    url: '/account/userstate',
    method: 'get',
  })
}
/* 修改当前登录用户基本信息 */

export const ChangeUser = (data) => {
  return http({
    url: '/users/change',
    method: 'put',
    data
  })
}
/* 获得指定用户基本信息 */
export const FindUser = data => {
  return http({
    url: `/users/finduser`,
    method: 'get',
    params: data,
  })
}

/* 获得所有用户基本信息 */
export const Find = () => {
  return http({
    url: `/users/find`,
    method: 'get'
  })
}
