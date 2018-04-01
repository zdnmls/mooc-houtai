<template>
    <div>
        <div>this is login in</div>
        <div>
            <span>用户</span>
            <span>{{user}}</span>
        </div>
        <router-link :to="{name:'HelloWord',query:{id:1}}">
            enter
        </router-link>
        <div v-for="v in userdata" :key="v.id">
            <span>{{v.name}}</span>
            <a href="" v-on:click.prevent="del(v.id)">删除</a>
        </div>
        <div>{{message}}</div>
    </div>
</template>
<script>
    export default {
        name: "login",
        props:['message'],
        data:function () {
            return{
                userdata:[{id:1,name:'user1'},{id:2,name:'user2'}]
            }
        },
        methods:{
            del:function (i) {
              this.userdata =  this.userdata.filter(v=>v.id != i)
                // localStorage.list=JSON.parse(localStorage).filter(v=>v.id !=i)
            }
        },
        mounted:function () {
            this.userdata = JSON.parse(localStorage.list)
            localStorage.list = JSON.stringify(this.userdata)
        },
        computed:{
           user:function () {
           return this.userdata.map(v=>v.name).join('-')
           }
        },
        watch:{
            userdata:function () {
                localStorage.list = JSON.stringify(this.userdata)
            }
        }
    }
</script>

<style scoped>

</style>