import apiClient from "../axios";

// 运营账单
export function getBillApi() {
    return apiClient.get("/admin/adminIncomeStament");
}

export function getSelfBillApi() {
    return apiClient.get("/personal/income/bills");
}

// 申诉
export function getAppealApi() {
    return apiClient.get("/admin/issueComplaints");
}

// 处理申诉
export function dealAppealApi(id, handlingContent) {
    return apiClient.post("/issueComplaints/deal", {
        id,handlingContent
    });  
}

//新增活动
export function addActivityApi(data) {
    return apiClient.post("/activities", data);
}

//删除活动
export function deleteActivityApi(id) {
    return apiClient.post(`/activities/${id}`); 
}