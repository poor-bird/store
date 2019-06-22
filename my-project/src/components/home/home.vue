<template>
  <el-container>
    <el-header>
        <topHead></topHead>
    </el-header>

  <!-- </el-container> -->
    <el-container>
      <el-aside width="200px">
          <sideBar></sideBar>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入模块
import topHead from '../layout/topHead'
import sideBar from '../layout/sidebar'
export default {
  data: function () {
    return {
      url: 'http://localhost:8888/api/private/v1'
    }
  },
  components: {
    topHead,
    sideBar
  },
  mounted () {
    // 获取登入令牌
    console.log(token)
    const token = window.localStorage.getItem('token')
    // 判断是否有令牌
    if (token) {
      this.$http.post(`${this.url}/login`, {
        username: 'admin',
        password: '123456'
      }).then(res => {
        const newtoken = window.localStorage.getItem('token')
        // 结构
        const {data} = res.data
        if (newtoken === data.token) {
          this.$message('欢迎回来')
        }
        // 判断登入令牌过期后使用的代码
        // else{
        //     this.$router.push("/login")
        //     this.$message({
        //         message: '登入信息有误，请重新登入',
        //         type: 'warning'
        //     });
        // }
      })
    } else {
      // 返回登入页
      this.$router.push('/login')
      this.$message({
        message: '请先登入',
        type: 'warning'
      })
    }
  }
}
</script>
<style>
.el-container{
    height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /* text-align: center; */
    line-height: 200px;
  }
  .el-main {
    padding-top: 0;
      background-color: #E9EEF3;
      color: #333;
      height: 100%;

    /* line-height: 160px; */
  }

</style>
