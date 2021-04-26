<template>
    <!-- 引入布局 -->
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/logo1.png" alt />

            </div>
            <span>个人运动平台</span>
            <el-button type="info" @click="logout">安全退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="isCollapse?'60px':'20px'" >
                <div class="toggle-button" @click="toggleCollapase">|||</div>
                <el-menu 
                    background-color="#545c64" text-color="#fff" active-text-color="#409eff" 
                    unique-opened :isCollapse="isCollapse" :collapse-transition="false" :router="true"
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="it.path" v-for="it in item.sList" :key="it.id" @click="saveNavState(it.path)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{it.title}}</span>
                            </template>
                        </el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主题内容 -->
            <el-main>
                <router-view>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default{
        data(){
            return{
                // 菜单列表
                menuList:[],
                isCollapse:false,
                activePath:'welcome',//默认路径
            }
        },
        // onload 事件，
        created(){
            // 查询我的menulist
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath');//取出session的path动态修改activepath
        },
        methods:{
            logout(){
                window.sessionStorage.clear();
                this.$router.push("/login");
            },
            //获取导航菜单方法
            async getMenuList(){
               const {data:res} = await this.$http.get("menus");
               console.log(res);
               if(res.flag !=200) return this.$message.error("获取列表失败");//访问失败
               this.menuList = res.menus;//数据回填
            //    console.log(menuList);
            },
            // 控制伸缩
            toggleCollapase(){
                this.isCollapse = !this.isCollapse;
            },
            // 保存路径
            saveNavState(activePath){
                window.sessionStorage.setItem('activePath',activePath);//存放在session里
                this.activePath = activePath;

            },
        }
    }
</script>
<style scoped>
    /* //头部样式 */
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0%;
        align-items: center;
        color: #fff;
        font-size: 20px;
        display: flex;
        align-items: center;
    }

    /* 侧边栏样式 */
    .el-aside {
        background-color: #333744;
    }

    /* 主体样式 */
    .el-main {
        background-color: #eaedf1;
    }

    .home-container {
        height: 100%;
    }

    img {
        width: 55px;
        height: 55px;
    }
    /* 按钮样式 */
    .toggle-button{
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
        /* 显示小手 */

    }
</style>