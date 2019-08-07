import { BluetoothTerminal } from './bluetooth-terminal';
let terminal = null

export const getBluetoothTerminal = () => {
  if (terminal) {
    return terminal
  }

  terminal = new BluetoothTerminal()
  return terminal
}