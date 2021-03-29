import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const MenuBar = (props) => {

    const Container = styled.div`
        height: 50px;
        border-bottom: 1px solid white;
    `;

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <center>
                        <b>
                            {props.children}
                        </b>
                    </center>
                </Grid>

            </Grid>
        </Container>
    );
}

export default MenuBar;