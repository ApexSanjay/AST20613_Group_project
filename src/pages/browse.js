import React from 'react';
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

export function Browse(props) {



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

        return (
            <div>
                <Splide options={Options}>
                    <MovieCard id="1" img={moviePoster} />
                    <MovieCard id="2" img={moviePoster} />
                    <MovieCard id="3" img={moviePoster} />
                    <MovieCard id="4" img={moviePoster} />
                    <MovieCard id="5" img={moviePoster} />
                    <MovieCard id="6" img={moviePoster} />
                    <MovieCard id="7" img={moviePoster} />
                    <MovieCard id="8" img={moviePoster} />
                    <MovieCard id="9" img={moviePoster} />
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