<template>
<!--unique-opened是否保持一个子菜单的展开-->
  <el-menu :unique-opened="true" :router="true" class="el-menu-vertical-demo">
    <!-- 用户管理 -->
    <el-submenu index="1">
      <!-- 标题导航 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <!-- 子导航 -->
      <el-menu-item-group>
        <!-- 选项 -->
        <el-menu-item index="/userList">
          <i class="el-icon-location"></i>
          <span>用户列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 权限管理 -->
    <el-submenu index="2">
      <!-- 标题导航 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <!-- 子导航 -->
      <el-menu-item-group>
        <!-- 选项 -->
        <el-menu-item index="2-1">
          <i class="el-icon-location"></i>
          <span>角色列表</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <i class="el-icon-location"></i>
          <span>权限列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 商品管理 -->
    <el-submenu index="3">
      <!-- 标题导航 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品列表</span>
      </template>
      <!-- 子导航 -->
      <el-menu-item-group>
        <!-- 选项 -->
        <el-menu-item index="3-1">
          <i class="el-icon-location"></i>
          <span>分类参数</span>
        </el-menu-item>
        <el-menu-item index="3-2">
          <i class="el-icon-location"></i>
          <span>商品分类</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 订单管理 -->
    <el-submenu index="4">
      <!-- 标题导航 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品列表</span>
      </template>
      <!-- 子导航 -->
      <el-menu-item-group>
        <!-- 选项 -->
        <el-menu-item index="4-1">
          <i class="el-icon-location"></i>
          <span>订单列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 数据统计 -->
    <el-submenu index="5">
      <!-- 标题导航 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品列表</span>
      </template>
      <!-- 子导航 -->
      <el-menu-item-group>
        <!-- 选项 -->
        <el-menu-item index="5-1">
          <i class="el-icon-location"></i>
          <span>数据列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {}
</script>
<style scoped>
    .el-menu{
        height: 100%;
        background: #ffffff;
    }
</style>
