import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgFromUri} from 'react-native-svg';

interface PlantCardPrimaryProps extends RectButtonProps{
    data:{
        name: string;
        photo:string;
    }
}

export default function PlantCardPrimary({data, ...rest}:PlantCardPrimaryProps) {
    return (
        <RectButton style={styles.button} {...rest}>
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.buttonText}>
                {data.name}
            </Text>
        </RectButton>
    )
}


const styles = StyleSheet.create({

    button: {
      backgroundColor: colors.shape,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
      margin: 10,
      maxWidth: '45%',
      flex: 1
    },

    buttonText: {
      color: colors.green_dark,
      fontSize: 24,
      fontFamily: fonts.heading,
      textAlign: 'center'
    },

  });

