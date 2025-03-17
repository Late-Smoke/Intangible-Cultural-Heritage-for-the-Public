import { file2dataURL, promiseSuccess } from "@/utils"
import apiClient from "../axios"
import { Response } from "./common"
import { reactive } from "vue"

export interface IUploadController {
    files: IUploadItem[]
    addFile: (type?: string) => void
    removeFile: (index: number) => void
    retryUpload: (index: number) => void
    uploadFile: (file: IUploadItem) => void
}

export interface IUploadItem {
    file: File
    dataUrl: string
    status?: 'uploading' | 'success' | 'failed'
    url?: string
}

export function createUploadController() {
    return reactive<IUploadController>({
        files: [],
        addFile(type) {
            selectFiles(type).then(async (fileList) => {
                for (const file of fileList) {
                    const item: IUploadItem = reactive({
                        file,
                        dataUrl: await file2dataURL(file)
                    })
                    this.files.push(item)
                    this.uploadFile(item)
                }
            })
        },
        removeFile(index) {
            this.files.splice(index, 1)
        },
        retryUpload(index) {
            const file = this.files[index]
            this.uploadFile(file)
        },
        uploadFile(file) {
            file.status = 'uploading'
            uploadFile(file.file).then(url => {
                file.url = url
                file.status = 'success'
            }).catch(() => file.status = 'failed')
        },
    })
}

export function selectFiles(type = '*', multiple = true): Promise<File[]> {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = multiple
        input.accept = type
        input.onchange = () => {
            if (input.files && input.files.length) {
                resolve(Array.from(input.files))
            } else {
                reject()
            }
        }
        input.click()
    })
}

export function selectAndUploadFiles(type: string | undefined, callback: (url: string) => any) {
    selectFiles(type).then(fileList => {
        for (const file of fileList) {
            uploadFile(file).then(callback)
        }
    })
}

export function selectFile(type?: string) {
    return selectFiles(type, false).then(fileList => fileList[0])
}

export function selectAndUploadFile(type?: string) {
    return selectFile(type).then(file => uploadFile(file))
}

export function uploadFile(file: File): Promise<string> {
    return promiseSuccess(apiClient.postForm<Response<string>>('/upload', { image: file })).then(r => r.data.data)
}
