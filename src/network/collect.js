import { request } from "./request";

// 添加商品到收藏夹
export function addCollection(user_id, goods_name, spu_id) {
  return request({
    url: "user/addCollection",
    method: "post",
    data: {
      user_id,
      goods_name,
      spu_id,
    },
  });
}

// 展示收藏商品列表
export function showCollection(user_id) {
  return request({
    url: "user/showCollection",
    method: "post",
    data: {
      user_id,
    },
  });
}

// 删除收藏夹
export function deleteCollection(collection_id) {
  return request({
    url: "user/deleteCollection",
    method: "post",
    data: {
      collection_id,
    },
  });
}

// 查看商品是否收藏
export function findGoodCollect(user_id, spu_id) {
  return request({
    url: "/user/getCollectionByUserIdAndSpuId",
    method: "post",
    data: {
      user_id,
      spu_id,
    },
  });
}

// 从收藏夹中删除商品
export function deleteCollectionGood(user_id, spu_id) {
  return request({
    url: "/user/deleteCollectionByUserId",
    method: "post",
    data: {
      user_id,
      spu_id,
    },
  });
}
