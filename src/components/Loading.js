import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";

const Loading = (props) => {
    const useStyles = makeStyles({
        loading: {
            color: '#fff',
            margin: '0 auto',
            width: props.w && props.w + 'px !important',
            height: props.h && props.h + 'px !important'
        }
    });
    const classes = useStyles();
    return (
        <CircularProgress className={classes.loading}/>
    );
}

export default Loading;