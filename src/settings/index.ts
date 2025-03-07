import { AxiosResponse } from "axios";
import { reactive } from "vue";
import { promiseSuccess } from "@/utils";
import { Response } from "@/axios/api/common";

export function createElementPlusSettingSwitch(name: string, toggleAction: () => Promise<AxiosResponse<Response<any>, any>>) {
    return reactive({
        name,
        value: false,
        loading: true,
        action() {
            return new Promise<boolean>((resolve, reject) => {
                this.loading = true
                promiseSuccess(toggleAction()).then(() => {
                    this.loading = false
                    resolve(true)
                }).catch(() => reject(false))
            })
        }
    })
}
