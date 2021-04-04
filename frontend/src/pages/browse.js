import React, { useEffect, useState } from 'react';
import {
    Link,
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import MediaModule from './modules/MediaModule';
import BrowsingModules from './modules/BrowsingModules';

export function Browse(props) {

    const [row1Movie, setRow1Movie] = useState([]);
    const [row2Movie, setRow2Movie] = useState([]);
    const [row3Movie, setRow3Movie] = useState([]);

    // const getRandomIds = (num) => {
    //     var ids = [];

    //     for (var i = 0; i < num; i++) {
    //         var id = parseInt(Math.random() * 1000);
    //         id %= 100;
    //         id++;

    //         ids.push(id);
    //     }

    //     return ids;
    // }

    // useEffect(() => {

    //     console.log(LoginModules.getUserProfile().uid);

    //     if (!ids) {
    //         var random = getRandomIds(10);
    //         setIds(random);
    //     } else {
    //         if (movieCardInfoState.length === 0) {
    //             for (var i in ids) {
    //                 MediaModule.getMoviePoster(ids[i]).then((url) => {
    //                     for (var j in ids) {
    //                         if (url.includes("%2F" + ids[j] + ".jpg")) {
    //                             var movieCardInfo = movieCardInfoState;
    //                             movieCardInfo.push({ id: ids[j], url: url });
    //                             setMovieCardInfoState([...movieCardInfo]);
    //                         }
    //                     }
    //                 });
    //             }
    //         }
    //     }
    // }, [ids, movieCardInfoState]);

    useEffect(() => {
        BrowsingModules.suggestMovie().then((movies) => {
            // console.log(movies);
            movies.forEach((movie) => {
                if (movie) {
                    MediaModule.getMoviePoster(movie.id).then((url) => {
                        if (url.includes("%2F" + movie.id + ".jpg")) {
                            var movieCardInfo = row1Movie;
                            movieCardInfo.push({ id: movie.id, url: url });
                            setRow1Movie([...movieCardInfo]);
                        }
                    });
                }
            });
        });
        BrowsingModules.suggestMovie().then((movies) => {
            // console.log(movies);
            movies.forEach((movie) => {
                if (movie) {
                    MediaModule.getMoviePoster(movie.id).then((url) => {
                        if (url.includes("%2F" + movie.id + ".jpg")) {
                            var movieCardInfo = row2Movie;
                            movieCardInfo.push({ id: movie.id, url: url });
                            setRow2Movie([...movieCardInfo]);
                        }
                    });
                }
            });
        });
        BrowsingModules.suggestMovie().then((movies) => {
            // console.log(movies);
            movies.forEach((movie) => {
                if (movie) {
                    MediaModule.getMoviePoster(movie.id).then((url) => {
                        if (url.includes("%2F" + movie.id + ".jpg")) {
                            var movieCardInfo = row3Movie;
                            movieCardInfo.push({ id: movie.id, url: url });
                            setRow3Movie([...movieCardInfo]);
                        }
                    });
                }
            });
        });
    }, []);

    const MovieCardRow = (props) => {

        var row = props.row;

        const Options = {
            type: 'slide',
            rewind: false,
            gap: '1rem',
            pagination: false,
            fixedWidth: 400,
            fixedHeight: 600,
            cover: true,
            focus: 'right',
            isNavigation: false,
            updateOnMove: true,
            lazyLoad: 'nearby'
        };

        const MovieCard = (props) => {

            const link = "/movie/" + props.id;
            const img = props.img;

            const MoviePoster = styled.img`
                border-radius: 16px;
            `;

            return (
                <SplideSlide>
                    <Link to={link}>
                        <MoviePoster
                            src={img}
                            alt="Image 1"
                            height="100%"
                            width="100%"
                        />
                    </Link>
                </SplideSlide>
            );
        }

        const showMovieCards = (row) => {
            var movies;

            if (row === 1) {
                movies = row1Movie;
            } else if (row === 2) {
                movies = row2Movie;
            } else if (row === 3) {
                movies = row3Movie;
            }

            var res = movies.map((info) => (
                <MovieCard id={info.id} img={info.url} />
            ));

            return res;
        }

        return (
            <div>
                <Splide options={Options}>
                    {showMovieCards(row)}
                </Splide>
            </div>
        );
    };

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={0}>

                <Grid item xs={12}>
                    <h2>Movies</h2>
                </Grid>

                <Grid item xs={12}>
                    <h3>Top Rated</h3>
                    <MovieCardRow row={1} />
                </Grid>

                <Grid item xs={12}>
                    <h3>Action</h3>
                    <MovieCardRow row={2} />
                </Grid>

                <Grid item xs={12}>
                    <h3>Animation</h3>
                    <MovieCardRow row={3} />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Browse;