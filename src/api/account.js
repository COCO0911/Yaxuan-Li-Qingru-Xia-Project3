import http from './index.js'
/* login */
export const UserLogin = data => {
  return http({
    url: '/account/login',
    method: 'post',
    data
  })
}
/* register */
export const UserRegister = data => {
  return http({
    url: '/account/register',
    method: 'post',
    data
  })
}
/* get current user's information*/
export const UserState = () => {
  return http({
    url: '/account/userstate',
    method: 'get',
  })
}
/* change user */

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

/* get all user's information */
export const Find = () => {
  return http({
    url: `/users/find`,
    method: 'get'
  })
}
