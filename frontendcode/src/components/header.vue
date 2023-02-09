<template>
<div class="header">
    <h2>Movie App</h2>
    <div class="header-right">
        <button type="button" v-on:click="backToMainPage()">Home</button>
        <button type="button" v-on:click="getRatedMovieListPage()">RatedMovieList</button>
        <button type="button" v-on:click="getUserDetails()">{{userName}}</button>
        <button type="button" v-on:click="logout()">Log out</button>
    </div>
</div>
</template>

<script>
 export default {
     name: 'headerPageComp',
     data() {
         return {
             userName: ''
         }
     },
     methods: {
         logout() {
             localStorage.clear();
             this.$router.push({
                 name: 'loginPage'
             })
         },
         getUserDetails() {
             return this.$router.push({
                 name: 'userDetailPage'
             })
         },
         backToMainPage() {
             return this.$router.push({
                 name: 'landingPage'
             })
         },
         getRatedMovieListPage() {
             return this.$router.push({
                 name: 'ratedMovieListPage'
             })
         }
     },
     mounted() {
         let userInfo = localStorage.getItem("user-name");
         if (userInfo !== null) {
             userInfo = userInfo.substring(1, (userInfo.length - 1));
             this.userName = userInfo
         }
     }
 }
</script>

<style>
.header {
    overflow: hidden;
    background-color: #f1f1f1;
    /* padding: 0px 0px; */
}

.header button {
    float: left;
    color: black;
    text-align: center;
    padding: 5px;
    text-decoration: none;
    font-size: 14px;
    line-height: 15px;
    border-radius: 0px;
}

.header button:hover {
    background-color: #ddd;
    color: black;
}

.header-right {
    float: right;
}

@media screen and (max-width: 500px) {
    .header a {
        float: none;
        display: block;
        text-align: left;
    }

    .header-right {
        float: none;
    }
}

button {
    cursor: pointer;
}
</style>
