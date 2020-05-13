import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 300,
        marginTop: 10,
        maxHeight: 400
    },
    media: {
        maxHeight: 140,
        minHeight: 140
    },
    postContainer: {
        height: 200,
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none '
        }
    }
});


function Post(props) {
    const classes = useStyles();
    console.log(props)
    return (
        <Card className={classes.root}>


            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>


            </CardContent>
            <div className={classes.postContainer}>


                <div dangerouslySetInnerHTML={{ __html: props.body }} ></div>
            </div>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={`/post/:${props.id}`}>
                    open
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post; 