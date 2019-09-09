import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ScreamDialog from './ScreamDialog'

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import { connect } from "react-redux";


import MyButton from "../util/MyButton";
import DeleteScream from './DeleteScream'
import { LikeButton } from "./LikeButton";

const styles = {
  card: {
    position:'relative',
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

export class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: { body, userImage, time, user, likeCount, commentCount, id },
      user: { authenticated, credentials }
    } = this.props;

    const deleteButton = authenticated && credentials.user === user ?(
      <DeleteScream screamId={id}/>
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${user}`}
            color="primary"
          >
            {user}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(time).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={id}/>
          <span>{likeCount} likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={id} userHandle={user} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

// const mapActionsToProps = {
//   likeScream,
//   unlikeScream
// };

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Scream));
