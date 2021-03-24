import React, { useEffect, useState } from 'react';
import {
    Link,
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
//Should be array
import moviePoster from "./img/soul_poster.jpg";
import { MovieCreationSharp } from '@material-ui/icons';
import MenuBar from "./components/menuBar";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import LoginModules from './modules/LoginModules';
import MediaModule from './modules/MediaModule';

export function Browse(props) {

    console.log(LoginModules.getUserProfile().uid);

    const [ids, setIds] = useState();
    const [movieCardInfoState, setMovieCardInfoState] = useState([]);
    // const [refresh, setRefresh] = useState(false);



    const getRandomIds = (num) => {
        var ids = [];

        for (var i = 0; i < num; i++) {
            var id = parseInt(Math.random() * 1000);
            id %= 100;
            id++;

            ids.push(id);
        }

        return ids;
    }

    useEffect(() => {
        console.log("useEffect");
        // console.log(ids);

        if (!ids) {
            var random = getRandomIds(10);
            setIds(random);
        } else {
            if (movieCardInfoState.length === 0) {
                for (var i in ids) {
                    MediaModule.getMoviePoster(ids[i]).then((url) => {
                        // console.log(url);
                        for (var j in ids) {
                            if (url.includes(ids[j] + ".jpg")) {
                                // console.log(ids[j], url);
                                var movieCardInfo = movieCardInfoState;
                                movieCardInfo.push({ id: ids[j], url: url });
                                setMovieCardInfoState([...movieCardInfo]);
                            }
                        }
                    }).catch((e) => {
                        // console.log("no url");
                    });
                }
            }
            //     console.log(movieCardInfoState);
            //     // setRefresh(refresh);
            // }
        }


    }, [ids, movieCardInfoState]);

    const MovieCardRow = () => {

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

        const showMovieCards = () => {
            // var ids = getRandomIds(10);

            // console.log();
            // console.log(movieCardInfoState);


            var res = movieCardInfoState.map((info) => (
                <MovieCard id={info.id} img={info.url} />
            ));

            return res;
        }

        return (
            <div>
                <Splide options={Options}>
                    {/* <MovieCard id="1" img={moviePoster} />
                    <MovieCard id="2" img={moviePoster} />
                    <MovieCard id="3" img={moviePoster} />
                    <MovieCard id="4" img={moviePoster} />
                    <MovieCard id="5" img={moviePoster} />
                    <MovieCard id="6" img={moviePoster} />
                    <MovieCard id="7" img={moviePoster} />
                    <MovieCard id="8" img={moviePoster} />
                    <MovieCard id="9" img={moviePoster} /> */}
                    {showMovieCards()}
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
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Action</h3>
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Animation</h3>
                    <MovieCardRow />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Browse;