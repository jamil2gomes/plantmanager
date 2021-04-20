import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  titulo: string;
}

const Button = ({ titulo, ...rest }: ButtonProps) => {

  return (
    <TouchableOpacity style={styles.buttom} {...rest}>
      <Text style={styles.buttonText}>
        {titulo}
      </Text>
    </TouchableOpacity> 
  )
}

export default Button;

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
    fontSize: 24,
    fontFamily: fonts.text
  },

});