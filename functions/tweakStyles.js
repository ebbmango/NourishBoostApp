import { StyleSheet } from 'react-native';

export default function tweakStyles(stylesheet, styles) {
  return StyleSheet.flatten([stylesheet, styles]);
}