<template>
<headerPageComp />
<h1 style="color:blue; text-align:center">Movie Details:</h1>
<h2 style="text-align:center">{{ data.Title }}</h2>
<hr />
<div>
    <img width="200" height="300" :src="data.Poster" alt="movie poster" style="float:right" />
    <p><b>Duration: </b>{{ data.Runtime }}</p>
    <p><b>Ratings: </b>{{ data.imdbRating }}</p>
    <p><b>Released: </b>{{ data.Released }}</p>
    <p><b>Genre: </b>{{ data.Genre }}</p>
    <p><b>Language: </b>{{ data.Language }}</p>
</div>
<br /><br />
<div>
    <p><b>Description: </b><br />{{ data.Plot }}</p>
    <p><b>Cast and Crew: </b></p>
    <p><b>Director: </b>{{ data.Director }}<br />
        <b>Writer: </b>{{ data.Writer }}<br />
        <b>Actors: </b>{{ data.Actors }}
    </p>
</div>
<hr />
<div>
    <h3 style="color:red">Watched this Movie?</h3>
    <label for="movieRating">Please rate it: </label>
    <select id="movieRating" ref="select" v-model="movieRating">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
    </select>
</div>
<br />
</template>

<script>
import headerPageComp from '../components/header.vue';
import axios from 'axios';
import api from '@/api.js';
import {
    useRoute
} from 'vue-router';
export default {
    name: 'movieDetailsPageComp',
    data() {
        return {
            data: '',
            route: useRoute(),
            movieID: '',
            movieRating: '',
            user: ''
        }
    },
    components: {
        headerPageComp
    },
    mounted() {
        this.user = localStorage.getItem("user-name");
        if (!this.user) {
            return this.$router.push({
                name: 'homePage'
            })
        }
        this.getMovieDetails();
    },
    updated() {
        this.$refs.select.addEventListener("change", this.addMovieRating);
    },
    methods: {
        async getMovieDetails() {
            await axios.get(`https://www.omdbapi.com/?i=${this.route.params.movieID}&apikey=${api.apikey}&plot=full`)
                .then(response => this.data = response.data);
        },
        addMovieRating() {
            //alert("Given rating is " + this.user.substring(1, (this.user.length-1)));
            axios.post("/api/addrating", {
                rating: this.movieRating,
                movie_name: this.data.Title,
                user_id: localStorage.getItem("user-id"),
                fullName: this.user.substring(1, (this.user.length - 1))
            }).then((res) => {
                if (res.data.msg == "Rating added in the database") {
                    alert("Rating added successfully!");
                } else if (res.data.msg == "Rating updated in the database") {
                    alert("Rating updated successfully");
                } else {
                    alert("Rating could not be added");
                }
            }).catch(() => {
                alert("Something else went wrong, please try later");
                this.movieRating = ''
            })
        }
    }
}
</script>

<style scoped>
b {
    color: blue;
}
</style>
