import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Animated from 'react-native-reanimated';

export default function BackButton() {
  const { width } = Dimensions.get('screen');
  const translationX = useSharedValue(0);
  const Y = useSharedValue(0);
  const Start = useSharedValue(false);
  const AnimatedEvilIcons = Animated.createAnimatedComponent(EvilIcons);
  const pan = Gesture.Pan()
    .onStart((e)=>{
      Y.value = e.y;
      if(e.absoluteX > 390){
        Start.value = true;
      }else{
        Start.value = false;
      }
    })
    .onUpdate((e) =>{
      if(Start.value){
        translationX.value = interpolate(
          e.absoluteX,
          [350, width],
          [60, 0],
          { extrapolateLeft: Extrapolation.CLAMP }
        );
      }
    })
    .onEnd(()=>{
      translationX.value = withTiming(0 , {duration: 100});
    })

  const jellySpring = {
    damping: 8,
    stiffness: 420,
    mass: 0.3,
  };


  const widthStyle = useAnimatedStyle(()=>{
    const radius = interpolate(
      translationX.value,
      [0  ,10 , 20 , 30 , 40 , 50],
      [10 ,10 , 10 , 12 , 13  , 20],
      { extrapolateLeft: Extrapolation.CLAMP }
    );  

    const jellyScaleX = interpolate(
      translationX.value,
      [0, 40, 55],
      [0.9, 1.05, 1.15],
      Extrapolation.CLAMP
    );

    const detached = translationX.value > 55;

      return {
    width: detached
      ? withSpring(50, jellySpring)
      : translationX.value,

    borderRadius: detached
      ? withSpring(25, jellySpring)
      : radius,

    right: detached
      ? withSpring(5, jellySpring)
      : 1,

    transform: [
      { scaleX: detached ? withSpring(1, jellySpring) : jellyScaleX },
      {translateY : Y.value - 80}
    ],
  };
  });

  
  const opacityStyle = useAnimatedStyle(()=>{
    return { opacity :translationX.value > 30 ? 1 : 0 };
  });


  return (
    <GestureHandlerRootView>
        <View style={styles.item}>
          <Text>Swipe the Right Edge</Text>
        </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={{width:80 , height :"100%" , position : "absolute" , right:0}}>
          <Animated.View style={[styles.backbutton, widthStyle ]}>
              <AnimatedEvilIcons name="chevron-left" style={[ {transform:[{scaleX : 1.5}] , right: 0  } , opacityStyle ]} size={50} color="black" />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backbutton : {
    height : 50 ,
    borderCurve : "continuous",
    backgroundColor : "grey",
    position:"absolute",
    alignItems : "center",
    zIndex :5,
    overflow: "hidden", 
  },
  item: {
    display : "flex",
    justifyContent : "center",
    alignItems :"center",
    width: '100%',
    height:'100%',
    padding: 16,
    textAlign: 'center',
  },
});
