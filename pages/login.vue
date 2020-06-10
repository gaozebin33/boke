<template>
    <div class="login-container">
        <el-form
         ref="loginForm"
         :model="form" 
         :rules="rules"
         label-width="100px" 
         class="login-form">
            <div class="title-contaniner">
                <img src="https://cn.vuejs.org/images/logo.png" alt="">
            </div>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="form.email" placeholder="邮箱 "></el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha-container" label="验证码">
                <div class="captcha">
                    <img :src="captchaUrl" @click="updateCaptcha">
                </div> 
                <el-input v-model="form.captcha" placeholder="验证码 "></el-input>
            </el-form-item>
            <el-form-item prop="emailcode" class="captcha-container" label="邮箱验证码">
                <div class="captcha">
                   <el-button class="sendemailbtn" type="primary" :disabled="send.timer>0" @click="sendEmailCode"> {{sendText}}</el-button>
                </div> 
                <el-input v-model="form.emailcode" placeholder="验证码 "></el-input>
            </el-form-item>            
            <el-form-item prop="passwd" label="密码">
                <el-input type="password" v-model="form.passwd" placeholder="请输入密码 "></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onlogin">登录</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import md5 from 'md5'
    export default {
        layout: "login",
        data() {
            return {
                captchaUrl: '/api/captcha?_t=' + new Date().getTime(),
                form: {
                    email: '993486220@qq.com',
                    passwd: 'tufeiwo000',
                    captcha: '',
                    emailcode: ''
                },
                rules: {
                   email: [
                       { required: true, message: '请输入邮箱'  },
                       { type: 'email', message: '请输入正确的邮箱格式'  },
                   ],
                   captcha: [
                       { required: true, message: '请输入验证码'  },
                   ],  
                   emailcode: [
                       { required: true, message: '请输入邮箱验证码' }
                   ],                    
                   passwd: [
                       { required: true, message:'请输入6~12位密码', pattern: /^[\w_-]{6,12}$/g },
                   ],                          
                },
                send: {
                    timer: 0
                }
            }
        },
        computed: {
            sendText() {
                if(this.send.timer <= 0){
                    return '发送'
                }else{
                   return `${this.send.timer}s后发送`
                }
            }
        },
        methods: {
            updateCaptcha(){
                this.captchaUrl =  '/api/captcha?_t=' + new Date().getTime()
            },
            onlogin() {
                this.$refs.loginForm.validate( async valid => {
                    if(valid){
                        console.log('校验成功')
                        let { email, passwd, captcha, emailcode }  = this.form
                        let obj = {
                            email,
                            passwd: md5(passwd),
                            captcha,
                            emailcode
                        }
                        let res = await this.$http.post('/user/login', obj)
                        if(res.code == 0){
                            // 存储token
                           localStorage.setItem('token', res.data.token)
                           this.$message.success('登录成功')
                           setTimeout(() => {
                               this.$router.push('/')
                           }, 500);
                        }else{
                            this.$message({
                                type:'error',
                                message: res.message
                            })
                        }
                    }else{
                        console.log('校验失败')
                    }
                } )
            },
            async sendEmailCode () {
                // 发请求
                await this.$http.get('/sendcode?email=' + this.form.email)
                this.send.timer = 10
                this.timer = setInterval(() => {
                    this.send.timer --
                    if(this.send.timer === 0){
                        clearInterval(this.timer)
                    }
                }, 1000);
            }
        },
    }
</script>

<style lang="scss" scoped>
.login-container{
    width: 100%;
    min-height: 100%;
    .login-form{
        width: 520px;
        padding: 30px 0 0;
        margin: 0 auto;
        overflow: hidden;
        .title-contaniner{
            text-align: center;
            img{
                width: 150px;
                margin:0 0 20px 100px;
            }
        }
        .captcha-container{
            width: 410px;
            position: relative;
            .captcha{
                position: absolute;
                right: -110px;
                z-index: 2;
                img{
                    width: 90px;
                    height: 40px;
                    cursor: pointer;
                }
            }
        }
        .sendemailbtn{
            width: 100px;
        }
    }
}
</style>