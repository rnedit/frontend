import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),

            height: theme.spacing(16),
        },
    },

}));

export default function MainDocument() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="lg" >

                <Paper>

                    <Grid container spacing={3} >

                        <Grid item xs={12} sm={6}>
                            <Box display="flex" m={1} p={1} justifyContent="left" >
                               123

                            </Box>
                            <Box display="flex" m={1} p={1} justifyContent="left"  >
                                345
                            </Box>

                        </Grid>
                        <Grid item xs={12} m={1} p={1} sm={6}>
                        <Box display="flex" m={1} p={1} justifyContent="left" >
                               asdasda

                            </Box>
                        </Grid>
                    </Grid>

                </Paper>

            </Container>


        </div>
    )
}