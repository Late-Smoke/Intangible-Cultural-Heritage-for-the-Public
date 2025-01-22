<script setup>
import { ref, reactive } from 'vue';
import router from '@/router';

// 创建表单引用
const type = ref(true);// 真为验证码登录，假为密码登录
const agreed = ref(false);// 切换协议
const formRef = ref(null);
const form = reactive({
    phone: '',
    password: '',
    code: ''
});

// 表单验证规则
const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error("手机号格式不正确！"));
  } else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
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

const changeType = (formEl) => {
    type.value = !type.value;
    formEl.resetFields();
};

// 获取验证码函数
const handleGetCode = () => {
    console.log('获取验证码');
};

// 忘记密码函数
const handleForgetPassword = () => {
    router.push('/forget-password');
};

const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!');
            // 表单数据合规，执行登录/注册逻辑
            // 例如：this.$router.push('/dashboard');
        } else {
            console.log('error submit!');
            // 表单数据不合规，提示用户
        }
    });
};

// 三个协议点击（后期增加点击后效果）
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
    <div class="title">
        <span>非遗进大众</span>
    </div>
    <div class="login">
        <div class="login-box">
            <div class="login-title">
                <span v-if="type">验证登录</span>
                <span v-else>密码登录</span>
            </div>
            <div class="login-input">
                <el-form
                    label-position="left"
                    label-width="auto"
                    :model="form"
                    :rules="rules"
                    style="max-width: 600px"
                    ref="formRef"
                >
                    <el-form-item label="手机号" label-position="left" prop="phone">
                        <div class="input-phone">
                            <el-input v-model="form.phone"/>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="type" label="验证码" label-position="left" prop="code">
                        <div class="container">
                            <div class="input-code">
                                <el-input v-model="form.code"/>
                            </div>
                            <el-button type="text" class="get-code-button">获取验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-else="type" label="密码" label-position="left" prop="password">
                        <div class="container">
                            <div class="input-password">
                                <el-input v-model="form.password"/>
                            </div>
                            <el-button type="text" class="forget-password-button" @click="handleForgetPassword">忘记密码</el-button>
                        </div>
                    </el-form-item>
                    <div class="login-button">
                        <div class="login-method">
                            <el-button type="text" @click="changeType(formRef)">
                                <el-icon><Switch /></el-icon>
                                <span v-if="type">密码登录</span>
                                <span v-else>验证码登录</span>
                            </el-button>
                        </div>
                        <div class="button">
                            <el-button type="primary" style="width: 100%" @click="submitForm(formRef)">登录/注册</el-button>
                            <p>未注册手机号登录后将自动注册并登录</p>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="agreement">
            <span>
                <el-radio v-model="agreed" :value="true" :key="agreed" size="large" @click="agreed =!agreed">
                    我已阅读并同意
                </el-radio>
                    <el-link type="primary" href="#" @click="handleUserAgreementClick">《用户协议》</el-link>
                    <el-link type="primary" href="#" @click="handlePrivacyPolicyClick">《隐私政策》</el-link>
                    <el-link type="primary" href="#" @click="handleChildProtectionClick">《儿童青少年个人信息保护规则》</el-link>
            </span>
        </div>
    </div>
</template>

<style scoped>
/*title*/
.title span{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 43%;
    height: 4%;
    top: 14%;
    left: 0;
    right: 0;
    margin: auto;
    gap: 0px;
    opacity: 1;
}

/*login*/
.login{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 85%;
    height: 30%;
    top: 27%;
    left: 0;
    right: 0;
    margin: auto;
    gap: 0px;
    opacity: 1;
}

.login-title{
    display: flex;
    justify-content: center;
    margin: 10px;
}

.container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-phone{
    width: 70%;
}
.input-code{
    width: 40%;
}
.input-password{
    width: 60%; 
}

.login-button {
  display: flex;
  gap:20px;
  width: 90%;
}
.button p{
    padding-top: 5px;
    font-size: 10px;
    color: #888888;
}
</style>