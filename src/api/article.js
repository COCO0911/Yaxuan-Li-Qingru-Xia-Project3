import http from './index.js'
/* post article */
export const Add = data => {
    return http({
        url: '/index/addarticle',
        method: 'post',
        data: data
    })
}
/* article info */
export const findArticle = data => {
    return http({
        url: '/index/findArticle',
        method: 'post',
        data: data
    })
}

/* article list */
export const articleList = data => {
    return http({
        url: '/index/articleList',
        method: 'get'
    })
}

export const articleUserData = data => {
    return http({
        url: '/index/articleUserData',
        method: 'post',
        data: data
    })
}

/* delete article */
export const articleDelete = data => {
    return http({
        url: '/index/articleDelete',
        method: 'delete',
        data: data
    })
}


/* edit */
export const articleChange = data => {
    return http({
        url: '/index/articleChange',
        method: 'put',
        data: data
    })
}