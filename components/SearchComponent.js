let SearchComponent = {
    template: `
        <div>
        <form action=""  @submit.prevent="search">
         <a href="#" @click="reset()" v-show="query">
         <i class="fas fa-window-close float-left text-danger fa-2x" ></i>
         </a>   
        <input type="text" class="form-control mb-2 col-5 ml-5"  placeholder="palabra clave"  v-model="query">
        <button type="submit" class="btn btn-success mb-2 col-6"><i class="fas fa-search"></i> buscar</button>
        </form>
        </div>
    
    `,
    props: {
        laguage: {
            type: String,
            default: 'es-ES'
        },

    },
    data() {
        return {
            query: '',
            page: 1
        }
    },
    methods: {
        reset() {
            this.query = ''
            this.$parent.pageSearch = 1;
            this.page = 1;
            this.$emit('input', this.query)
        },
        search() {
            if (this.query) {
                const url = `${UrlBase}search/movie?api_key=${APIKEY}&language=${this.laguage}&query=${this.query}&page=${this.page}`;
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        this.$emit('input', data)

                    })
            }
        },
        changePageSearch(n) {
            this.page = n;
            this.$parent.pageSearch = n;
            this.search();
        }

    },
    watch: {
        laguage() {
            if (this.query) {
                this.search();
            }
        },

    },
}