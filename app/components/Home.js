// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import ytdl from 'ytdl-core';
import { sep } from 'path';

const { app } = require('electron').remote;

type Props = {};
type State = {
  url: string,
};

export default class Home extends Component<Props, State> {
  props: Props;
  state = {
    url: '',
  };
  downloadVideo = () => {
    console.log(app);
    const dpath = app.getPath('downloads');
    const { url } = this.state;
    console.log(url);
    console.log('started downloading');
    const vidStream = ytdl(url, {
      filter: (format) => format.container === 'mp4',
    });
    vidStream.on('finish', console.log);
    vidStream.pipe(
      fs.createWriteStream(`${dpath}${sep}${url.split('v=').pop()}.mp4`),
    );
  };

  render() {
    return (
      <div style={styles.container}>
        <div>Youtube-dl</div>
        <div>
          <input
            onChange={(e) => this.setState({ url: e.target.value })}
            type="text"
            placeholder="youtube link"
            value={this.state.url}
          />
        </div>
        <div>
          <button onClick={this.downloadVideo}>download</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: 728,
    flexDirection: 'column',
  },
};
