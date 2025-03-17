<template>
    <div class="container">
        <el-icon class="back-btn" @click="router.back()">
            <ArrowLeftBold />
        </el-icon>
        <div class="avatar">
            <el-avatar :size="46" :src="user?.avatarUrl"></el-avatar>
            <div class="nickname">{{ user?.nickName }}</div>
        </div>
        <el-button v-if="isSelf" class="manage-btn" @click="isManage = !isManage">
            <span v-show="isManage">确定</span>
            <span v-show="!isManage">管理商品</span>
        </el-button>
        <el-dialog v-model="dialogAddGoods" fullscreen draggable custom-class="dialog-addGoods" title="发布商品"
            :before-close="handleCloseAddGoods">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                label-width="auto" class="goods-form">
                <el-form-item label="" prop="img">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="fileList"
                        :on-change="handleChange" class="upload" :limit="3" :on-exceed="exceed">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <template #file="{ file }">
                            <div class="upload-img">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item class="small-form" label="" prop="name">
                    <el-input class="small-input" v-model="ruleForm.name" placeholder="此处填写商品名称(必填)"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item class="small-form" label="" prop="link">
                    <el-input class="small-input" v-model="ruleForm.link" placeholder="在此输入商品链接(必填)"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item class="big-form" label="" prop="describe">
                    <el-input class="big-input" v-model="ruleForm.describe" type="textarea" :rows="rows"
                        placeholder="商品描述" autocomplete="off" />
                    <svg class="big-svg" width="141" height="142" viewBox="0 0 141 142" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M70.6928 133.125H52.2003C49.171 133.125 46.4584 131.433 45.109 128.702C38.7337 115.819 23.7387 85.3111 22.0037 80.1664C20.7369 76.4084 19.8557 69.6273 21.2189 61.9033C22.0037 57.4658 23.4495 53.1947 25.515 49.201C27.9384 44.5139 31.2431 40.215 35.3189 36.4154C41.763 30.4109 43.0023 26.4865 42.9059 24.2539C42.837 22.7146 42.1072 21.3695 40.7165 20.2879C40.2208 19.8996 39.6012 19.6223 38.8852 19.4697C36.2552 18.8873 34.4101 16.7379 34.4101 14.2418C34.4101 11.2742 37.0401 8.86133 40.2621 8.86133H100.848C104.07 8.86133 106.7 11.2742 106.7 14.2418C106.7 17.2094 104.07 19.6223 100.848 19.6223C99.5124 19.6223 98.4384 18.5406 98.4384 17.1955C98.4384 15.8504 99.5124 14.7687 100.848 14.7687C101.495 14.7687 101.881 14.4082 101.881 14.2418C101.881 14.0754 101.481 13.7287 100.848 13.7287H40.2621C39.615 13.7287 39.2294 14.0893 39.2294 14.2557C39.2294 14.3666 39.4635 14.6439 39.9179 14.741C41.3499 15.06 42.6167 15.6424 43.6907 16.4744C45.4532 17.8611 47.5738 20.2879 47.739 24.0736C47.9318 28.8023 44.8612 34.1551 38.6098 39.9932C31.7801 46.3582 27.5391 54.0268 25.9831 62.7631C24.3996 71.749 26.3549 77.9338 26.5752 78.6133C27.9246 82.5793 39.2707 105.973 49.4326 126.552C49.9559 127.62 51.0161 128.286 52.2003 128.286H70.6928C72.0284 128.286 73.1025 129.367 73.1025 130.712C73.1025 132.057 72.0147 133.125 70.6928 133.125Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M88.8961 133.125H70.4174C69.0817 133.125 68.0077 132.043 68.0077 130.698C68.0077 129.353 69.0817 128.271 70.4174 128.271H88.9098C90.094 128.271 91.1543 127.606 91.6775 126.538C101.853 105.973 113.199 82.5791 114.535 78.5992C114.769 77.9197 116.724 71.7488 115.127 62.749C113.585 53.9988 109.33 46.3441 102.5 39.9791C96.2352 34.141 93.1646 28.7883 93.3712 24.0596C93.4538 21.9795 94.2249 18.9703 97.4194 16.4604C98.4797 15.6283 99.7465 15.032 101.192 14.727C101.647 14.6299 101.881 14.3525 101.881 14.2416C101.881 14.0891 101.495 13.7146 100.848 13.7146H40.2621C38.9264 13.7146 37.8524 12.633 37.8524 11.2879C37.8524 9.94277 38.9264 8.875 40.2621 8.875H100.848C104.07 8.875 106.7 11.2879 106.7 14.2555C106.7 16.7516 104.855 18.901 102.225 19.4834C101.495 19.6498 100.876 19.9133 100.394 20.3016C99.0029 21.3971 98.2594 22.7283 98.2043 24.2676C98.1079 26.5002 99.3471 30.4107 105.791 36.4291C109.867 40.2287 113.158 44.5275 115.595 49.2146C117.661 53.1945 119.106 57.4656 119.891 61.917C121.254 69.641 120.387 76.4221 119.106 80.1801C117.371 85.3248 102.363 115.833 96.0011 128.715C94.638 131.433 91.9254 133.125 88.8961 133.125Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M94.101 124.666H45.4945C44.1589 124.666 43.0848 123.584 43.0848 122.239C43.0848 120.894 44.1589 119.813 45.4945 119.813H94.101C95.4366 119.813 96.5106 120.894 96.5106 122.239C96.5106 123.584 95.4228 124.666 94.101 124.666ZM115.031 81.9551H25.6664C24.3307 81.9551 23.2567 80.8735 23.2567 79.5283C23.2567 78.1832 24.3307 77.1016 25.6664 77.1016H115.031C116.366 77.1016 117.44 78.1832 117.44 79.5283C117.44 80.8735 116.353 81.9551 115.031 81.9551ZM112.414 52.002C112.401 52.002 112.401 52.002 112.414 52.002C112.194 52.002 91.3333 51.891 70.7065 51.7801C58.5893 51.7108 48.9231 51.6414 41.9833 51.5998C37.8524 51.5721 34.6579 51.5444 32.4685 51.5166C28.2964 51.475 28.2964 51.475 27.7456 51.1977C26.5614 50.6014 26.0795 49.1453 26.6716 47.9389C27.1397 47.0098 28.1036 46.5106 29.0812 46.6076C31.9315 46.7186 90.094 47.0375 112.428 47.1485C113.764 47.1485 114.838 48.244 114.824 49.5891C114.81 50.9203 113.736 52.002 112.414 52.002ZM49.2123 73.4961H23.7386C22.403 73.4961 21.329 72.4145 21.329 71.0694C21.329 69.7242 22.403 68.6426 23.7386 68.6426H46.8026V64.2744C46.8026 62.9293 47.8766 61.8477 49.2123 61.8477C50.5479 61.8477 51.6219 62.9293 51.6219 64.2744V71.0694C51.6219 72.4145 50.5342 73.4961 49.2123 73.4961ZM83.223 73.4961H57.7494C56.4137 73.4961 55.3397 72.4145 55.3397 71.0694V64.0664C55.3397 62.7213 56.4137 61.6397 57.7494 61.6397C59.085 61.6397 60.1591 62.7213 60.1591 64.0664V68.6426H80.8134V64.2744C80.8134 62.9293 81.8874 61.8477 83.223 61.8477C84.5587 61.8477 85.6327 62.9293 85.6327 64.2744V71.0694C85.6327 72.4145 84.5449 73.4961 83.223 73.4961Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M74.8236 66.8408C73.488 66.8408 72.4139 65.7592 72.4139 64.4141V57.4111C72.4139 56.066 73.488 54.9844 74.8236 54.9844H100.297C101.633 54.9844 102.707 56.066 102.707 57.4111V64.2061C102.707 65.5512 101.633 66.6328 100.297 66.6328C98.9616 66.6328 97.8876 65.5512 97.8876 64.2061V59.8379H77.2333V64.4141C77.2333 65.7592 76.1455 66.8408 74.8236 66.8408ZM40.5375 66.8408C39.2018 66.8408 38.1278 65.7592 38.1278 64.4141V57.4111C38.1278 56.066 39.2018 54.9844 40.5375 54.9844H66.0111C67.3468 54.9844 68.4208 56.066 68.4208 57.4111V64.2061C68.4208 65.5512 67.3468 66.6328 66.0111 66.6328C64.6755 66.6328 63.6014 65.5512 63.6014 64.2061V59.8379H42.9471V64.4141C42.9471 65.7592 41.8594 66.8408 40.5375 66.8408ZM31.725 66.6328C30.3893 66.6328 29.3153 65.5512 29.3153 64.2061V59.8379H26.286C24.9504 59.8379 23.8763 58.7562 23.8763 57.4111C23.8763 56.066 24.9504 54.9844 26.286 54.9844H31.725C33.0606 54.9844 34.1346 56.066 34.1346 57.4111V64.2061C34.1346 65.5512 33.0469 66.6328 31.725 66.6328ZM108.352 66.6328C107.017 66.6328 105.943 65.5512 105.943 64.2061V57.4111C105.943 56.066 107.017 54.9844 108.352 54.9844H113.791C115.127 54.9844 116.201 56.066 116.201 57.4111C116.201 58.7562 115.127 59.8379 113.791 59.8379H110.762V64.2061C110.762 65.5512 109.674 66.6328 108.352 66.6328Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                        <path
                            d="M116.821 73.4971H91.347C90.0114 73.4971 88.9374 72.4154 88.9374 71.0703V64.0674C88.9374 62.7223 90.0114 61.6406 91.347 61.6406C92.6827 61.6406 93.7567 62.7223 93.7567 64.0674V68.6436H116.821C118.156 68.6436 119.23 69.7252 119.23 71.0703C119.23 72.4154 118.143 73.4971 116.821 73.4971Z"
                            fill="#D0D0D0" fill-opacity="0.48" />
                    </svg>
                </el-form-item>
                <el-form-item class="submit-btn-box">
                    <el-button class="form-submit-btn" type="primary" @click="submitForm(ruleFormRef)">
                        发布
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="goods">
            <div v-if="isSelf" class="addNewGoods" @click="dialogAddGoods = true">
                <el-icon color="rgba(152, 123, 91, 1)" size="27">
                    <Plus />
                </el-icon>
                <div>上新商品</div>
            </div>
            <div class="goods-container" v-for="(data, index) in goodsData" :key="index">
                <div class="img-box">
                    <el-image class="img" :src="data.mediaList[0].url" :preview-src-list="[data.mediaList[0].url]"
                        fit="cover" />
                    <svg class="down-svg" v-if="isManage && data.stock" @click="handleDownGoods(index)" width="67"
                        height="23" viewBox="0 0 67 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.57377 0H67V23H0L4.57377 0Z" fill="#B35C5C" />
                        <path
                            d="M8.33008 6.24365H20.6699V7.28467H14.5V10.0522L15.084 9.23975C17.0221 10.3823 18.6471 11.4106 19.959 12.3247L19.21 13.353C17.8981 12.3459 16.3281 11.2837 14.5 10.1665V17.6187H13.3447V7.28467H8.33008V6.24365ZM33.8223 16.1841C33.5091 16.5311 33.2467 16.8527 33.0352 17.1489C30.9277 16.4295 29.2435 15.306 27.9824 13.7783V17.7456H27.0176V13.7593C25.5957 15.3081 23.8945 16.4888 21.9141 17.3013C21.7194 17.0474 21.474 16.7596 21.1777 16.438C23.1032 15.7821 24.8086 14.8172 26.2939 13.5435H21.4062V12.6548H27.0176V11.2329H27.9824V12.6548H33.6572V13.5435H28.6616C30.0285 14.868 31.7487 15.7482 33.8223 16.1841ZM28.2871 6.25635H32.9082V11.2583H31.9688V10.6108H29.2266V11.2964H28.2871V6.25635ZM21.5713 6.59912H23.3994C23.4248 6.15902 23.4375 5.67236 23.4375 5.13916H24.377C24.377 5.66813 24.3664 6.15479 24.3452 6.59912H27.1953C27.153 7.76709 27.1064 8.71077 27.0557 9.43018C27.0049 10.2004 26.8568 10.7166 26.6113 10.979C26.3913 11.2414 25.9681 11.3726 25.3418 11.3726C25.0879 11.3726 24.7578 11.3683 24.3516 11.3599C24.2923 11.0213 24.2204 10.7039 24.1357 10.4077C24.6351 10.4585 25.0202 10.4839 25.291 10.4839C25.7819 10.4839 26.0485 10.2173 26.0908 9.68408C26.1585 8.84619 26.2051 8.10563 26.2305 7.4624H24.2817C24.2098 9.23975 23.4163 10.7505 21.9014 11.9946C21.7067 11.7661 21.4613 11.5334 21.165 11.2964C22.4769 10.3146 23.1963 9.03662 23.3232 7.4624H21.5713V6.59912ZM31.9688 7.11963H29.2266V9.74756H31.9688V7.11963ZM35.2188 9.27783H38.3037C38.0117 8.85042 37.6943 8.42725 37.3516 8.0083L38.126 7.48779C38.5322 7.96175 38.9004 8.40186 39.2305 8.80811L38.5449 9.27783H41.4268C41.8542 8.7277 42.2477 8.14795 42.6074 7.53857L43.5723 8.09717C43.1702 8.57536 42.8317 8.96891 42.5566 9.27783H45.7178V15.9302C45.7178 16.9966 45.2311 17.534 44.2578 17.5425C43.7331 17.5509 43.1406 17.5467 42.4805 17.5298C42.4128 17.0389 42.3493 16.6834 42.29 16.4634C42.9587 16.5311 43.5088 16.5649 43.9404 16.5649C44.4906 16.5649 44.7656 16.2603 44.7656 15.6509V10.1538H36.1709V17.6948H35.2188V9.27783ZM37.9609 16.438V12.3501H43.0518V15.7651H38.875V16.438H37.9609ZM34.292 6.56104H40.0874C39.9266 6.26058 39.7298 5.92627 39.4971 5.55811L40.4746 5.11377C40.7285 5.54964 40.9951 6.03206 41.2744 6.56104H46.7461V7.4624H34.292V6.56104ZM42.1377 14.9526V13.1626H38.875V14.9526H42.1377ZM38.9385 10.2935L39.624 10.9536C38.6338 11.8 37.707 12.5448 36.8438 13.188C36.5898 12.841 36.391 12.5913 36.2471 12.439C37.1781 11.8211 38.0752 11.106 38.9385 10.2935ZM41.1729 10.9917L41.7314 10.2935C42.984 11.0806 43.932 11.7111 44.5752 12.1851L43.9404 12.9849C43.1025 12.3078 42.18 11.6434 41.1729 10.9917ZM49.1201 5.74854H57.8799V10.7759H56.8643V10.3696H50.1357V10.7759H49.1201V5.74854ZM54.2871 11.8169H59.1367V17.6821H58.1719V16.8188H55.252V17.6821H54.2871V11.8169ZM47.876 11.8169H52.7129V17.6821H51.748V16.8315H48.8408V17.6821H47.876V11.8169ZM56.8643 6.63721H50.1357V9.48096H56.8643V6.63721ZM58.1719 12.7056H55.252V15.9937H58.1719V12.7056ZM51.748 12.7056H48.8408V15.9683H51.748V12.7056Z"
                            fill="white" />
                    </svg>
                </div>
                <div class="content">
                    <div class="header">
                        <div class="title" :class="{ 'title-down': !data.stock }">{{ data.name }}</div>
                        <div class="views">{{ data.views }}人看过</div>
                    </div>
                    <div class="description">{{ data.description }}</div>
                    <div class="bottom">
                        <div class="link" :class="{ 'link-down': !data.stock }">
                            <span v-if="data.stock">点击跳转链接购买</span>
                            <span v-else>该商品已下架</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';
import * as User from '@/axios/api/user'
import * as shop from '@/axios/api/workShop'

const { userId } = defineProps<{
    userId?: string
}>()

const isSelf = computed(() => User.isSelf(userId))

const user = ref();

const dialogAddGoods = ref(false);

const goodsData = ref([]);

const isManage = ref(false); // 管理商品

function handleCloseAddGoods() { // 关闭添加商品弹窗
    if (ruleForm.describe === '' && ruleForm.link === '' && ruleForm.name === '' && fileList.value.length === 0) {
        dialogAddGoods.value = false;
        return;
    }
    ElMessageBox.confirm(
        '<span style="color: rgba(0, 0, 0, 0.5); font-size: 18px">退出后已填写信息不会保留</span>',
        '已填写部分信息，确认要退出吗？',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            showClose: false,
            customClass: 'confirm-cancel-addGoods'
        }
    ).then(() => {
        dialogAddGoods.value = false;
        ruleFormRef?.value.resetFields();
        fileList.value = [];
    }).catch(() => {
        return;
    })

}

function handleDownGoods(index) { // 下架商品
    ElMessageBox.confirm(
        '确认下架该商品？',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
    ).then(() => {
        goodsData.value[index].stock = false;
        let element = goodsData.value[index];
        goodsData.value.splice(index, 1);
        goodsData.value.push(element);
        shop.downGoodsApi(element.id).then(res => {
            ElMessage.success('商品下架成功');
        }).catch(() => {
            ElMessage.error('商品下架失败');
            return;
        })
    }).catch(() => {
        return;
    })
}

onMounted(() => {
    shop.getUserApi(userId).then(res => { //获取用户头像名字
        user.value = res.data.data
    })
    if (isSelf.value) {
        shop.getMyGoodsApi().then(res => {
            goodsData.value = res.data.data;
            console.log(res.data.data);
        })
    } else {
        shop.getOtherGoodsApi(userId).then(res => {
            goodsData.value = res.data.data
        })
    }
})

//uploader
const fileList = ref([]);
const handleChange = (file) => {
    const url = URL.createObjectURL(file.raw);
    file.url = url; // 更新文件的预览 URL
    ruleForm.img.push(url);
};
function exceed() {
    ElMessage.warning('最多上传3张图片');
}

//form
const ruleFormRef = ref<FormInstance>();
const rows = window.innerHeight / 55;
const nameRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写商品名称'))
    } else callback();
}

const linkRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写商品链接'))
    } else callback();
}

const imgRule = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
        callback(new Error('请上传商品图片'))
    } else callback();
}

const ruleForm = reactive({
    img: [],
    name: '',
    link: '',
    describe: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: nameRule, trigger: 'blur' }],
    link: [{ validator: linkRule, trigger: 'blur' }],
    img: [{ validator: imgRule, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => { // 发布商品
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm(
                '<span style="color: rgba(0, 0, 0, 0.5); font-size: 20px">发布商品后不可修改</span>',
                '确认发布商品？',
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    showClose: false,
                    customClass: 'confirm-addGoods'
                }
            ).then(() => {
                // shop.postGoodsApi(ruleForm.name, ruleForm.link, ruleForm.describe, [{ url: ruleForm.img }]).then(res => {
                //     ElMessage.success('商品发布成功')
                //     dialogAddGoods.value = false;
                // })
                console.log(ruleForm.img);
            }).catch(() => {
                return;
            })

        }
    })
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: 100vh;
    padding: 0 20px;
    background-image: url('/icon/workShop.jpg');
    background-size: 100% auto;
    background-attachment: fixed;
    background-position: center top;
}

.back-btn {
    margin: 15px 0 15px 0;
}

.avatar {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nickname {
    font-size: 20px;
}

.manage-btn {
    width: 70px;
    height: 27px;
    position: absolute;
    margin-right: 20px;
    font-size: 14px;
    color: #000;
    padding: 1px 5px;
    border-radius: 7px;
    border-color: rgba(152, 123, 91, 1);
    background-color: transparent;
    right: 0;
}

/*dialog*/
.dialog-addGoods {
    padding: 0 20px;
}

:deep(.el-dialog__header.show-close) {
    padding: 0;
    text-align: center;
}

:deep(.el-dialog__headerbtn) {
    width: 25px;
    height: 25px;
    left: 0;
    font-size: 25px;
    margin: 15px 0 0 15px;
}

:deep(.el-dialog__title) {
    font-size: 20px;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
    color: #000;
}

.goods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 70px;
}

.addNewGoods {
    width: 150px;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: rgba(152, 123, 91, 1);
    border: dashed 2px rgba(177, 151, 128, 1);
}

/*uploader*/
.upload {
    margin-top: 1vh;
}

:deep(.el-upload--picture-card),
:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 120px;
    height: 120px;
    border: solid 1px rgba(177, 151, 128, 1);
    background-color: rgb(255, 255, 255);
}

.upload-img .el-upload-list__item-thumbnail {
    object-fit: cover;
}

.el-icon.uploader-icon {
    font-size: 28px;
    color: rgba(177, 151, 128, 1);
    text-align: center;
}

.upload .el-icon svg {
    color: rgba(177, 151, 128, 1);
}

/*form*/
.goods-form {
    margin-top: 20px;
}

:deep(.small-input .el-input__wrapper) {
    box-shadow: none;
    border-bottom: solid 1px rgba(177, 151, 128, 0.5);
    border-radius: 0;
}

.small-form {
    margin-bottom: 15px;
}

.big-form {
    margin-top: 30px;
    position: relative;
}

:deep(.big-input .el-textarea__inner) {
    background-color: rgba(230, 230, 230, 0.61);
    z-index: 2;
}

.big-svg {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 141px;
    height: 142px;
}

.submit-btn-box {
    margin: 0;
}

:deep(.submit-btn-box .el-form-item__content) {
    justify-content: flex-end;
}

.form-submit-btn {
    width: 103px;
    height: 45px;
    font-size: 24px;
}

/*goods*/
.goods-container {
    width: 150px;
    height: 190px;
    border: solid 1px rgba(177, 151, 128, 1);
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.img-box {
    position: relative;
}

.img {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.down-svg {
    position: absolute;
    top: 0;
    right: 0;
}

.content {
    padding: 0 10px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(152, 123, 91, 1);
}

.title-down {
    color: rgba(151, 151, 151, 1);
    text-decoration: line-through;
}

.views {
    font-size: 11px;
    white-space: nowrap;
    color: rgba(151, 151, 151, 1);
}

.description {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(151, 151, 151, 1);
    margin-bottom: 10px;
}

.bottom {
    text-align: center;
}

.link {
    font-size: 13px;
    color: #fff;
    padding: 5px 5px;
    border-radius: 7px;
    background-color: rgba(201, 136, 78, 0.6);
}

.link-down {
    background-color: rgba(151, 151, 151, 1);
}
</style>