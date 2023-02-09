<template>
<headerPageComp />
<div style="background-color:bisque">

    <div style="background-color:antiquewhite">
        <h1 style="text-align:center">Welcome to Movie Database</h1>
        <br /><br />

        <div class="text-center">
            <input type="text" class="search" placeholder="Enter a movie name...." v-model="search" /><br />
            <button type="button" v-on:click="searchMovies()">submit</button>
        </div>

        <br /><br />

    </div>

    <div class="container">
        <div v-for="(movie, i) in movies" :key="i">
            <router-link :to="'/detail/'+movie.imdbID">
                <img :src="movie.Poster" alt="movie poster" />
                <h3>{{ movie.Title }}</h3>
            </router-link>
        </div>
    </div>
</div>
</template>

    
<script>
import headerPageComp from '../components/header.vue';
import api from '@/api.js';


export default {
    name: 'langingPageComp',
    data() {
        return {
            search: '',
            movies: []
        }
    },
    components: {
        headerPageComp
    },
    mounted() {
        let user = localStorage.getItem("user-name");
        if (!user) {
            return this.$router.push({
                name: 'homePage'
            })
        }
    },
    methods: {
        async searchMovies() {
            if (this.search != '') {
                await fetch(`https://www.omdbapi.com/?s=${this.search}&apikey=${api.apikey}`)
                    .then(response => response.json())
                    .then(data => {
                        this.movies = data.Search;
                        this.search = '';
                    })
            } else {
                alert("Enter a movie name");
            }
        }
    }
}
</script>

    
<style scoped>
.search {
    border: 1px solid grey;
    border-radius: 5px;
    height: 40px;
    width: 60%;
    padding: 2px 23px 2px 30px;
    outline: 0;
    background-color: #f5f5f5;
}

.text-center {
    text-align: center;
}

button {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px 8px;
}
</style>
