import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

interface EnviromentButtonsProps extends RectButtonProps{
    title: string;
    active?:boolean;
}

export default function EnviromentButton({title, active = false, ...rest}:EnviromentButtonsProps) {
    return (
        <RectButton
         style={[styles.button, active && styles.buttonActive]}
         {...rest}
        >
            <Text 
            style={[styles.buttonText, active && styles.buttonTextActive]}
            >
              {title}
            </Text>
        </RectButton>
    )
}


const styles = StyleSheet.create({

    button: {
      backgroundColor: colors.shape,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 5,
      height: 40,
      width: 76
    },

    buttonActive: {
        backgroundColor: colors.green_light,
    },
  
    buttonText: {
      color: colors.heading,
      fontSize: 24,
      fontFamily: fonts.text
    },

    buttonTextActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
      },
  
  });
