import { AxiosResponse } from "axios";
import { promiseSuccess } from "@/utils";
import { Response } from "@/axios/api/common";
import { ElMessage, ElMessageBox } from "element-plus";
import * as Self from '@/axios/api/self'
import { h, render } from "vue";
import ChangeAvatar from "@/components/settings/ChangeAvatar.vue";
import ChangePassword from "@/components/settings/ChangePassword.vue";


export function showChangeNickname(oldName?: string, reloadAction?: () => void) {
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

export function showChangeAvatar(oldAvatar?: string, reloadAction?: () => any) {
    const div = document.createElement('div')
    const vnode = h(ChangeAvatar, {
        oldAvatar,
        onClose: () => {
            render(null, div)
            div.remove()
            reloadAction()
        }
    })

    render(vnode, div)
    document.body.appendChild(div)
}

export function showChangePassword() {
    let submitAction: () => Promise<AxiosResponse<Response<any>, any>>

    ElMessageBox({
        title: '修改密码',
        message: h(ChangePassword, {
            onVnodeMounted: ({ el, component }) => {
                submitAction = component.exposed.submit
            }
        }),
        showCancelButton: true,

        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                submitAction().then(() => {
                    done()
                    ElMessage.success('修改成功')
                }).finally(() => instance.confirmButtonLoading = false)
            } else done()
        },
    })
}
