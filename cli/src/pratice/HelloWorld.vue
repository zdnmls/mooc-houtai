<template>
  <div class="hello">
    <h1>{{ msg }}{{ this.$route.query.id}}</h1>
    <div v-for="(v,i) in pageDate">
      <router-link  :to="{ name: 'Video', params: {'video':'video'+v}}">
        {{v}}
      </router-link>
    </div>
    <login :message="fromfather"></login>
    <div v-once v-html="aa"></div>
    <input type="text" v-model="aa">
    <span v-pre>{{hello world}}</span>
  </div>
</template>

<script>
  import login from './Login'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome user',
      pageDate:'',
        fromfather:'hello son',
        aa:'bb'
    }
  },
    mounted:function () {
        fetch('/api/data').then(r=>r.json()).then(data=>{
            this.pageDate =  data;
        })
    },
    components:{login}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
