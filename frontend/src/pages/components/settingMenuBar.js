import { useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



export const MenuBar = () => {

    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "back":
                history.push("/browse");
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => { btnHandler("back") }}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <center>
                        <b>
                            Manage Account Page
                        </b>
                    </center>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <hr></hr>
        </div >
    );
};

export default MenuBar;