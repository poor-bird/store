<template>
  <div class="login-wrap">
    <el-form
      :label-position="labelPosition"
      ref="ruleForm"
      label-width="80px"
      :model="formData"
      :rules="rules"
      class="demo-ruleForm"
    >
      <h2>用户登入</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click.prevent="login">主要按钮</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      labelPosition: 'top',
      formData: {
        username: '',
        password: ''
      },
      url: 'http://localhost:8888/api/private/v1',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 请求数据
          this.$http.post(`${this.url}/login`, this.formData)
            .then(res => {
              // 解构
              const {data, meta} = res.data
              if (meta.status == 200) {
                window.localStorage.setItem('token', data.token)
                this.$message({
                  message: '登入成功',
                  type: 'success'
                })
                this.$router.push('/home')
              } else {
                this.$message.error('登入错误，用户名或密码错误')
              }
            })
        } else {
          console.log('不合法')
        }
      })
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form.el-form--label-top {
  padding: 40px;
  width: 500px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
