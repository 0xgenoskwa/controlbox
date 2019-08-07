// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

import { history } from '../store/configureStore';

import { getBluetoothTerminal } from '../libs';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  connect() {
    const terminal = getBluetoothTerminal();
    terminal.connect().
      then(() => {
        history.push('/controls')
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Control Box</h2>
        <button variant="contained" onClick={this.connect}>Connect</button>
      </div>
    );
  }
}
