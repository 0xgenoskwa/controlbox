// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Controls.css';
import routes from '../constants/routes';
import { getBluetoothTerminal } from '../libs';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

function hexStringToByte(str) {
  if (!str) {
    return new Uint8Array();
  }
  
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i,2),16));
  }
  
  return new Uint8Array(a);
}

export default class Counter extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.terminal = getBluetoothTerminal()

    this.up = this.up.bind(this)
    this.down = this.down.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentDidMount() {
    if (!this.terminal._device) {
      this.terminal.connect();
    }
  }

  up() {
    this.terminal.send(hexStringToByte("FBFB050207"))
  }

  down() {
    this.terminal.send(hexStringToByte("FBFB050104"))
  }

  stop() {
    this.terminal.send(hexStringToByte("FBFB050005"))
  }

  goToMemory(id) {
    const data = {
      1: "FBFB050401",
      2: "FBFB050500",
      3: "FBFB050603",
      4: "FBFB050702",
    }
    if (data[id]) {
      this.terminal.send(hexStringToByte(data[id]))
    }
  }

  saveToMemory(id) {
    const data = {
      1: "FBFB05080D",
      2: "FBFB05090C",
      3: "FBFB050A0F",
      4: "FBFB050B0E",
    }
    if (data[id]) {
      this.terminal.send(hexStringToByte(data[id]))
    }
  }

  render() {
    return (
      <div>
        <div className={styles.btnGroup}>
          <table className={styles.tbl}>
            <tbody>
              <tr>
                <td>
                  <button
                    className={styles.btn}
                    onClick={this.up}
                    data-tclass="btn"
                    type="button"
                  >
                    Up
                  </button>
                </td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={this.stop}
                    data-tclass="btn"
                    type="button"
                  >
                    Stop
                  </button>
                </td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={this.down}
                    data-tclass="btn"
                    type="button"
                  >
                    Down
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className={styles.btn}
                    onClick={this.goToMemory.bind(this, 1)}
                    data-tclass="btn"
                    type="button"
                  >
                    M1
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.goToMemory.bind(this, 2)}
                    data-tclass="btn"
                    type="button"
                  >
                    M2
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.goToMemory.bind(this, 3)}
                    data-tclass="btn"
                    type="button"
                  >
                    M3
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.goToMemory.bind(this, 4)}
                    data-tclass="btn"
                    type="button"
                  >
                    M4
                  </button>
                </td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={this.saveToMemory.bind(this, 1)}
                    data-tclass="btn"
                    type="button"
                  >
                    Save 1
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.saveToMemory.bind(this, 2)}
                    data-tclass="btn"
                    type="button"
                  >
                    Save 2
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.saveToMemory.bind(this, 3)}
                    data-tclass="btn"
                    type="button"
                  >
                    Save 3
                  </button>
                  <button
                    className={styles.btn}
                    onClick={this.saveToMemory.bind(this, 4)}
                    data-tclass="btn"
                    type="button"
                  >
                    Save 4
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
