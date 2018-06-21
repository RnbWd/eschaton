// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hearing from '@material-ui/icons/Hearing';
import MenuIcon from '@material-ui/icons/Menu';
import fs from 'fs';
import ytdl from 'ytdl-core';
import { sep } from 'path';

const { app } = require('electron').remote;

type Props = {
  classes: {},
};
type State = {
  url: string,
};

const styles = {
  container: {
    display: 'flex',
    textAlign: 'center',
    width: '100%',
    height: 728,
    flexDirection: 'column',
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 400,
  },
};

class Home extends Component<Props, State> {
  props: Props;
  state = {
    url: '',
    playing: false,
  };
  playVideo = () => {
    const temp = app.getPath('downloads');
    const { url } = this.state;
    console.log('started downloading');
    const vidPath = `${temp}${sep}${url.split('v=').pop()}.mp4`;
    console.log(vidPath);
    const vidStream = ytdl(url, {
      filter: (format) => format.container === 'mp4',
    });
    vidStream.on('finish', console.log);

    vidStream.pipe(fs.createWriteStream(vidPath));
    this.player.src = vidPath;
  };
  togglePlayer = () => {
    if (this.state.playing) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.setState({
      playing: !this.state.playing,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={styles.container}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <TextField
              id="url"
              label="url"
              className={classes.textField}
              value={this.state.url}
              onChange={(e) => this.setState({ url: e.target.value })}
              margin="normal"
            />
            <IconButton color="inherit" onClick={this.playVideo}>
              <Hearing />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div />
        <video
          onClick={this.togglePlayer}
          ref={(node) => (this.player = node)}
          controls
        >
          <source type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
