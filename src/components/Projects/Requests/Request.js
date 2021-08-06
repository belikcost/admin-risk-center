import {Card, IconButton, InputLabel, MenuItem, Select, Switch, TextField} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
const styles = {
    boolean: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: -14
    },

    item: {
        marginBottom: '1rem',
        width: 200
    },

    req: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,.2)',
        margin: '1rem .5rem',
        width: '100%'
    },
    card: {
      display: 'flex',
      flexDirection: 'column'
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5
    },
    disabled: {
        color: 'rgba(255, 255, 255, .38) !important'
    }
}

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCompanyName: this.props.req.type === 'monitoring'
        };
    }

    render() {
        return (
            <Card key={this.props.key} className={this.props.classes.req}>
                <IconButton className={this.props.classes.close}
                            onClick={() => {
                                !this.props.req.local && this.props.dataProvider.delete("requests", {
                                    id: this.props.req.id,
                                    previousData: this.props.req
                                });
                                this.props.setReq();
                            }}
                >
                    <CloseIcon/>
                </IconButton>
                <CardContent className={this.props.classes.card}>
                    <TextField
                        className={this.props.classes.item}
                        label="ИНН/номер"
                        value={this.props.req.value}
                        onChange={(e) => this.props.setReq({
                            ...this.props.req,
                            value: e.target.value
                        })}
                        required
                    />
                    <TextField
                        className={this.props.classes.item + ' ' + this.props.classes.disabled}
                        label="Название компании"
                        value={this.props.req.company_name}
                        disabled
                    />
                    <InputLabel htmlFor="type">
                        <Typography variant="body2">Тип *</Typography>
                    </InputLabel>
                    <Select
                        id="type"
                        className={this.props.classes.item}
                        value={this.props.req.type}
                        onChange={(e) => this.props.setReq({
                            ...this.props.req,
                            type: e.target.value
                        })}
                        required
                    >
                        {[{id: 'arbitrage', name: 'Арбитражная'}, {id: 'monitoring', name: 'Мониторинговая'}].map(e => (
                            <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel htmlFor="submitted_by">
                        <Typography variant="body2">Заявку создал</Typography>
                    </InputLabel>
                    <Select
                        id="submitted_by"
                        className={this.props.classes.item + ' ' + this.props.classes.disabled}
                        value={this.props.req.submitted_by}
                        disabled
                    >
                        {this.props.users.map(e => (
                            <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                        ))}
                    </Select>
                    <div className={this.props.classes.boolean}>
                        <Switch
                            color="primary"
                            checked={this.props.req.is_active}
                            onChange={(e) => this.props.setReq({
                                ...this.props.req,
                                is_active: e.target.checked
                            })}
                        />
                        <Typography>
                            Активность
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Request);