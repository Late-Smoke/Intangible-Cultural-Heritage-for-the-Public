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
                style="max-width: 600px;"
                ref="formRef"
                size="default"
                >
                    <el-form-item label="手机号" label-position="left" prop="phone" class="item">
                        <div class="input-phone">
                            <el-input v-model="form.phone"/>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="type" label="验证码" label-position="left" prop="code">
                        <div class="container">
                            <div class="input-code">
                                <el-input v-model="form.code"/>
                            </div>
                            <el-button round class="small-button">获取验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-else="type" label="密码" label-position="left" prop="password">
                        <div class="container">
                            <div class="input-password">
                                <el-input v-model="form.password"/>
                            </div>
                            <el-button round class="small-button" @click="handleForgetPassword">忘记密码</el-button>
                        </div>
                    </el-form-item>
                    <div class="login-button">
                        <div class="login-method">
                            <el-button round @click="changeType(formRef)" class="small-button type-button">
                                <el-icon><Switch /></el-icon>
                                <span v-if="type">密码登录</span>
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
        <div class="agreement">
            <span>
                <el-radio v-model="agreed" :value="true" :key="agreed" size="large" @click="agreed =!agreed">
                </el-radio>
                我已阅读并同意
                <el-link type="primary" href="#" @click="handleUserAgreementClick">《用户协议》</el-link>
                <el-link type="primary" href="#" @click="handlePrivacyPolicyClick">《隐私政策》</el-link>
                <el-link type="primary" href="#" @click="handleChildProtectionClick">《儿童青少年个人信息保护规则》</el-link>
            </span>
        </div>
    </div>
</template>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: #EBD5BAD6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
/*title*/
.title span {
    font-family: "Alimama DaoLiTi";
    font-size: 58px;
    font-weight: 400;
    line-height: 69.37px;
    color: #FFFFFF;
    text-align: center;
    text-shadow: -1px -1px 0 #B19780, 1px -1px 0 #B19780, -1px 1px 0 #B19780, 1px 1px 0 #B19780;
    margin-bottom: 20px; /* 调整标题与登录框之间的间距 */
}

/*login*/
.login {
    width: 100%;
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
:deep(.el-form-item__label){
    font-family: "Microsoft YaHei UI";
    font-size: 24px;
    color: #000000;
}
:deep(.el-input__wrapper){
    border-radius: 5px;
    border: solid 1px #B19780;
    background-color:#FAE5DEFA; 
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
    background-color:#FAE8CBF2;
    font-family: "Microsoft YaHei UI";
    font-size: 14px;
    color: #000000;
}
.container {
    gap:10px;
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
}
.el-radio.el-radio--large {
    margin: 0;
}
</style>