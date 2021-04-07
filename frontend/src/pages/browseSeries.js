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

export function BrowseSeries(props) {

    const [row1Movie, setRow1Movie] = useState([]);


    useEffect(() => {
        BrowsingModules.suggestSeries().then((allSeries) => {
            console.log("allSeries", allSeries);
            allSeries.forEach((series) => {
                if (series) {
                    MediaModule.getSeriesPoster(series.id).then((url) => {
                        console.log("url", url);
                        if (url.includes("%2F" + series.id + ".jpg")) {
                            var movieCardInfo = row1Movie;
                            movieCardInfo.push({ id: series.id, url: url });
                            setRow1Movie([...movieCardInfo]);
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
            lazyLoad: 'nearby',
            loop: true,
        };

        const SeriesCard = (props) => {

            const link = "/series/" + props.id;
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
            }

            var res = movies.map((info) => (
                <SeriesCard id={info.id} img={info.url} />
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
                    <h2>Series</h2>
                </Grid>

                <Grid item xs={12}>
                    <h3>Top Rated</h3>
                    <MovieCardRow row={1} />
                </Grid>

            </Grid>
        </Container>
    );
}

export default BrowseSeries;