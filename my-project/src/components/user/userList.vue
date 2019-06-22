<template>
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/userList'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框-->
    <el-row class="my-row">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" class="btnsuc">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <!-- 用户状态开关 -->
      <el-table-column label="用户状态">

        <template slot-scope="scope">
            <!-- 数据显示 -->
            <!-- {{scope.row}}  -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>

      </el-table-column>
      <el-table-column prop="address" label="操作">

        <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
        <el-button type="success" size="mini" icon="el-icon-check" plain></el-button>

      </el-table-column>
    </el-table>
    <!-- 分页组 -->
    <!--
        current-page当前页
        page-sizes: 页容量的选项集合
        page-size: 页容量
        layout: 当前分页组件显示的结构
     -->
    <el-pagination
      @size-change="pagsize"
      @current-change="curChange"
      :current-page="pagenum"
      :page-sizes="[5,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      url: 'http://localhost:8888/api/private/v1',
      // 数据源
      tableData: [],
      // 查询数据
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示的条数
      pagesize: 5,
      // 数据总条数
      total: 0

    }
  },
  methods: {
    // 获取数据
    getData () {
      this.$http
        .get(
          `${this.url}/users?query=${this.query}&pagenum=${
            this.pagenum
          }&pagesize=${this.pagesize}`,
          {
            headers: {
              Authorization: window.localStorage.getItem('token')
            }
          }
        )
        .then(res => {
          console.log(res)
          //   解构
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    },
    // 搜索按钮
    search () {
      this.pagenum = 1
      this.getData()
    },
    //   当前页改变的时候
    curChange (curChange) {
      this.pagenum = curChange
      this.getData()
    },
    // 每页的容量发生改变的时候
    pagsize (pagsize) {
      this.pagesize = pagsize
      this.getData()
    }
  },

  mounted () {
    this.getData()
  }
}
</script>
<style scoped>
.my-row {
  margin-top: 20px;
}
.btnsuc {
  margin-left: 10px;
}
</style>
