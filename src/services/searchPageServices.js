
const getMoviesBySearch = (movies, searchValue) => {
    const lowerSearchString = searchValue.toLowerCase();
    const result = movies.filter((movie) => {
        return movie.fullTitle.toLowerCase().includes(lowerSearchString);
    })
    return result;
}
const renderPagination = (totalPages, activePage, searchMovies) => {
    if (totalPages <= 0) {
        return '';
    }
    // Bắt đầu chuỗi HTML với thẻ ul
    let movieHTML = `<div style="display:flex;flex-wrap:wrap">`
    const currentPage = activePage;
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    searchMovies.forEach((element, index) => {
        let display = "none";
        if (index >= startIndex && index < endIndex) {
            display = "inline";
        }
        const card = `
        <a href="/detail/${element.id}" class="cardItem" style="display:${display}">
        <div class="card" style="width: 18rem; margin: 20px 5px">
      <img src="${element.image}" class="card-img-top" alt="..." style="height:300px" />
      <div class="card-body">
        <h5 class="card-title" style="text-align: center">
          ${element.fullTitle}
        </h5>
      </div>
    </div>
    </a>
        `
        movieHTML += card;
    });
    movieHTML += '</div>'

    let paginationHTML = '<nav aria-label="Page navigation example" style="margin: 10px auto"><ul class="pagination">';

    // Tạo các thẻ li và a tương ứng với số trang
    for (let i = 1; i <= totalPages; i++) {
        let active = "";
        if (i === activePage) {
            active = 'active';
        }
        paginationHTML += `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`;
    }

    // Đóng thẻ ul và nav
    paginationHTML += '</ul></nav>';

    return movieHTML + paginationHTML;
}

module.exports = { getMoviesBySearch, renderPagination };