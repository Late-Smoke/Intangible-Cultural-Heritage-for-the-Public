import { AxiosResponse } from "axios";
import { promiseSuccess } from "@/utils";
import { Response } from "@/axios/api/common";
import { ElMessage, ElMessageBox } from "element-plus";
import * as Self from '@/axios/api/self'


export function changeNickname(oldName: string, reloadAction: () => void) {
    ElMessageBox.prompt('输入新昵称', '修改昵称', {
        inputValue: oldName,
        inputPattern: /.+/,
        inputErrorMessage: '昵称不能为空',
    }).then(({ value }) => {
        promiseSuccess(Self.updateProfile({ nickName: value })).then(() => {
            ElMessage.success('修改成功')
            reloadAction()
        }).catch((r: AxiosResponse<Response<any>>) => {
            ElMessage.error(r?.data?.errorMsg || r as unknown)
        })
    }).catch(() => { })
}
