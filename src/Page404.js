import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import Button from '@mui/material/Button';

export default function Page404() {
    const onButtonClicked = async (event) => {
        await baylorApp.relaunch("Relaunched App");
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>  
            <Stack justifyContent="center" direction="row" spacing={3}>
                <NearbyErrorIcon fontSize="large" />
                <Stack direction="column" spacing={3}>
                    <div>
                        <Typography variant="h4" paragraph>
                            Oops, server is down!
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {"Please make sure that the local server is turned on and has wifi access then click restart app."}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {"If this error still persist please contact technical support. Thank you!"}
                        </Typography>
                    </div>

                    <Button
                        variant="outlined"
                        fullWidth
                        color="success"
                        onClick={event => onButtonClicked(event)}
                    >
                        Restart App
                    </Button>
                </Stack>
            </Stack> 
        </div>
    )
}


