const renderTopRating = (DB) => {
    let listMovies = DB.Movies;
    let result = "";
    listMovies = listMovies.filter((movie) => {
        if (parseFloat(movie.imDbRating)) {
            return movie
        }
    })

    listMovies.sort(function (a, b) { return parseFloat(b.imDbRating) - parseFloat(a.imDbRating) })
    let len = listMovies.length >= 5 ? 5 : listMovies.length
    for (let i = 0; i < len; i++) {
        let active = "active";
        if (i != 0) {
            active = "";
        }
        let card = `
        <div class="carousel-item ${active}">
        <a href="/detail/${listMovies[i].id}">
        <img
          src="${listMovies[i].image}"
          class="d-block mx-auto"
          style="width: 400px; height: 600px"
          alt="..."

        />
        </a>
        
      </div>`
        result += card;
    }
    // listMovies.forEach(element => {
    //     console.log("title: ", element.fullTitle, "imdb: ", element.imDbRating)
    // });
    return result;
}

const renderTopBoxOffice = (DB) => {
    let listMovies = DB.Movies;
    let result = "";
    listMovies = listMovies.filter((movie) => {
        if (parseFloat(movie.boxOffice.replace(/[^0-9.-]/g, ''))) {
            return movie
        }
    })
    listMovies.sort(function (a, b) { return parseFloat(b.boxOffice.replace(/[^0-9.-]/g, '')) - parseFloat(a.boxOffice.replace(/[^0-9.-]/g, '')) })
    let len = listMovies.length >= 30 ? 30 : listMovies.length
    for (let i = 0; i < len; i += 3) {
        let active = "active";
        if (i != 0) {
            active = "";
        }
        let card = ` 
        <div class="carousel-item ${active}">
        <div class="d-flex gap-2 justify-content-center">`
        for (let j = i; j < i + 3; j++) {
            if (listMovies[j]) {
                card += `
                <a href="/detail/${listMovies[j].id}">
                <img
                src="${listMovies[j].image}"
                class="d-block"
                style="width: 300px; height: 400px"
                alt="..."
                />
                </a>
              `
            }
        }
        card += `
        </div>
        </div>`
        result += card;
    }
    // console.log(result);
    return result;
}
module.exports = { renderTopRating, renderTopBoxOffice }