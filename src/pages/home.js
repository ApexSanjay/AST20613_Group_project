import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import backgroundImage from "./img/home_background.jpg";

import MenuBar from "./components/menuBarBeforeSignin";

export function Home(props) {

    const Container = styled.div`
        margin: auto;
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
        top: 0%;
        margin: auto;
        width: 80%;
    `;

    const Description = () => {
        const Container = styled.div`
            margin: auto;
            height: 100%;
        `;

        const Title = styled.p`
            font-size: 48px;
        `;

        const Paragraph = styled.p`
            font-size: 20px;
        `;

        return (
            <Container>
                <Title>RedStream</Title>
                <Paragraph>
                    RedStream is a website providing movie streaming services. It also has other features, such as playlist, movie review and algorithm for movie recommendation.
                </Paragraph>
            </Container>
        );

    };

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
    };

    const Center = styled.div`
        position: absolute;
        left: 5%;
        top: 350%;
        height: 80vh;
        margin: auto;
    `;

    return (
        <Container>
            <BackGround>
                <Blur />
            </BackGround>
            <Body>
                <MenuBar />
                <Center>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Description />
                    </Grid>
                    <Grid item xs={6}>
                        <Form />
                    </Grid>
                </Grid>
                </Center>

            </Body>

        </Container>
    );
}

export default Home;