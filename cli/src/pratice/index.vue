<template>
    <div>
        <heads state="index">
           <div style="color:#fff;font-size:20px;text-align: center" class="ml-3 bg-dark">this is index</div>
            <form  ref="form" @submit.prevent="submit" class="ml-3">
                <div class="form-group">
                    <label for="exampleFormControlFile1">Example file input</label>
                    <input name="pic" type="file" class="form-control-file" id="exampleFormControlFile1">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            <img v-if="src" :src="src" alt="">
        </heads>
    </div>
</template>

<script>
    import heads from  './header.vue'
    export default {
        name: "index",
        data:function () {
           return{
            src:''
           }

        },
        methods:{
          submit:function () {
              fetch('api/file',{
                  credentials: "same-origin",
                  method: 'POST',
                  body: new FormData(this.$refs.form)
              }).then(r=>r.json()).then(data=>{
                  this.src = data;
              })
          }
        },
        components:{heads}
    }
</script>

<style scoped>

</style>