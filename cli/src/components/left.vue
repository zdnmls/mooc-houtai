<template>
    <div>
        <div class="header bg-main">
            <div class="logo margin-big-left fadein-top">
                <h1><img src="../images/y.jpg" class="radius-circle rotate-hover" height="50" alt="">后台管理中心</h1>
            </div>
            <div class="head-l">&nbsp;<a class="button button-little bg-red" href="#/login"><span class="icon-power-off"></span> 退出登录</a> </div>
        </div>
        <el-row class="tac">
            <el-menu
                    :router="true"
                    :default-active="path"
                    :unique-opened="true"
                    style="width:200px;height:calc(100vh - 70px);float:left;"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#F2F9FD"
                    text-color="#333"
                    active-text-color="#409EFF">
                <div class="leftnav-title"><strong><span class="icon-list"></span>菜单列表</strong></div>
                <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>课程管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="course-list">查看课程</el-menu-item>
                    <el-menu-item index="add-course">新增课程</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>方向管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="field-list">查看方向</el-menu-item>
                        <el-menu-item index="add-field">新增方向</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>分类管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="category-list">查看分类</el-menu-item>
                        <el-menu-item index="add-category">新增分类</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>类型管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="type-list">查看类型</el-menu-item>
                        <el-menu-item index="add-type">新增类型</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            <el-container>
                <el-main>
                    <slot/>
                </el-main>
            </el-container>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:'left',
        props:['path'],
        methods: {
            handleOpen() {

            },
            handleClose() {

            }
        }
    }
</script>

<style scoped>

</style>