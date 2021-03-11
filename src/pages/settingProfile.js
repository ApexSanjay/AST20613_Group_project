import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import face from "./img/face.svg";
import MenuBar from "./components/settingMenuBar";
import SettingMenu from "./components/settingMenu";
import SettingTitle from "./components/settingTitle";
import SaveButton from "./components/settingSaveButton";

import LoginModules from "./modules/LoginModules";

function SettingProfile(props) {
    var profileName = LoginModules.getUserProfile().name;

    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const NameField = () => {
        const updateNameState = (e) => {
            profileName = e.target.value;
        };

        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Name
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            defaultValue={profileName}
                            onChange={updateNameState}
                            fullWidth
                        />
                    </center>
                </Grid>
            </Grid>
        );
    };

    const IconField = () => {
        const [imageAsFile, setImageAsFile] = useState('');
        const [icon, setIcon] = useState(LoginModules.getUserProfile().icon != null ? LoginModules.getUserProfile().icon : face);

        const handleImage = (e) => {
            const image = e.target.files[0]
            setImageAsFile(imageFile => (image));
        }

        const handleSubmit = e => {
            e.preventDefault()
            console.log('start of upload')

            if (imageAsFile === '') {
                console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
            }
            LoginModules.updateIcon(imageAsFile).then(() => {
                var newIcon = LoginModules.getUserProfile().icon;
                console.log(newIcon);
                setIcon(newIcon);
            }
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Icon
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <img src={icon} width="80%" alt="icon"></img> <br />
                        <input
                            type="file"
                            onChange={handleImage}
                        />
                        <Button onClick={handleSubmit} variant="contained" color="secondary">Click to upload a new image</Button>
                    </center>
                </Grid>
            </Grid>
        );
    }

    const ProfileSetting = () => {
        const updateProfile = () => {
            LoginModules.updateName(profileName).then(() => {
                // console.log(LoginModules.getUserProfile().name);
            });
        }

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <SettingTitle>Profile</SettingTitle>
                </Grid>
                <Grid item xs={12}>
                    <NameField />
                    <IconField />
                    <SaveButton onClick={updateProfile} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={0} /></Grid>
                <Grid item xs={9}><ProfileSetting /></Grid>
            </Grid>
        </Container>

    );
}

export default SettingProfile;