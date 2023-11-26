
const path = require('path');
require('dotenv')
const fs = require('fs')
const DB = JSON.parse(fs.readFileSync(path.join(__dirname, `./../../data/${process.env.JSON_FILE}`)))
const { loadDataBase, getMovieById, getAllMovies } = require('./../services/queryDB.js')
const { renderTopRating, renderTopBoxOffice } = require('./../services/homePageServices.js')
const { getMoviesBySearch, renderSearchPage, renderPagination } = require('../services/searchPageServices.js');
const { json } = require('express');
const getHomePage = async (req, res) => {
    await loadDataBase(DB);
    let topRatingContent = renderTopRating(DB);
    let topBoxOfficeContent = renderTopBoxOffice(DB);
    // console.log(topRatingContent);
    return res.render('index.html', {
        view: "home",
        params: {
            topRating: topRatingContent,
            topBoxOffice: topBoxOfficeContent
        }
    });
}
const getDetailPage = async (req, res) => {
    const userId = req.params.id;
    const movie = await getMovieById(userId);
    return res.render('detail.html', {
        view: "detail",
        params: {
            movieImage: movie.image,
            movieFullTitle: movie.fullTitle,
            moviePlot: movie.plot,
            movieYear: movie.year,
            movieImDbRating: movie.imDbRating
        }
    });
}
const postSearchPage = async (req, res) => {

    const page = req.params.page;
    const searchValueString = req.body;
    const movies = await getAllMovies();
    console.log(searchValueString.searchValue);
    const searchMovies = getMoviesBySearch(movies, searchValueString.searchValue);
    const paginationContent = renderPagination(Math.ceil(searchMovies.length / 8), parseInt(page), searchMovies);
    return res.render('search.html', {
        view: "search",
        params: {
            searchResult: searchMovies,
            pagination: paginationContent

        }
    });
}
module.exports = { getHomePage, getDetailPage, postSearchPage };