import apiClient from "../axios";

// 运营账单
export function getBillApi() {
    return apiClient.get("/admin/adminIncomeStament");
}

export function getSelfBillApi() {
    return apiClient.get("/personal/income/bills");
}