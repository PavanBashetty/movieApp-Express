<template>
<div style="background-color:beige; padding: 10px">
    <h1 style="text-align:center">Welcome to Movie App</h1>
</div>

<div>
    <button class="signup" type="button" v-on:click="signUpPage()"><b>SignUp</b></button><br />
    <button class="login" type="button" v-on:click="loginPage()"><b>Login</b></button><br />
</div>

<footer>
    <button type="button" v-on:click="aboutUs()">About Us</button>
</footer>
</template>

<script>
export default {
    name: 'homePageComp',
    mounted() {
        let user = localStorage.getItem("user-name");
        if (user) {
            return this.$router.push({
                name: 'landingPage'
            })
        }
    },
    methods: {
        loginPage() {
            return this.$router.push({
                name: 'loginPage'
            })
        },
        signUpPage() {
            return this.$router.push({
                path: '/signup'
            })
        },
        aboutUs() {
            return this.$router.push({
                name: 'aboutUsPage'
            })
        }
    }
}
</script>

<style scoped>
footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 10px;
    background-color: DarkSalmon;
    color: white;
}
.signup, .login{
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
    top: 25%;
    left: 46%;
}
.login{
    top: 35%;
    left: 46%;
}
</style>
