import apiClient from "../axios";

export function getPictureApi() {
  // 发现-轮播图
  return apiClient.get("/postnews/pictures");
}

export function getLocationPostApi() {
  // 附近-帖子
  return apiClient.get("/postnews/locationBased");
}

export function getLocationActivityApi() {
    // 附近的活动
    return apiClient.get("/activities/LocationBased");
  }

export function getFollowPostApi() {
  // 关注-帖子
  return apiClient.get("/postnews/following/feeds");
}

export function postHeritageApi(type, secondType) {
  //获取非遗分类
  return apiClient.post("/culturalHeritage", { type, secondType });
}

export function getFromAdcodeApi(adcode) {
  // adcode查询非遗项目
  return apiClient.get(`/culturalHeritage/${adcode}`);
}

export function getArtistApi(param) {
  // 非遗传承人
  return apiClient.get("/artist", { params: { param } });
}
