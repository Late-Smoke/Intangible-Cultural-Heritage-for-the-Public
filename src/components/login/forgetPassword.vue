<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus';
import { usePasswordStore } from '@/stores/user';
import { updatePasswordApi} from '@/axios/api/login';

const passwordStore = usePasswordStore();
const ruleFormRef = ref(null)

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入修改的密码'));
  } else if (value.length < 8) {
    callback(new Error('密码长度至少为 8 位'));
  } else {
    if (ruleForm.checkPass!== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass');
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入修改的密码'));
  } else if (value!== ruleForm.pass) {
    callback(new Error("两次密码不一样！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
    pass: '',
    checkPass: '',
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid) {
          console.log('submit!');
          const response = await updatePasswordApi(passwordStore.phone,passwordStore.code,ruleForm.pass);
          console.log('更新密码：',response.data);
          if(response.data.success === true){
              router.push({ name: 'mainPageView' }); 
          }else{
              ElMessage.error('用户未注册！')
          }
        } else {
        console.log('error submit!');
        }
    })
}

const resetForm = (formEl) => {
    if (formEl) formEl.resetFields();
    passwordStore.phone = '';
    passwordStore.code = null;
    router.push({ name: 'loginView'});
}
</script>

<template>
  <div class="forget-password">
    <div class="title">
        <span>忘记密码</span>
    </div>
    <div class="form">
        <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        >
            <el-form-item label="修改密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
                show-password 
                />
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
</style>