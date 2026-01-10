import { StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function Pagetwo({ colors, index, value , leftZ , rightZ }: { colors: string[], index: number, value: SharedValue<number> ,  leftZ: SharedValue<number> , rightZ: SharedValue<number>}) {
  const CARD_WIDTH = 150;
  const CARD_HEIGHT = 200;
  const { width } = Dimensions.get('screen');
  const CENTER = width / 2;

  const inputRange = [
    (index - 3) * CARD_WIDTH,
    (index - 2) * CARD_WIDTH,
    (index - 1) * CARD_WIDTH,
    (index) * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
    (index + 2) * CARD_WIDTH,
    (index + 3) * CARD_WIDTH,
  ];
  const leftstyle = useAnimatedStyle(() => {
    const leftrotate = interpolate(
      value.value,
      inputRange,
      [
        60,
        60,
        160,
        30,
        20,
        20,
        20,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );
    const lefttranslate = interpolate(
      value.value,
      inputRange,
      [
        CENTER + 30,
        CENTER + 20,
        CENTER ,
        CENTER - CARD_WIDTH,
        CENTER - CARD_WIDTH - 10,
        CENTER - CARD_WIDTH - 20,
        CENTER - CARD_WIDTH - 30,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );
    const leftscale = interpolate(
      value.value,
      inputRange,
      [
        0.85,
        0.90,
        0.95,
        1,
        0.95,
        0.90,
        0.85,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );


    return {
      transformOrigin: '100% 50%',
      transform: [
        { perspective: 10000 },
        { translateX: CARD_WIDTH - 150 / 2 },
        { rotateY: `${leftrotate}deg` },
        { translateX: -CARD_WIDTH / 2 },
        { translateX: lefttranslate },
        { scaleY: leftscale },
      ],
      zIndex:leftZ.value,
    }
  });

  const rightstyle = useAnimatedStyle(() => {
    const rightrotate = interpolate(
      value.value,
      inputRange,
      [
        -15,
        -20,
        -25,
        -30,
        -130,
        -130,
        -130,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );
    const righttranslate = interpolate(
      value.value,
      inputRange,
      [
        CENTER + 30,
        CENTER + 20,
        CENTER + 10,
        CENTER,
        CENTER - 10,
        CENTER - 20,
        CENTER - 30,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );
    const rightscale = interpolate(
      value.value,
      inputRange,
      [
        0.85,
        0.90,
        0.95,
        1,
        0.95,
        0.90,
        0.85,
      ],
      { extrapolateLeft: Extrapolation.CLAMP }
    );


    return {
      transformOrigin: '0% 50%',
      transform: [
        { perspective: 10000 },
        { translateX: righttranslate },
        { scaleY: rightscale },
        { rotateY: `${rightrotate}deg` },
      ],
      zIndex:rightZ.value ,
      left: 0
    }
  });
  return (
    <>
      <Animated.View
        style={[
          styles.page,
          leftstyle,
          {
            backgroundColor: colors[0],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.page,
          rightstyle,
          {
            backgroundColor: colors[1],
          },
        ]}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>VIMAL</Text>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  page: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
  },
});