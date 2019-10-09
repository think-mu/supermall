import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  console.log(3)

  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}