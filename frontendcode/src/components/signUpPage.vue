<template>
    <div style="background-color:beige; padding: 1px">
        <h1 style="text-align:center">Sign Up Page</h1>
    </div>

<div class="form-center">
    
    <input type="text" placeholder="Enter Full Name" id="fullName" v-model="fullName" /><br /><br />
    <input type="number" placeholder="Enter Age" id="age" v-model="age" /><br /><br />
    <input type="email" placeholder="Enter Email ID" id="email" v-model="email" /><br /><br />
    <input type="text" placeholder="Enter Password" id="password" v-model="password" /><br /><br />
    <button class="submit" type="button" v-on:click="submitData()">Submit</button>
</div>

<div>
    <button class="back" type="button" v-on:click="homePage()">Back</button>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'signUpPageComp',
    data() {
        return {
            fullName: '',
            age: '',
            email: '',
            password: ''
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
    methods: {
        async submitData() {
            await axios.post("/api/signupcred", {
                fullName: this.fullName,
                age: this.age,
                email: this.email,
                password: this.password

            }).then((res) => {
                if (res.data.msg == "user registered successfully") {
                    alert("Registration successful!!");
                    this.$router.push({
                        name:'loginPage'
                    })
                } else {
                    alert("Registration did not happen, please try again!");
                    this.fullName = '',
                        this.age = '',
                        this.email = '',
                        this.password = ''
                }
            }).catch(() => {
                alert("Something else went wrong,try again");
                this.fullName = '',
                    this.age = '',
                    this.email = '',
                    this.password = ''
            })
        },
        homePage(){
            return this.$router.push({
                name:'homePage'
            })
        }
    }
}
</script>

<style scoped>
.form-center{
   text-align: center;
   font-size: large;
   padding-top: 40px;
}
input{
    width: 20%;
    padding: 12px 20px;
    border: 1px solid #ccc;
}
.submit, .back{
    background-color: blueviolet;
    border:1px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    position: absolute;
    top: 60%;
    left: 46%;
}
.back{
    background-color: rgb(120, 113, 126);
    padding: 10px 22px;
    top: 80%;
    left: 46%;
}
</style>