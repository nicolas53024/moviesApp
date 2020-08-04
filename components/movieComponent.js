let movieComponent = {
    template: `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top" :src="movie.backdrop_path | coverUrl" :alt="movie.backdrop_path">
    <div class="card-body">
      <h5 class="card-title">{{movie.title}}</h5>
      <p class="card-text"  >{{movie.overview | limitWords}}</p>
        <router-link :to="{name:'detalle', params:{ id:movie.id,laguage } }">
        <a href="#" class="btn btn-sm btn-success">{{laguage | btnText}}</a>
        </router-link>
      <p class="float-right"> {{laguage | avr}} <b>{{movie.vote_average}}</b></p>
    </div>
  </div>
    `,
    props: {
        movie: {
            type: Object,
        },
        laguage: {
            type: String
        }

    },
    created() {
        // console.log(this.laguage);
    },
    filters: {
        limitWords: function(value) {
            if (value.length > 60) {
                return value.substring(0, 70) + '...'
            } else if (!value) {
                return 'No hay una reseña por el momento'
            } else {
                return value
            }
        },
        avr: function(value) {
            if (value == 'es-ES') {
                return 'Aceptacion'
            } else {
                return 'Popularity'
            }
        },
        btnText: function(value) {
            if (value == 'es-ES') {
                return 'Ver detalles'
            } else {
                return 'Show Details'
            }
        }
    }
}