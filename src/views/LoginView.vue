<script setup>
import { ref } from 'vue'
const type = ref(true);//真为验证码登录 ;假为密码登录
const phone = ref();//用户输入的手机号
const code = ref();//用户输入的验证码
const agreed = ref(false);//是否同意协议

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
                <div class="login-phone">
                    <span>手机号码</span>
                    <el-input v-model="phone" style="width: 240px" placeholder="" />
                </div>
                <div class="login-code">
                    <span v-if="type">验证码</span>
                    <span v-else>密码</span>
                    <el-input v-model="code" style="width: 240px" placeholder="" />
                    <el-button type="text" style="margin-left: 10px">
                        <span v-if="type">获取验证码</span>
                        <span v-else>忘记密码</span>
                    </el-button>
                </div>
            </div>
            <div class="login-button">
                <div class="login-method">
                    <el-button type="text">
                        <el-icon><Switch /></el-icon>
                        <span v-if="type">密码登录</span>
                        <span v-else>验证码登录</span>
                    </el-button>
                </div>
                <el-button type="primary" style="width: 300px">登录/注册</el-button>
                <p>未注册手机号登录后将自动注册并登录</p>
            </div>
        </div>
    </div>
    <div class="agreement">
        <span>
            <el-radio v-model="agreed" :value="true" :key="agreed" size="large" @click="agreed = !agreed">
            </el-radio>
            我已阅读并同意
            <el-link type="primary" href="#" @click="handleUserAgreementClick">《用户协议》</el-link>
            <el-link type="primary" href="#" @click="handlePrivacyPolicyClick">《隐私政策》</el-link>
            <el-link type="primary" href="#" @click="handleChildProtectionClick">《儿童青少年个人信息保护规则》</el-link>
        </span>
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
    opacity: 0px;

    font-family: Inter;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.7rem;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}

/*login*/
.login{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 30%;
    top: 27%;
    left: 0;
    right: 0;
    margin: auto;
    gap: 0px;
    border-radius: 5px 0px 0px 0px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
}
</style>