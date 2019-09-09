import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";

const styles = {
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    marginLeft:30
  },
  commentdata: {
    marginLeft: 40
  }
};

export class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map(comment => {
          const { body, time, userImage, user } = comment;
          return (
            <Fragment key={time}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentdata}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${user}`}
                        color="primary"
                      >
                        {user}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(time).format("h:mm a, MMMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr className={classes.visibleSeparator} />
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(Comments);
