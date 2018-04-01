<template>
        <left :path="'course-list'">
            <el-table
                    :data="displayData"
                    style="width: 100%">
                <el-table-column
                    label="ID"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
                </el-table-column>
                <el-table-column
                        label="标题"
                        width="260">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>描述: {{ scope.row.description }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.title }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        label="浏览量"
                        width="100">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.view_count }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="地址"
                        width="400">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.pic }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Time"
                        width="260">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
           <div class="pagelist">
               <div class="block">
                   <el-pagination
                           background
                           layout="prev, pager, next"
                           :total="total"
                           :page-size=8
                           @current-change="change">
                   </el-pagination>
               </div>
           </div>
        </left>
</template>

<script>
    import left from './left'
    export default {
        name: "courselist",
        data() {
            return {
                tableData: [],
                pageNumber:1
            }
        },
        mounted(){
          fetch('/api/course_list').then(r=>r.json()).then(r=>this.tableData = r)
        },
        methods:{
          change(pageNumber){
              this.pageNumber = pageNumber;
          },
            handleDelete(id) {
               fetch('/api/del_course?cid='+id).then(r=>r.json()).then(r=>{
                   if(r=='ok'){
                       this.$message.success('删除成功')
                   }
               })
            }
        },
       computed:{
         total(){
             return this.tableData.length
         },
           displayData(){
             let start  = (this.pageNumber-1)*8;
             let end = (this.pageNumber*8);
             return this.tableData.slice(start,end);
           }
       },
        components:{left}
    }
</script>

<style scoped>

</style>