<template>
       <left :path="'add-course'">
           <div class="panel admin-panel margin-top">
               <div class="panel-head" id="add"><strong><span class="icon-pencil-square-o"></span>增加内容</strong></div>
               <div class="body-content">
                   <form class="form-x" ref="form" @submit.prevent="submit">
                       <div class="form-group">
                           <div class="label">
                               <label>课程标题：</label>
                           </div>
                           <div class="field">
                               <input type="text" class="input w50" name="title" value="" data-validate="required:请输入标题" />
                               <div class="tips"></div>
                           </div>
                       </div>
                       <div class="form-group">
                           <div class="label">
                               <label for="exampleFormControlFile1">课程图片</label>
                           </div>
                           <div class="field">
                               <input name="pic" type="file" class="form-control-file" id="exampleFormControlFile1">
                           </div>
                       </div>
                       <div class="form-group">
                           <div class="label">
                               <label>课程方向：</label>
                           </div>
                           <el-select name="field" v-model="fields" placeholder="请选择">
                               <el-option
                                       v-for="item in field"
                                       :key="item.id"
                                       :label="item.id"
                                       :value="item.name">
                               </el-option>
                           </el-select>
                               <label>类型：</label>
                           <el-select name="type" v-model="types" placeholder="请选择">
                               <el-option
                                       v-for="item in type"
                                       :key="item.id"
                                       :label="item.id"
                                       :value="item.name">
                               </el-option>
                           </el-select>
                               <label>难度：</label>
                           <el-select name="degree" v-model="degrees" placeholder="请选择">
                               <el-option
                                       v-for="item in degree"
                                       :key="item.id"
                                       :label="item.id"
                                       :value="item.name">
                               </el-option>
                           </el-select>
                       </div>
                       <div class="form-group">
                           <div class="label">
                               <label>课程分类：</label>
                           </div>
                           <div style="float:left;width: 900px;">
                               <el-checkbox-group  v-model="checkList" size="mini">
                                   <el-checkbox-button name="category" v-for="v in calist" :label="v" :key="v" :value="v"></el-checkbox-button>
                               </el-checkbox-group>
                           </div>
                       </div>
                       <div class="form-group">
                           <div class="label">
                               <label>课程描述：</label>
                           </div>
                           <div class="field">
                               <textarea type="text" class="input" name="s_desc" style="height:40px;" ></textarea>
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
        name: "addcourse",
        data() {
            return {
                field: [],
                type:[],
                degree:[],
                value: '',
                fields:'',
                types:'',
                degrees:'',
                checkList: [],
                calist:[],
                src:''
            }
        },
        methods:{
            submit:function () {
                fetch('api/add_course',{
                    credentials: "same-origin",
                    method: 'POST',
                    body: new FormData(this.$refs.form)
                }).then(r=>r.json()).then(data=>{
                    this.src = data;
                    if(data == 'ok'){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            }
        },
       mounted(){
           fetch('/api/get_course_info').then(r=>r.json()).then(r=>{
              this.field=r.f_name;
              this.type=r.t_name;
              this.degree=r.d_name;
               r.ca_name.forEach(v=>{
                   this.calist.push(v.name)
               })
           })
       },
        components:{left}
    }
</script>

<style scoped>

</style>