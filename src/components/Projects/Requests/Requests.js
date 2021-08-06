import * as React from "react";
import {IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Request from "./Request";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    plus: {
        color: '#fff'
    },
    reqs: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localReqs: this.props.reqs.data
        }
    }

    buildDefault = () => {
        let last = this.state.localReqs[this.state.localReqs.length - 1];
        return {
            id: last ? last.id + 1 : 0,
            local: 'local',
            is_active: true,
            project: this.props.thisId,
            company_name: 'default',
            submitted_by: this.props.userId,
            type: "arbitrage",
            value: ""
        }
    }

    render() {
        return (
            <>
                <Typography>Заявки</Typography>
                <div className={this.props.classes.reqs}>
                    {this.state.localReqs.map(a => <Request
                        setReq={(v) => {
                            this.setState({localReqs: this.state.localReqs.map(r => r.id === a.id ? v : r).filter(r => r)});
                            this.props.setDisabled(false);
                        }}
                        dataProvider={this.props.dataProvider}
                        req={a}
                        users={this.props.users}
                        key={a.id}
                    />)}
                </div>
                <IconButton className={this.props.classes.plus} onClick={() => {
                    this.setState({
                        localReqs: [...this.state.localReqs, this.buildDefault()]
                    });
                    this.props.setDisabled(false);
                }}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </>
        );
    }
}

export default withStyles(styles)(Requests);