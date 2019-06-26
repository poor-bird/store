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
          <el-button type="success" plain @click.prevent="addShowFn">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 用户添加数据 -->
    <el-dialog title="添加用户" :visible.sync="addUser.addIsShow">
      <el-form :model="addUser.userData" :rules="addUser.rules">
        <!-- 用户名 -->
        <el-form-item label="用户名" :label-width="addUser.formLabelWidth" prop="username">
          <el-input v-model="addUser.userData.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="addUser.formLabelWidth" prop="password">
          <el-input v-model="addUser.userData.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="addUser.formLabelWidth" prop="email">
          <el-input v-model="addUser.userData.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" :label-width="addUser.formLabelWidth" prop="mobile">
          <el-input v-model="addUser.userData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" @click.prevent="addShowFn">取 消</el-button>
        <el-button type="primary" @click.prevent="addEnter($event)">确 定</el-button>
      </div>
    </el-dialog>

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
          {{scope.row}}
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeStatue(scope.row.id,scope.row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <!-- 数据操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          {{scope.row.id}}
          <!-- 编辑按钮 -->
          <el-button
            :id="scope.row.id"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.prevent="editShowFn(scope.row.id)"
          ></el-button>
          <!-- 编辑框 -->
          <el-dialog title="修改数据" :visible.sync="editUser.editIsShow">
            <el-form :model="editUser.editData">
              <!-- 用户名 -->
              <el-form-item label="用户名" :label-width="editUser.formLabelWidth">
                <el-input :disabled="true" v-model="editUser.editData.username" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 邮箱 -->
              <el-form-item label="邮箱" :label-width="editUser.formLabelWidth">
                <el-input v-model="editUser.editData.email" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 电话 -->
              <el-form-item label="电话" :label-width="editUser.formLabelWidth">
                <el-input v-model="editUser.editData.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" @click.prevent="editShowFn">取 消</el-button>
              <el-button type="primary" @click.prevent="editEnter">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
            @click.prevent="deleteUser(scope.row.id)"
          ></el-button>
          <!-- 分配角色按钮 -->
          <el-button
            type="success"
            size="mini"
            icon="el-icon-check"
            plain
            @click.prevent="roleUserFn(scope.row.id)"
          ></el-button>
          <!-- 分配弹框 -->
          <el-dialog title="分配角色" :visible.sync="roleUser.isShow">
            <el-form :model="roleUser.roleData">
              <!-- {{roleUser.roleData}} -->
              <el-form-item label="当前用户" :label-width="roleUser.tableWidth">
                <span>{{roleUser.username}}</span>
              </el-form-item>
              <!-- 下拉框 -->
              <el-form-item label="请选择角色" :label-width="roleUser.tableWidth">
                  {{roleUser.roleData.rid}}
                <el-select v-model="roleUser.roleData.rid" placeholder="请选择活动区域">
                  <el-option :value="-1" label="请选择"></el-option>
                  <!-- <el-option label="请选择" :value="-1"></el-option> -->
                  <el-option
                    v-for="item in roleUser.selRoleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  ></el-option>
                  <!-- <el-option label="请选择" :value="-2"></el-option> -->
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="roleCancel">取 消</el-button>
              <el-button type="primary" @click="roleEnter">确 定</el-button>
            </div>
          </el-dialog>
        </template>
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
      :total="total"
    ></el-pagination>
  </el-card>
</template>
<script>
let that = this;
export default {
  data: function() {
    return {
      url: "http://localhost:8888/api/private/v1",
      // 数据源
      tableData: [],
      // 查询数据
      query: "",
      // 当前页码
      pagenum: 1,
      // 每页显示的条数
      pagesize: 5,
      // 数据总条数
      total: 0,
      //用户添加的数据
      addUser: {
        dialogTableVisible: true,
        addIsShow: false, //控制显示和隐藏的按钮
        userData: {
          username: "",
          password: "",
          email: "",
          mobile: ""
        },
        formLabelWidth: "120px",
        type: "addType",
        // 规则
        rules: {
          username: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
            { min: 2, message: "长度在 2 到 4 个字", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          email: [
            { required: true, message: "请输入邮箱地址", trigger: "blur" },
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          mobile: [
            { required: true, message: "请输入电话", trigger: "blur" },
            {
              min: 3,
              max: 12,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ]
        }
      },
      //编辑用户
      editUser: {
        dialogTableVisible: true,
        editIsShow: false, //控制显示和隐藏的按钮
        editData: {
          id: "",
          username: "",
          //   password: "",
          email: "",
          mobile: ""
        },
        formLabelWidth: "120px"
      },
      //   角色分配对象
      roleUser: {
        isShow: false,
        // 弹框宽度
        tableWidth: "120px",
        username: "",
        roleData: {
          rid: "",
          rolename: "",
          id: ""
        },
        // 下拉框数据
        selRoleList: []
      },
   
    };
  },
  methods: {
    // 获取数据
    getData() {
      this.$http
        .get(
          `${this.url}/users?query=${this.query}&pagenum=${
            this.pagenum
          }&pagesize=${this.pagesize}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          //   console.log(res);
          //   解构
          const { data, meta } = res.data;
          //   console.log(res)
          if (meta.status === 200) {
            this.tableData = data.users;
            this.total = data.total;
          }
        });
    },
    // 搜索按钮
    search() {
      this.pagenum = 1;
      this.getData();
    },
    //   当前页改变的时候
    curChange(curChange) {
      this.pagenum = curChange;
      this.getData();
    },
    // 每页的容量发生改变的时候
    pagsize(pagsize) {
      this.pagesize = pagsize;
      this.getData();
    },
    /* 
        添加用户的方法集合
    */
    addShowFn() {
      this.addUser.addIsShow = !this.addUser.addIsShow;
    },
    // 确认按钮
    addEnter() {
      // 通过axios将数据提交到数据库
      this.$http
        .post(`${this.url}/users`, this.addUser.userData, {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(res => {
          // console.log(res)
          this.addShowFn();

          // 解构
          const { meta } = res.data;
          if (meta.status === 201) {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
          }
          //   刷新数据
          this.getData();
          // 清空数据
          this.addUser.userData = {
            username: "",
            password: "",
            email: "",
            mobile: ""
          };
        });
    },
    // 删除按钮
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$http
            .delete(`${this.url}/users/${id}`, {
              id: id,
              headers: {
                Authorization: window.localStorage.getItem("token")
              }
            })
            .then(res => {
              console.log(res);
              // 解构
              const { meta } = res.data;
              if (meta.status === 200) {
                this.getData();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // 通过用户的id进行删除数据
    },
    //编辑按钮
    editShowFn(id) {
      if (id) {
        // 获取当前的数据
        this.$http
          .get(`${this.url}/users/${id}`, {
            id: id,
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          })
          .then(res => {
            // console.log(res)
            // 解构数据
            const { data, meta } = res.data;
            if (meta.status === 200) {
              this.editUser.editData = {
                id: data.id,
                username: data.username,
                //   password: "",
                email: data.email,
                mobile: data.mobile
              };
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.editUser.editIsShow = !this.editUser.editIsShow;
    },
    // 确认修改数据
    editEnter() {
      // console.log(id)
      // 通过axios进行提交数据
      console.log("ddd");

      console.log(this.editUser.editData.id);

      this.$http({
        method: "PUT",
        url: `${this.url}/users/${this.editUser.editData.id}`,
        data: {
          // id:this.editUser.editData.id,
          email: this.editUser.editData.email,
          mobile: this.editUser.editData.mobile
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        // 解构
        const { meta } = res.data;
        if (meta.status === 200) {
          // 消失
          // this.addUser.userData.id
          // console.log("DDdd")
          this.getData();
          this.editUser.editIsShow = false;
        }
      });
    },
    // 角色分配
    roleUserFn(id) {
      this.roleUser.isShow = !this.roleUser.isShow;
      // // 获取数据

      // 获取下拉框列表的数据
      this.$http
        .get(`${this.url}/roles`, {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        })
        .then(res => {
          // 解构
          const { data, meta } = res.data;
          if (meta.status === 200) {
            // 将数据放入selRoleList数组中
            this.roleUser.selRoleList = data;
            // 通过id查询用户信息
            this.$http
              .get(`${this.url}/users/${id}`, {
                id: id,
                headers: {
                  Authorization: window.localStorage.getItem("token")
                }
              })
              .then(res => {
                // console.log(res)
                //解构
                const { data, meta } = res.data;
                if (meta.status === 200) {
                  // 赋值
                  this.roleUser.username = data.username;
                  this.roleUser.roleData.id = data.id;
                  this.roleUser.roleData.rid = data.rid
                }
              });
          }
        });
    },
    // 取消角色分配
    roleCancel(){
        this.roleUser.isShow = !this.roleUser.isShow;
    },
    // 提交角色分配
    roleEnter(){
        this.$http.put(`${this.url}/users/${this.roleUser.roleData.id}/role`,{rid:this.roleUser.roleData.rid},{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        }).then(res=>{
                // console.log(res)
                // 更新数据
                this.getData();
                this.roleUser.isShow = !this.roleUser.isShow;
                
            })
           
    },
    // 用户状态改变
    changeStatue(id,type) {
        console.log(type)
        console.log(id)
        this.$http.put(`${this.url}/users/${id}/state/${type}`,{uId:id,type:type},{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res);
        })
    }
  },

  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
.my-row {
  margin-top: 20px;
}
.btnsuc {
  margin-left: 10px;
}
</style>
