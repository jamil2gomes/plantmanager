import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../styles/colors';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable  from 'react-native-gesture-handler/Swipeable';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

interface PlantCardSecondaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string
    };
    handleRemove: () => void
}

export default function PlantCardSecondary({ data, handleRemove, ...rest }: PlantCardSecondaryProps) {
    return (
        <Swipeable
        overshootRight={false}
        renderRightActions={()=>(
            <Animated.View>
                <View>
                    <RectButton 
                    style={styles.removeButton}
                    onPress={handleRemove}
                    >
                        <Feather 
                        name='trash'
                        size={32}
                        color={colors.white}
                        />
                    </RectButton>
                </View>
            </Animated.View>
        )}
        >
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
        </Swipeable>
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
    },

    removeButton:{
        width:100,
        height:85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 15,
        position: 'relative',
        right: 20,



    }
});

