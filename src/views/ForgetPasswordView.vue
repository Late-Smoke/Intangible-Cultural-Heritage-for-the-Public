<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'

const ruleFormRef = ref(null)

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入修改的密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度至少为 6 位'));
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
    formEl.validate((valid) => {
        if (valid) {
        console.log('submit!');
        } else {
        console.log('error submit!');
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    router.push('/');
}
</script>

<template>
    <div class="title">
        <span>忘记密码</span>
    </div>
    <div class="form">
        <div class="form-title">
            <span>请输入至少6位数密码</span>
        </div>
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
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <div class="button">
                    <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        确认
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.title{
    height: 10vh;
    display: flex;
    justify-content: center; 
    align-items: center;
}
.form{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center; 
}
.form-title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px; 
}
.button{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-gap:25%;
    padding: 0 10%;
}
</style>