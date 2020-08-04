let movieApp = Vue.component('movieApp', {
    template: `
    
<div class="container mt-3">
<div class="d-flex justify-content-center">
    <h1>{{title}} {{language}} <i class="fas fa-film text-info"></i></h1>
</div>

<div class="row">
    <div class="col-8">
        <SearchComponent ref="search" :laguage="laguage" v-model="searchMovies" ></SearchComponent>
    </div>
    <h3>Idioma</h3>
    <br>
    {{$store.state.language}}
    <div class="col-1 ml-6">
        <button type="submit" :class="{' btn-info': opc==1}" class="btn" @click="changeLanguage('es-ES',1),$store.commit('change','Español')">
            <img src="img/spain.png" alt="">
        </button>
    </div>
    <div class="col-1 ml-6">
        <button type="submit" :class="{' btn-info': opc==2}" class="btn" @click="changeLanguage('en-US',2),$store.commit('change','English')">
            <img src="img/uk.png" alt="">
        </button>
    </div>
</div>
<div v-show="!Object.keys(searchMovies).length ">
    <div class="d-flex justify-content-center">
        <h2>Peliculas mas populares </h2>
    </div>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-md-4" v-for="movie  in movies">
                <movieComponent :movie="movie" :laguage="laguage">
                </movieComponent>

            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">

            <li class="page-item" :class="{'disabled': page == 1}">
                <a class="page-link" href="#" aria-label="Previous" @click="changePage(page-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item" v-for="(n,key) in first" :class="{'active': page==n}">
                <a class="page-link" href="#" @click="changePage(n)"> {{n}}</a>
            </li>
            <li class="page-item">
                <a class="page-link">...</a>
            </li>

            <li class="page-item" :class="{'disabled': page == total_pages}">
                <a class="page-link" href="#" aria-label="Next" @click="changePage(page+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>

        </ul>
    </nav>
</div>

<!!----------busqueda----------------------------------->
<div v-show="Object.keys(searchMovies).length ">    
    <div class="d-flex justify-content-center">
        <h2>Resultados de la busqueda </h2>
    </div>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-md-4" v-for="movie  in searchMovies.results">
                <movieComponent :movie="movie" :laguage="laguage" >
                </movieComponent>

            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">

            <li class="page-item" :class="{'disabled': searchMovies.page == 1}">
                <a class="page-link" href="#" aria-label="Previous" @click="$refs.search.changePageSearch(pageSearch-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item" v-for="(n,key) in searchMovies.total_pages" :class="{'active': pageSearch==n}">
                <a class="page-link" href="#" @click="$refs.search.changePageSearch(n)"> {{n}}</a>
            </li>

            <li class="page-item" :class="{'disabled': pageSearch == searchMovies.total_pages}">
                <a class="page-link" href="#" aria-label="Next" @click="$refs.search.changePageSearch(pageSearch+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>

        </ul>
    </nav>
</div>
</div>
    `,
    components: {
        movieComponent,
        SearchComponent
    },
    data() {
        return {
            movies: [],
            searchMovies: {},
            page: 1,
            total_pages: null,
            laguage: 'es-ES',
            opc: 1,
            pageSearch: 1
        }
    },
    methods: {
        getPopularMovies() {
            // const url = `${UrlBase}discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=${this.page}`;
            let url = `${UrlBase}discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&language=${this.laguage}&page=${this.page}`;
            fetch(url)
                .then(response => response.json())
                .then(({ results, page, total_pages }) => {
                    this.total_pages = total_pages
                    this.movies = results.map(m => {
                        // m.backdrop_path = `https://image.tmdb.org/t/p/w1400_and_h450_face/${m.backdrop_path}`
                        m.like = false
                        return m;
                    })
                })
        },
        changePage(n) {
            this.page = n;
            this.getPopularMovies();
        },
        changeLanguage(laguage, opc) {
            this.laguage = laguage;
            this.opc = opc;
            this.getPopularMovies();
            // this.changeAppLanguage('payload') puede acceder al mapeo de la mutacion definida abajo
            // this.$store.commit('change', laguage) pasar el mutador desde algun metodo
            // this.$store.state acceder a algun elemento de nuestro vuex

        },
    },
    computed: {
        first() {
            let index = (this.page > 2 ? this.page - 1 : this.page)
            let limit = (this.page > 2 ? this.page + 9 : this.page + 10)
            let first = []
            for (index; index < limit; index++) {
                first.push(index);
            }
            return first;
        },
        title() {
            if (this.laguage == 'es-ES') {
                return 'Aplicación de peliculas'
            } else {
                return 'Movies Aplication'
            }
        },
        ...Vuex.mapState(['language']), //se puede mapear el state con ... para no acceder al sotore y se llama solo con el nombre de la variable
        ...Vuex.mapMutations({ //se pueden mapear las mutations y colocar un nombre mas explicito
            changeAppLanguage: 'change'
        })
    },
    mounted() {
        this.getPopularMovies();
        // this.pageSearch = this.$refs.search.page;
    },
})