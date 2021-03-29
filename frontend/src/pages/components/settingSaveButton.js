import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const SaveButton = (props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
                <center>
                    <Button onClick={props.onClick} variant="contained" color="primary" type="submit" fullWidth>Save</Button>
                </center>
            </Grid>
        </Grid>
    );
}

export default SaveButton;