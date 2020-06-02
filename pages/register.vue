<template>
    <div class="register-container">
        <el-form
         ref="registerForm"
         :model="form" 
         :rules="rules"
         label-width="100px" 
         class="register-form">
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
            <el-form-item prop="nickName" label="昵称">
                <el-input v-model="form.nickName" placeholder="请输入昵称 "></el-input>
            </el-form-item>
            <el-form-item prop="passwd" label="密码">
                <el-input type="password" v-model="form.passwd" placeholder="请输入密码 "></el-input>
            </el-form-item>
            <el-form-item prop="repasswd" label="确认密码">
                <el-input type="password" v-model="form.repasswd" placeholder="请再次输入密码 "></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onRegister">注册</el-button>
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
                    nickName: 'gaozebin',
                    passwd: 'tufeiwo000',
                    repasswd: 'tufeiwo000',
                    captcha: ''
                },
                rules: {
                   email: [
                       { required: true, message:'请输入邮箱'  },
                       { type: 'email', message:'请输入正确的邮箱格式'  },
                   ],
                   captcha: [
                       { required: true, message:'请输入验证码'  },
                   ],            
                   nickName: [
                       { required: true, message:'请输入昵称'  },
                   ],            
                   passwd: [
                       { required: true, message:'请输入6~12位密码', pattern: /^[\w_-]{6,12}$/g },
                   ],   
                   repasswd: [
                       { required: true, message:'请再次输入密码'},
                       { validator: (rule, value, callback) => {
                           if(value !== this.form.passwd){
                               callback(new Error('两次密码不一致'))
                           }else{
                               callback()
                           }
                       } }
                   ],                           
                }
            }
        },
        methods: {
            updateCaptcha(){
                this.captchaUrl =  '/api/captcha?_t=' + new Date().getTime()
            },
            onRegister() {
                console.log('注册')
                this.$refs.registerForm.validate( async valid => {
                    if(valid){
                        console.log('校验成功')
                        let { email, nickName, passwd, captcha }  = this.form
                        let obj = {
                            email,
                            nickName,
                            passwd: md5(passwd),
                            captcha
                        }
                        let res = await this.$http.post('/user/register', obj)
                        if(res.code == 0){
                            this.$alert('注册成功','成功', {
                                confirmButtonText: "去登陆",
                                callback: () => {
                                    this.$router.push('/login')
                                }
                            })
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
            }
        },
    }
</script>

<style lang="scss" scoped>
.register-container{
    width: 100%;
    min-height: 100%;
    .register-form{
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
    }
}
</style>