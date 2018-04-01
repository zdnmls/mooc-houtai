<template>
    <div>
        <div class="bg"></div>
        <div class="container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:150px;"></div>
                    <div class="media media-y margin-big-bottom">
                    </div>
                    <form action="index.html" method="post" >
                        <div class="panel loginbox">
                            <div class="text-center margin-big padding-big-top"><h1>后台管理中心</h1></div>
                            <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"
                                         class="demo-ruleForm">
                                    <div class="form-group">
                                        <div class="field field-icon-right">
                                            <el-form-item  prop="username">
                                                <el-input height="88px" placeholder="请输入账号" v-model.number="ruleForm2.username"></el-input>
                                                <span class="icon icon-user margin-small"></span>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="field field-icon-right">
                                            <el-form-item   prop="pass">
                                                <el-input placeholder="请输入密码" type="password" v-model="ruleForm2.pass"
                                                          auto-complete="off"></el-input>
                                                <span class="icon icon-key margin-small"></span>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../css/pintuer.css'
    import '../css/admin.css'
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'));
                }else{
                    callback()
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else(
                    callback()
                )
            };
            return {
                ruleForm2: {
                    pass: '',
                    username: ''
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fetch('/api/login',{
                            method:'post',
                            credentials:'same-orign',
                            headers:{
                                'Content-type':'application/json'
                            },
                            body:JSON.stringify(this.ruleForm2)
                        }).then(r=>r.json()).then(r=>{
                            if(r==='ok'){
                                window.location.href='#/course-list'
                            }else{
                                this.$message.error('账号或者密码输入错误！')
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .form-group {
        padding-bottom: 0px;
    }
</style>