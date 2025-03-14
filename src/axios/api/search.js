import apiClient from "../axios";

////search
export function getHotCultureApi() {
  // 非遗热点
  return apiClient.get("/postnews/hot");
}
////result
//comprehensive
export function getBaiKeApi(input) {
  // 非遗百科id
  return apiClient.get("/search/encyclopedias", { params: { keyword: input } });
}

export function getNewPostApi(input) {
  // 相关帖子-最新
  return apiClient.get("/search/posts/time", { params: { keyword: input } });
}

export function getHotPostApi(input) {
  // 相关帖子-热度
  return apiClient.get("/search/posts/hot", { params: { keyword: input } });
}

//info
export function getInfoApi(input) {
  // 资讯
  return apiClient.get("/search/news/Time", { params: { keyword: input } });
}

//user
export function getUserApi(keyword, userType) {
  return apiClient.put("/search/user", { keyword, userType });
}

//activity
// export function getActivitiesApi(keyword,firstType,secondType,city,startTime,endTime) {
//   return apiClient.put("/search/activities", {keyword,firstType,secondType,city,startTime,endTime});
// }

export function getActivitiesApi(params) {
  return apiClient.put("/search/activities", params);
}