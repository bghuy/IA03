const db = require('./../config/dbConfig.js')
const pgp = require('pg-promise')({
    capSQL: true
});
const loadDataBase = async (DB) => {
    await db.none(`
    CREATE TABLE IF NOT EXISTS movies (
    id VARCHAR(255),
    "fullTitle" TEXT,
    "boxOffice" TEXT,
    "imDbRating" TEXT,
    image TEXT,
    "plot" TEXT,
    "year" TEXT)`);
    const listMovies = DB.Movies;
    const checkIfExistsQuery = 'SELECT COUNT(*) FROM movies';
    await db.one(checkIfExistsQuery)
        .then(async (result) => {
            const count = +result.count;
            if (count !== listMovies.length) {
                const existingDataQuery = 'SELECT * FROM movies';
                await db.manyOrNone(existingDataQuery)
                    .then((existingData) => {
                        const existingIds = existingData.map((entry) => entry.id);
                        const missingData = listMovies.filter((entry) => !existingIds.includes(entry.id));

                        if (missingData.length > 0) {

                            const desiredAttributes = ['id', 'fullTitle', 'year', 'image', 'plot', 'imDbRating', 'boxOffice'];

                            const filteredData = missingData.map((obj) => {
                                const filteredObj = {};
                                desiredAttributes.forEach((attr) => {
                                    filteredObj[attr] = obj[attr];
                                });
                                return filteredObj;
                            });

                            const insertQuery = pgp.helpers.insert(filteredData, ['id', 'fullTitle', 'year', 'image', 'plot', 'imDbRating', 'boxOffice'], 'movies');

                            return db.none(insertQuery)
                                .then(() => {
                                    console.log('Missing data added to the database.');
                                });
                        } else {
                            console.log('All data from the JSON file already exists in the database.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error occurred during data check:', error);
                    });
            }
        })
        .catch((error) => {
            console.error('Error occurred during data check:', error);
        })
}

const getMovieById = async (movieId) => {
    const movie = await db.oneOrNone('SELECT * FROM movies WHERE id = $1 LIMIT 1', movieId);
    console.log(movie);
    return movie;
}


const getAllMovies = async () => {
    const movies = await db.any('SELECT * FROM movies');
    return movies;
}

module.exports = { loadDataBase, getMovieById, getAllMovies }; 