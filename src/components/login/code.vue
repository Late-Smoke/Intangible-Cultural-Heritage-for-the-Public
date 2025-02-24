<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import { usePasswordStore } from '@/stores/user';
import { getCodeApi,codeLoginApi} from '@/axios/api/login';

const passwordStore = usePasswordStore();
const ruleFormRef = ref(null)
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
const validateCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  }else {
    callback();
  }
};

const form = reactive({
    phone: '',
    code: ''
});

const rules = reactive({
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    code: [{ validator: validateCode, trigger: 'blur' }],
})

const isCounting = ref(false);
const buttonText = ref('获取验证码');
const countdown = ref(60);
// 处理点击获取验证码按钮的事件
const handleGetCode = async() => {// 待修改
    if (isCounting.value || !ifPhoneRight.value) return;
    try {
    const response = await getCodeApi(form.phone);
    console.log('后端响应:',response);
    // 假设 API 调用成功后返回的数据中有一个字段表示操作结果
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
      // API 调用成功但业务逻辑失败，给出相应提示
      console.error('网络繁忙:', response.data.message);
    }
  } catch (error) {
    // API 调用出错，给出相应提示
    console.error('api调用出错:', error);
  }
};

const resetForm = (formEl) => {//点击取消
    if (!formEl) return;
    formEl.resetFields();
    useTypeStore().changeType(false);
    router.push({ name: 'login'});
}

const submitForm = (formEl) => {//点击确认
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid) {
            const response = await codeLoginApi(form.phone,form.code);
            console.log('验证码登录：',response.data);
            if(response.data.success === true){
                passwordStore.changePhone(form.phone);
                passwordStore.changeCode(form.code);
                router.push({ name: 'forget-password' }); 
            }else{
                ElMessage.error('验证码错误！')
            }
        }
    })
}
</script>

<template>
  <div class="forget-password">
    <div class="title">
        <span>验证手机号</span>
    </div>
    <div class="form">
        <el-form
        ref="ruleFormRef"
        style="max-width: 300px"
        :model="form"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        >
            <el-form-item label="手机号" label-position="left" prop="phone" class="item">
                <div class="input-phone">
                    <el-input v-model="form.phone"/>
                </div>
            </el-form-item>
            <el-form-item label="验证码" label-position="left" prop="code">
                <div class="container">
                    <div class="input-code">
                        <el-input v-model="form.code"/>
                    </div>
                    <el-button round class="small-button" @click="handleGetCode" :disabled="isCounting">{{ buttonText }}</el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="button">
                    <el-button @click="resetForm(ruleFormRef)" class="btn reset">取消</el-button>
                    <el-button @click="submitForm(ruleFormRef)" class="btn submit">
                        确认
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<style scoped>
/*标题*/
.forget-password {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; 
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.title span {
  font-family: "Microsoft YaHei UI";
  font-size: 32px;
  font-weight: 400;
  text-shadow: -1px -1px 0 #B19780, 1px -1px 0 #B19780, -1px 1px 0 #B19780, 1px 1px 0 #B19780;
}

/*表单*/
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
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
  margin-right: 20px;
}

/*按钮*/
.button{
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap:25%;
  margin-top: 10px;
  padding: 0 10%;
}
.btn {
  width: 85px;
  height: 43px;
  margin: 0;
  padding: 8px 10px;
  height: 46px;
  border-radius: 8px;
  font-family: "Microsoft YaHei UI";
  font-size: 20px;
}
.reset {
    border: solid 0.5px #B19780;
    color: #000000;
    background-color:#FAE8CBF2;
}
.submit {
    border: none;
    color: #FFFFFF;
    background-color: #D75757;
}

.container {
    display: flex;
    align-items: center;
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
</style>