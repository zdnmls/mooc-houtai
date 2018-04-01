<template>
        <left :path="'add-field'">
            <div class="panel admin-panel margin-top">
                <div class="panel-head" id="add"><strong><span class="icon-pencil-square-o"></span>增加内容</strong></div>
                <div class="body-content">
                    <form class="form-x" ref="form" @submit.prevent="submit">
                        <div class="form-group">
                            <div class="label">
                                <label>新增分类：</label>
                            </div>
                            <div class="field">
                                <input type="text" class="input w50" name="field" value="" data-validate="required:请输入标题" />
                                <div class="tips"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="label">
                                <label></label>
                            </div>
                            <div class="field">
                                <button class="button bg-main icon-check-square-o" type="submit" @> 提交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </left>
</template>

<script>
    import left from './left'
    export default {
        name: "addfield",
        methods:{
            submit:function () {
                fetch('api/add_field',{
                    credentials: "same-origin",
                    method: 'POST',
                    body: new FormData(this.$refs.form)
                }).then(r=>r.json()).then(data=>{
                    if(data){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            }
        },
        components:{left}
    }
</script>

<style scoped>

</style>