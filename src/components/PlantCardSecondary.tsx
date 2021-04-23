import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';

interface PlantCardSecondaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string
    }
}

export default function PlantCardSecondary({ data, ...rest }: PlantCardSecondaryProps) {
    return (
        <RectButton style={styles.button} {...rest}>
            <SvgFromUri uri={data.photo} width={50} height={50} />
            <Text style={styles.title}>
                {data.name}
            </Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>

                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}


const styles = StyleSheet.create({

    button: {
        backgroundColor: colors.shape,
        paddingVertical: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 5,
        width: '100%',
        flexDirection: 'row',
        flex: 1
    },

    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        marginLeft: 10,
        flex: 1,
        color: colors.heading

    },

    details: {
        alignItems: 'flex-end',
    },

    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },

    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    }
});

