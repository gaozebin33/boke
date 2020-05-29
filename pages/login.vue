<template>
    <div>
        <el-form
         ref="loginForm"
         :model="form"  
         label-width="80px" 
         class="login-form">
            <el-form-item prop="email">
                <span>
                    <i class="el-icon-mobile"></i>
                </span>
                <el-input v-model="form.email" placeholder="邮箱 "></el-input>
            </el-form-item>
            <el-form-item prop="passwd">
                <span>
                    <i class="el-icon-lock"></i>
                </span>
                <el-input v-model="form.pwd" placeholder="密码 "></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <span>
                    <i class="el-icon-lock"></i>
                </span>
                <el-input v-model="form.pwd" placeholder="验证码 "></el-input>
                <img :src="captchaUrl" @click="updateCaptcha">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    export default {
        layout: "login",
        data() {
            return {
                captchaUrl: '/api/captcha?_t=' + new Date().getTime(),
                form: {}
            }
        },
        methods: {
            updateCaptcha(){
                this.captchaUrl =  '/api/captcha?_t=' + new Date().getTime()
            },
            onSubmit() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.login-form{
    width: 800px;
    margin: 50px auto;
}
</style>