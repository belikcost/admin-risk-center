import {makeStyles} from "@material-ui/core/styles";
import {BooleanField, EditButton, ShowButton, TextField, useListContext, DeleteButton} from "react-admin";
import {Avatar, Card, CardActions, CardHeader} from "@material-ui/core";
import null_avatar from "../img/matthew.png";
import * as React from "react";

const useStyles = makeStyles(() => ({
    headerText: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        marginRight: '5px'
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,.2)',
        marginBottom: '1rem'
    },
    actions: {
        flexDirection: 'column',
        alignItems: 'baseline'
    }
}));

const CardsList = (props) => {
    const {ids, data, basePath} = useListContext();
    const classes = useStyles();
    return (
        <div>
            {ids.map(id =>
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={<TextField record={data[id]} source="name"/>}
                        avatar={props.avatar && <Avatar src={data[id]['photo_url'] || null_avatar}/>}
                        subheader={
                            <>
                                <div className={classes.headerText}>
                                    <span className={classes.label}>ID:</span> <TextField record={data[id]}
                                                                                          source="id"/>
                                </div>
                                <div className={classes.headerText}>
                                    <span className={classes.label}>Активность:</span> <BooleanField record={data[id]}
                                                                                                     source="is_active"/>
                                </div>
                            </>
                        }
                    />
                    <CardActions className={classes.actions}>
                        {props.edit && <EditButton basePath={basePath} record={data[id]}/>}
                        <ShowButton basePath={basePath} record={data[id]}/>
                        {props.delete && <DeleteButton basePath={basePath} record={data[id]}/>}
                    </CardActions>
                </Card>
            )}
        </div>
    );
};

export default CardsList;