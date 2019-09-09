import React, { Component } from "react";
import axios from "axios";
import Scream from "../components/Scream";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";
import StaticProfile from "../components/StaticProfile";

export class user extends Component {
  state = {
    profile: null,
    screamIdParam:null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId= this.props.match.params.screamId
    if(screamId) this.setState({screamIdParam:screamId})
    this.props.getUserData();
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const {screamIdParam}= this.state
    const screamsMarkup = loading ? (
      <p>Loading data....</p>
    ) : screams === null ? (
      <p>No screams from the user</p>
    ) : !screamIdParam ? (
      screams.map(scream => <Scream key={scream.id} scream={scream}/>)
    ):(
        screams.map(scream=>{
            if(scream.id !== screamIdParam)
                return <Scream key={scream.id} scream={scream}/>
            else return <Scream key={scream.id} scream={scream}/>
        })
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
