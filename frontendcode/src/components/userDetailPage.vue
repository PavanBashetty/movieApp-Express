<template>
    <headerPageComp />
    <h3 style="text-align:center; ;">User Detail Page</h3>
    <div>
        <p><b>User ID: </b>{{ this.userID }}</p>
        <p><b>Name: </b>{{ this.userName }}</p>
        <p><b>Age: </b>{{ this.userAge }}</p>
        <p><b>Email: </b>{{ this.userEmail }}</p>
        <p><b>Rated Movies (count): </b>{{ this.ratedMovieCount }}</p>
        <p><b>Account Status: </b>{{ this.userCurrentStatus }}</p>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    import headerPageComp from '../components/header.vue';
    export default {
        name: 'userDetailPageComp',
        data() {
            return {
                userID: '',
                userName: '',
                userAge:'',
                userEmail:'',
                userCurrentStatus:'',
                ratedMovieCount: ''
            }
        },
        components: {
            headerPageComp
        },
        mounted() {
            this.loadUserDetails();
        },
        methods: {
            async loadUserDetails() {
                this.userID = localStorage.getItem("user-id");
                await axios.get("/api/userdetails/"+this.userID)
                .then((res)=>{
                    let responseData = res.data.data;
                    //console.log(responseData);
                    this.userName = responseData[0].fullName;
                    this.userAge = responseData[0].age;
                    this.userEmail = responseData[0].email;
                    this.ratedMovieCount = responseData[0].ratedMovies;
                    this.userCurrentStatus = responseData[0].current_status;
                })
                .catch(()=>{
                    console.log("Data could not be retrieved");
                })
            }
        }
    }
    </script>
    
    <style scoped>
    </style>