import apiClient from "../axios";

export function getUserApi(id) {
  //获取用户信息
  return apiClient.get("/other/me", { params: { id } });
}

export function getMyGoodsApi() {
  //获取自己的产品信息
  return apiClient.get("/personal/products");
}

export function getOtherGoodsApi(id) {
  //获取他人的产品信息
  return apiClient.get("/other/products", { params: { id } });
}

export function postGoodsApi(name, link, description, mediaList) {
  // 发布非遗商品
  return apiClient.post("/products",{ name, link, description, mediaList },
  );
}

export function postUrlApi(image) {
  // 获取图片url
  return apiClient.post("//upload",{ image },
  );
}

export function downGoodsApi(id) {
  // 下架非遗商品
  return apiClient.delete(`/products/${id}`);
}

export function putLookApi(id) {
  // 增加浏览量
  return apiClient.put(`/products/look/${id}`);
}

export function getIdGoodsApi(id) {
  //根据id获取对应商品信息
  return apiClient.get(`/products/${id}`);
}