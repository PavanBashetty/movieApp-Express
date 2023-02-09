<template>
    <div style="background-color:beige; padding: 1px">
    <h1 style="text-align:center">About Us</h1>
</div>
<p style="text-align:center; font-size:larger">
    This is a demp movie app developed using Vue, Express, MySQL
</p>
<hr />
<button class="back" type="button" v-on:click="homePage()">Back</button>
</template>

<script>
export default{
name: 'aboutUsComp',
methods:{
    homePage(){
        return this.$router.push({
            name:'homePage'
        })
    }
},
mounted(){
    let user = localStorage.getItem("user-name");
    if(user){
        return this.$router.push({
            name:'landingPage'
        })
    }
}, 
}
</script>

<style scoped>
.back{
background-color: rgb(120, 113, 126);
border:1px;
color: white;
padding: 10px 22px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
position: absolute;
top: 80%;
left: 46%;
}
</style>