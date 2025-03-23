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