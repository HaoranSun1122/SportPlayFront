<template>
    <div>
        用户列表
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表主体部分 -->
        <el-card>
            <el-row :gutter="25">
                <el-col :span="10">
                    <!-- 搜索区域 -->
                    <el-input placeholder="请输入搜索内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                    <!-- 搜索按钮 -->
                </el-col>
            </el-row>

            <!-- 用户列表部分 border边框 stripe隔行变色-->
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <!-- 索引列 -->
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="state">
                    <template slot-scope="scope">
                        <!-- {{scope.row}} -->
                        <!-- 每一行封存的数据 -->
                        <el-switch v-model="scope.row.state"></el-switch>
                    </template>
                </el-table-column>
                <!-- 作用域插槽 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
                        </el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)">
                        </el-button>
                        <!-- 权限 -->
                        <el-tooltip effect="dark" content="分配权限" placement="top-start" :enterable="false">
                            <!--文字提示 enterable 隐藏-->
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 size-change 每页最大变化 current-change 当前最大变化 layout功能组件  -->
            <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 100]" :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        </el-card>


    </div>
</template>
<script>
    export default {
        created() {
            this.getUserList();

        },
        data() {
            return {
                //查询信息实体
                queryInfo: {
                    query: "", //查询信息
                    pageNum: 1, //当前页
                    pageSize: 5, //每页最大数

                },
                userList: [], //用户列表
                total: 0, //总记录数为0

            }
        },
        methods: {
            //获取所有用户
            async getUserList() {
                console.log(123);
                const {
                    data: res
                } = await this.$http.get("alluser", {
                    params: this.queryInfo
                });
                this.userList = res.data;//用户列表数据封装
                this.total = res.numbers;//总用户数封装
            },
            // 最大数
            handleSizeChange(newSize){
                this.queryInfo.pageSize = newSize;
                this.getUserList();
            },
            //pagenumber的出发动作
            handleCurrentChange(newPage){
                this.queryInfo.pageNum = newPage;
                this.getUserList();

            }
        }

    }
</script>
<style scoped>
    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 17px;
    }
</style>