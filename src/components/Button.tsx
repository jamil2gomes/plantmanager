import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  titulo: string;
}

export const Button = ({ titulo, ...rest }: ButtonProps) => {

  return (
    <TouchableOpacity style={styles.buttom} {...rest}>
      <Text style={styles.buttonText}>
        {titulo}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

  buttom: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },

  buttonText: {
    color: colors.white,
    fontSize: 24
  },

});