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

export function Browse(props) {

    const MovieCard = () => {

        const Card = styled.div`
            width: 100%;
        `;

        const Movie = styled.img`
            height: 480px;
            border-radius: 10px;
            width: 100%;
            height: auto;
        `;
        return (
            <Card>
                <Link to="/movie/1">
                    <Movie
                        src={moviePoster}></Movie>
                </Link>
            </Card>
        );
    };

    const MovieCardRow = () => {

        const secondaryOptions = {
			type        : 'slide',
			rewind      : true,
			gap         : '1rem',
			pagination  : false,
			fixedWidth  : 500,
			fixedHeight : 700,
			cover       : true,
			focus       : 'center',
			isNavigation: true,
			updateOnMove: true,
		};

        return (
            <div>
                <Splide options={ secondaryOptions }>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 1" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={moviePoster} alt="Image 2" />
                    </SplideSlide>
                </Splide>
            </div>
        );
    }
    // const MovieCardRow = () => {
    //     return (
    //         <Grid container spacing={3}>
    //             <Grid item xs={12} sm={4}>
    //                 <MovieCard />
    //             </Grid>
    //             <Grid item xs={12} sm={4}>
    //                 <MovieCard />
    //             </Grid>
    //             <Grid item xs={12} sm={4}>
    //                 <MovieCard />
    //             </Grid>
    //         </Grid>
    //     );
    // }

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    return (
        <Container>
            {/* app bar */}
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