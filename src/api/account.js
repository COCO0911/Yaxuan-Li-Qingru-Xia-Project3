import http from './index.js';

export const UserLogin = data => {
  return http({
    url: '/account/login',
    method: 'post',
    data,
  });
};

export const UserRegister = data => {
  return http({
    url: '/account/register',
    method: 'post',
    data,
  });
};

export const UserState = () => {
  return http({
    url: '/account/userstate',
    method: 'get',
  });
};

export const ChangeUser = data => {
  return http({
    url: '/users/change',
    method: 'put',
    data,
  });
};

export const FindUser = data => {
  return http({
    url: `/users/finduser`,
    method: 'get',
    params: data,
  });
};

export const Find = () => {
  return http({
    url: `/users/find`,
    method: 'get',
  });
};
