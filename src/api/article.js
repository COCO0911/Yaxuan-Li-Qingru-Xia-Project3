/* 文章接口 */
import http from './index.js'
/* 文章发表 */
export const Add = data => {
    return http({
        url: '/index/addarticle',
        method: 'post',
        data: data
    })
}
/* 指定文章信息详情 */
export const findArticle = data => {
    return http({
        url: '/index/findArticle',
        method: 'post',
        data: data
    })
}

/* 文章列表 */
export const articleList = data => {
    return http({
        url: '/index/articleList',
        method: 'get'
    })
}

/* 指定用户的文章和个人信息 */
export const articleUserData = data => {
    return http({
        url: '/index/articleUserData',
        method: 'post',
        data: data
    })
}

/* 删除文章信息 */
export const articleDelete = data => {
    return http({
        url: '/index/articleDelete',
        method: 'delete',
        data: data
    })
}


/* 修改文章信息 */
export const articleChange = data => {
    return http({
        url: '/index/articleChange',
        method: 'put',
        data: data
    })
}