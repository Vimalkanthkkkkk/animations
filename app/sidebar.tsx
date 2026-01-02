import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { clamp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export default function Sidebar() {
  const { width } = Dimensions.get('screen');
  const XY = useSharedValue({x:0,y:0});
  const Start = useSharedValue(false);
  const showFloat = useSharedValue(true);
  const tap =  Gesture.Tap().onEnd(()=>{
    if(Start.value){
        Start.value = false
    }
  });
  const DEAD_ZONE = 30;
  const PANEL_WIDTH = 80; 
  const CENTER = width/2;
  const childGesture =  Gesture.Pan()
  .onStart((e)=>{
    XY.value = {x:e.absoluteX , y:e.absoluteY};
    if(Start.value){
        Start.value = false
    }
    showFloat.value = false
  })
  .onUpdate((e)=>{
    XY.value = {x:e.absoluteX , y:e.absoluteY};
  })
  .onEnd(()=>{
    showFloat.value = true
  })

  const pan = Gesture.Pan().activeOffsetX([-10 , 15])
    .onStart((e)=>{
        XY.value = {x: e.absoluteX, y: e.absoluteY};
        Start.value = true;
    })

  const translate = useAnimatedStyle(()=>{
    return {
        transform : [
            {
                translateX : clamp(XY.value.x - 15 , 50 , 350 )
            },
            {
                translateY: clamp(XY.value.y , 50 , 850)
            }
        ] ,
    }
  })

  const translateButton = useAnimatedStyle(()=>{
    return {
        transform : [
            {
                translateY:clamp(XY.value.y - 25 , 50 , 750)
            }
        ],
        right : XY.value.x < CENTER ? width - 20 : 10    } 
  })

  const opacity = useAnimatedStyle(()=>{
    return {
        opacity : Start.value ? 0 : 1 ,
    }
  })

  const Floatopacity = useAnimatedStyle(()=>{
    return {
        opacity : showFloat.value ? 0 : 1,
    }
  })

  const translateX = useAnimatedStyle(() => {
    let target;
    if (XY.value.x < CENTER) {      
      const openTarget = -(width - PANEL_WIDTH - 10); 
      const closedTarget = -(width - 1);
      target = Start.value ? openTarget : closedTarget;
    } else if (XY.value.x > CENTER + DEAD_ZONE) {
      target = Start.value ? 0 : 81; 
    } else {
      return {};
    }
    return {
      transform: [{ translateX: withTiming(target, { duration: 220 }) }],
      opacity: Start.value ? 1 : 0, 
    };
  });
  return (
    <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
            <View style={styles.item}>
                <Text>Swipe that!!!</Text>
            </View>
        </GestureDetector>
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.backbutton , opacity , translateButton ]}></Animated.View>
        </GestureDetector>
        <Animated.View style = {[styles.panel , translateX]}>
            <GestureDetector gesture={childGesture}>
                <View style={[styles.notch]}></View>
            </GestureDetector>
        </Animated.View>
        <Animated.View style={[ styles.floatobj , translate , Floatopacity]}></Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  floatobj : {
    width: 30 ,
    height : 30,
    backgroundColor: "green",
    zIndex : 7,
    position:'absolute',
    borderRadius : 10,
    borderCurve : "continuous",
  },
  notch : {
    width: 26 ,
    height : 8,
    backgroundColor: "#857f7f",
    opacity: 0.6,
    zIndex : 6,
    top:20,
    left : 28 ,
    borderRadius : 10,
    borderCurve : "continuous",
  },
  panel : {
    width: 80 ,
    height : 800,
    backgroundColor: "#dbd5d5",
    opacity : 0.5,
    zIndex : 5,
    position :"absolute",
    top:50,
    right:1,
    borderRadius : 10,
    borderCurve : "continuous",
  },
  backbutton : {
    height : 80 ,
    borderRadius : 50,
    borderCurve : "continuous",
    backgroundColor : "grey",
    position:"absolute",
    alignItems : "center",
    zIndex :6,
    overflow: "hidden", 
    width : 10,
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
