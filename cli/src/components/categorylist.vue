<template>
    <left :path="'category-list'">
        <el-table
                :data="displayData"
                style="width: 100%">
            <el-table-column
                    label="ID"
                    width="400">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="名称"
                    width="400">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
                        :current-page="pageNumber"
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
        name: "field",
        data() {
            return {
                tableData: [],
                pageNumber:1,
            }
        },
        mounted(){
            fetch('/api/category_list').then(r=>r.json()).then(r=>this.tableData = r)
        },
        methods:{
            change(pageNumber){
                this.pageNumber = pageNumber;
            },
            handleDelete(id) {
                fetch('/api/del_category?cid='+id).then(r=>r.json()).then(r=>{
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