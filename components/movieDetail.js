let movieDetail = {
    name: 'movieDetail',
    template: `<div v-if="Object.keys(movie).length">
                   
    <div class="heroMovie text-white py-5" :style="{
        'background': 'linear-gradient(rgba(59, 168, 119, 0.45), rgba(59, 168, 119, 1)),url(https://image.tmdb.org/t/p/w1400_and_h450_face'+movie.backdrop_path+')',
        'background-size': 'cover'
    }">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 col-md-4 col-lg-3">
                <img :src="movie.poster_path  | coverUrl " class="w-100" />
                </div>
                <div class="col-12 col-md-8 col-lg-9">
                    <h2>Detalles: {{ movie.title }}</h2>
                    <p v-text="movie.overview">
                    </p>
                </div>
            </div>
        </div>
    </div>
    
</div>`,
    data() {
        return {
            movie: {

            }
        }
    },
    created() {
        this.getMovie()
    },
    methods: {
        getMovie() {
            fetch(`${this.apiBaseURL}movie/${this.$route.params.id}${this.apiConfig}&language=${this.$route.params.laguage}`)
                .then(res => res.json())
                .then(data => {
                    this.movie = data
                })
        }
    },
    computed: {
        path() {
            return 'https://image.tmdb.org/t/p/w1400_and_h450_face' + this.movie.backdrop_path
        }
    },
}