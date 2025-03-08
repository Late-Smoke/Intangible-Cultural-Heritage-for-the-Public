<script setup>
import { ref, reactive } from 'vue';
import router from '@/router';
import { useTypeStore,usePositionStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { getCodeApi, codeLoginApi, passwordLoginApi } from '@/axios/api/login';
import apiClient from '@/axios/axios';

// 创建表单引用
const type = useTypeStore();// 真为验证码登录，假为密码登录
const positionStore = usePositionStore();
const changeType = (formEl) => {
    formEl.resetFields();
    type.changeType(!type.type);
};
const agreed = ref(false);// 同意协议
const formRef = ref(null);
const form = reactive({
    phone: '',
    password: '',
    code: ''
});

// 表单验证规则
const ifPhoneRight = ref(false);//手机号是否合法
const validatePhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error("手机号格式不正确！"));
    } else {
        ifPhoneRight.value = true;
        callback();
    }
};
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if (value.length < 6) {
        callback(new Error('密码长度至少为 6 位'));
    } else callback();
};
const validateCode = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入验证码'));
    } else {
        callback();
    }
};
const rules = reactive({
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    code: [{ validator: validateCode, trigger: 'blur' }],
})


const isCounting = ref(false);
const buttonText = ref('获取验证码');
const countdown = ref(60);
// 处理点击获取验证码按钮的事件
const handleGetCode = async () => {// 待修改
    if (isCounting.value || !ifPhoneRight.value) return;
    try {
        const response = await getCodeApi(form.phone);
        console.log('后端响应:', response);
        if (response.status === 200) {
            isCounting.value = true;//开始倒计时
            buttonText.value = `${countdown.value}s`;
            const timer = setInterval(() => {
                countdown.value--;
                buttonText.value = `${countdown.value}s`;
                if (countdown.value <= 0) {
                    clearInterval(timer);
                    isCounting.value = false;
                    buttonText.value = '获取验证码';
                    countdown.value = 60;
                }
            }, 1000);
        } else {
            console.error('网络繁忙:', response.data.errorMsg);
        }
    } catch (error) {
        // API 调用出错，给出相应提示
        console.error('api调用出错:', error);
    }
};

// 忘记密码函数
const handleForgetPassword = () => {
    type.changeType(false);
    router.push({ name: 'code' });
};

const submitForm = (formEl) => {
    if (!formEl) return;
    ifLogin.value = true;
    formEl.validate(async (valid) => {
        if (valid && agreed.value) {
            if (type.type) {// 验证码登录
                const response = await codeLoginApi(form.phone, form.code,positionStore.latitude,positionStore.longitude);
                console.log('验证码登录：', response.data);
                if (response.data.success === true) {
                    OnLoginSuccess(response.data.data)
                } else {
                    ElMessage.error('验证码错误！')
                }
            }
            else {
                //密码登录
                const response = await passwordLoginApi(form.phone, form.password,positionStore.latitude,positionStore.longitude);
                console.log('密码登录：', response.data);
                if (response.data.success === true) {
                    OnLoginSuccess(response.data.data)
                } else {
                    ElMessage({
                        dangerouslyUseHTMLString: true,
                        message: `<span style="font-size:20px;line-height: 1.5;">密码或账户不存在，请检查后重试。</span>`,
                        type: 'error',
                        grouping: true,
                        customClass: 'custom-message' // 添加自定义类名
                    });
                }
            }
        }
    });
};


function OnLoginSuccess(token) {
    localStorage.setItem('token', token)
    apiClient.defaults.headers.common['Authorization'] = token
    router.push({ name: 'mainPageView' });
}


// 三个协议点击（后期增加点击后效果）
const ifLogin = ref(false);
const handleUserAgreementClick = () => {
    console.log('用户协议点击');
};

const handlePrivacyPolicyClick = () => {
    console.log('隐私政策点击');
};

const handleChildProtectionClick = () => {
    console.log('儿童青少年个人信息保护规则点击');
};

</script>

<template>
    <div class="login">
        <div class="login-box">
            <div class="login-title">
                <span v-if="type.type">验证登录</span>
                <span v-else>密码登录</span>
            </div>
            <div class="login-input">
                <el-form label-position="left" label-width="auto" :model="form" :rules="rules" style="max-width: 600px;" ref="formRef" size="default">
                    <el-form-item label="手机号" label-position="left" prop="phone" class="item">
                        <div class="input-phone">
                            <el-input v-model="form.phone" />
                        </div>
                    </el-form-item>
                    <el-form-item v-if="type.type" label="验证码" label-position="left" prop="code">
                        <div class="container">
                            <div class="input-code">
                                <el-input v-model="form.code" />
                            </div>
                            <el-button round class="small-button" @click="handleGetCode" :disabled="isCounting">{{ buttonText }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-else="type" label="密码" label-position="left" prop="password">
                        <div class="container">
                            <div class="input-password">
                                <el-input v-model="form.password" show-password />
                            </div>
                            <el-button round class="small-button" @click="handleForgetPassword">忘记密码</el-button>
                        </div>
                    </el-form-item>
                    <div class="login-button">
                        <div class="login-method">
                            <el-button round @click="changeType(formRef)" class="small-button type-button">
                                <el-icon>
                                    <Switch />
                                </el-icon>
                                <span v-if="type.type">密码登录</span>
                                <span v-else>验证码登录</span>
                            </el-button>
                        </div>
                        <div class="button">
                            <el-button type="primary" style="width: 100%" @click="submitForm(formRef)" class="big-button">登录/注册</el-button>
                            <p>未注册手机号登录后将自动注册</p>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <!-- <div class="agreement">
            <span v-show="ifLogin && !agreed">
                未勾选协议
            </span>
            <span>
            <el-radio v-model="agreed" :value="true" :key="agreed" size="large" @click="agreed =!agreed">
            </el-radio>
                    我已阅读并同意
                    <el-link type="primary" href="#" @click="handleUserAgreementClick">《用户协议》</el-link>
                    <el-link type="primary" href="#" @click="handlePrivacyPolicyClick">《隐私政策》</el-link>
                    <el-link type="primary" href="#" @click="handleChildProtectionClick">《儿童青少年个人信息保护规则》</el-link>
            </span>
        </div> -->
        <div class="agreement">
            <div v-show="ifLogin && !agreed" class="agreement-error">
                未勾选协议
            </div>
            <div class="agreement-content">
                <el-radio v-model="agreed" :value="true" :key="agreed" size="large" @click="agreed = !agreed" class="agreement-radio" />
                <span class="agreement-text">
                    我已阅读并同意
                    <el-link type="primary" href="#" @click="handleUserAgreementClick" class="agreement-link">《用户协议》</el-link>
                    <el-link type="primary" href="#" @click="handlePrivacyPolicyClick" class="agreement-link">《隐私政策》</el-link>
                    <el-link type="primary" href="#" @click="handleChildProtectionClick" class="agreement-link">《儿童青少年个人信息保护规则》</el-link>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*login*/
.login {
    display: flex;
    flex-direction: column;
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
}

.login-title span {
    font-family: "Microsoft YaHei UI";
    font-size: 32px;
    font-weight: 400;
    text-shadow: -1px -1px 0 #B19780, 1px -1px 0 #B19780, -1px 1px 0 #B19780, 1px 1px 0 #B19780;
}

.login-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 40px;
    margin-bottom: 10px;
}

:deep(.el-form-item__label) {
    font-family: "Microsoft YaHei UI";
    font-size: 24px;
    color: #000000;
}

:deep(.el-input__wrapper) {
    border-radius: 5px;
    border: solid 1px #B19780;
    background-color: #FAE5DEFA;
}

.container {
    display: flex;
    align-items: center;
}

.login-button {
    display: flex;
    gap: 20px;
}

.small-button {
    padding: 6px 10px;
    border-radius: 8px;
    border: solid 0.5px #B19780;
    background-color: #FAE8CBF2;
    font-family: "Microsoft YaHei UI";
    font-size: 14px;
    color: #000000;
}

.container {
    gap: 10px;
}

.type-button {
    margin-top: 10px;
}

.big-button {
    display: flex;
    font-size: 24px;
    font-family: "Microsoft YaHei UI";
    height: 46px;
    border: none;
    border-radius: 8px;
    padding: 8px 37px;
    background-color: #D75757;
}

.button {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button p {
    margin-top: 10px;
    color: #979797;
    font-size: 12px;
}

/*agreement*/
.agreement {
    text-align: center;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.el-radio.el-radio--large {
    margin: 0;
}

.agreement-error {
    color: red;
    margin-left: 80px;
}
</style>