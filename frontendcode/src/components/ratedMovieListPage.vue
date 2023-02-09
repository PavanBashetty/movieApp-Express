<template>
<headerPageComp />
<h2 style="text-align:center; color: rebeccapurple;">Rated Movies List</h2>
<table style="width:60%">
    <thead>
        <tr>
            <th>Movie Name</th>
            <th>Rating</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(ratedMovie, i) in ratedMoviesList" :key="i">
            <td>{{ ratedMovie.movie_name }}</td>
            <td>{{ ratedMovie.rating }}</td>
            <td><button type="button" class="deleteButton" v-on:click="deleteRating(ratedMovie.movie_name)"> Delete </button></td>
        </tr>
    </tbody>
</table>
</template>

    
<script>
import axios from 'axios';
import headerPageComp from '../components/header.vue';

export default {
    name: 'ratedMovieListPageComp',
    data() {
        return {
            userID: '',
            ratedMoviesList: {}
        }
    },
    components: {
        headerPageComp
    },
    mounted() {
        this.getRatedMovieList();
    },
    methods: {
        async getRatedMovieList() {
            this.userID = localStorage.getItem("user-id");
            await axios.get("/api/ratedMovies/" + this.userID)
                .then((res) => {
                    this.ratedMoviesList = res.data.data;

                })
                .catch(() => {
                    console.log("Data could not be retreived");
                })
        },
        deleteRating(movieName) {
            axios.delete("/api/deleterating/" + movieName + "/" + this.userID)
                .then((res) => {
                    if (res.data.msg == "Movie rating deleted") {
                        alert(`Deleted ${movieName} rating`);
                        this.getRatedMovieList();
                    } else {
                        alert(`${movieName} rating could not deleted, please try later`)
                    }
                }).catch(() => {
                    alert("Server issue, please try later")
                })
        }
    }
}
</script>

    
<style scoped>
tbody {
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
}

table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
}

th,
td {
    padding: 15px;
}

th {
    background-color: #04AA6D;
    color: white;
}

.deleteButton {
    text-align: center;
    cursor: pointer;
    background-color: #f44336;
}
</style>
