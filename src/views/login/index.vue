<script src="../../utils/auth.js"></script>
<template>
  <div class="bgimg">
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">系统登录</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handLogin">Login</el-button>
      </el-form>
    </div>
    <div class="systen-title">
      <h1>CSSD</h1>
      <h2>课堂学生行为检测系统</h2>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import axios from 'axios'
// import crypto from 'crypto'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'lingyin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      token: ''
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handLogin() {
      const _this = this
      const sha256 = require('js-sha256').sha256 // 这里用的是require方法，所以没用import
      const username = sha256(this.loginForm.username)
      const password = sha256(this.loginForm.password) // 要加密的密码
      axios.post('/api/login', this.$qs.stringify(
        {
          username: username,
          password: password
        }))
        .then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            const token = response.data.data.token
            // setToken(token)
            // Cookie.set('token', token)
            localStorage.setItem('token', token)
            _this.$router.push('/main')
          }
          if (response.data.code === 20003) {
            // alert(response.data.msg)
            this.$message.error(response.data.msg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not(cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */

.bgimg{
  width: 100%;
  height: 100%;
  background-image: url(../../../../新建文件夹/cssd-web/src/assets/images/login_bg1.jpg);
  background-size: cover
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        //box-shadow: 0 0 0 1000px $bg inset !important;
        //-webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
//$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    background-image: linear-gradient(25deg, #3e0e90, #4e59aa, #4a99c3, #0adbdc);
    position: absolute;
    top: 20%;
    right: 200px;
    width: 400px;
    max-width: 100%;
    padding: 80px 35px 35px 50px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.systen-title{
  position: absolute;
  top:20%;
  left: 20%;
  font-size: 50px;
  font-family: "微软雅黑", "黑体";
  color: #FFFFFF;
}
.systen-title h1{
  position: relative;
  left: 20%;
}
</style>
