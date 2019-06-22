<template>
  <el-row>
    <el-col :span="6">
      <img src alt>
    </el-col>
    <el-col :span="12">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col :span="6">
      <a href="#" @click.prevent="out">退出</a>
    </el-col>
  </el-row>
</template>
<script>
export default {
  methods: {
    out () {
      this.$confirm('是否退出登入?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 获取登入令牌
          window.localStorage.removeItem('toke')
          // 返回登入页
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
    }
  }
}
</script>
<style scoped>
.el-col:nth-child(2) h2 {
  color: #ffffff;
  margin: 0;
  font-weight: normal;
}
.el-col:last-child a {
  float: right;
  color: red;
  text-decoration: none;
}
</style>
