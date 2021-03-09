import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import backgroundImage from "./img/home_background.jpg";

export function Home(props) {

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "signup":
                history.push("/signup");
                break;
            case "login":
                history.push("/login");
                break;
            default:
                break;
        }
    };

    const MenuBar = () => {

        return (
            <div>
                <Grid container>
                    <Grid item xs={10}>
                        {/* <img src="#" alt="RedStream"></img> */}
                        <b>RedStream</b>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => { btnHandler("signup") }}>signup</Button>
                        <Button onClick={() => { btnHandler("login") }}>login</Button>
                    </Grid>
                </Grid>
                <hr></hr>
            </div>

        );
    }

    const Container = styled.div`
        margin: auto;
        padding: 0;
        width: 100%;
    `;

    const BackGround = styled.div`
        background-image: url(${backgroundImage});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 105%;
        position: fixed;
        top: 0;
        left: 0;
    `;

    const Blur = styled.div`
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(8px);
        height: 100vh;
        width: 100%;
    `;

    const Body = styled.div`
        backface-visibility: hidden;
        position: relative;
        top: 5%;
        margin: auto;
        width: 80%;
        padding: 10px;
    `;

    const Description = () => {
        const Title = styled.p`
            font-size: 48px;
        `;

        const Paragraph = styled.p`
            font-size: 24px;
        `;

        return (
            <div>
                <Title>RedStream</Title>
                <Paragraph>
                    RedStream is a website providing movie streaming services. It also has other features, such as playlist, movie review and algorithm for movie recommendation.
                </Paragraph>
            </div>
        );

    }

    const Form = () => {
        const FormBackground = styled.div`
            width: 50%;
            height: auto;
            background: rgba(0,0,0,0.75);
            border: 1px solid white;
            border-radius: 8px;
            padding: 5%;
            margin: auto;
        `;

        const ButtonContainer = styled.div`
            padding: 2% 5%;
            width: 90%;
        `;

        return (
            <div>
                <FormBackground>
                    <h2>Join Redstream Today</h2>
                    <p>✔️No commitments, cancel anytime.</p>
                    <p>✔️Everything on RedStream for one low price.</p>
                    <p>✔️Unlimited viewing on all your devices.</p>
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { btnHandler("login") }}
                            fullWidth
                        >
                            Login
                            </Button>
                    </ButtonContainer>

                    <ButtonContainer>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { btnHandler("signup") }}
                            fullWidth
                        >
                            SIGNUP
                            </Button>
                    </ButtonContainer>
                </FormBackground>
            </div>
        );
    }

    return (
        <Container>
            <BackGround>
                <Blur />
            </BackGround>
            <Body>
                <MenuBar />
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Description />
                    </Grid>
                    <Grid item xs={6}>
                        <Form />
                    </Grid>

                </Grid>
            </Body>

        </Container>
    );
}

export default Home;