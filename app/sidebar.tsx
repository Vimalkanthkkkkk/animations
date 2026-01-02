import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export default function Sidebar() {
  const { width } = Dimensions.get('screen');
  const XY = useSharedValue({x:0,y:0});
  const Start = useSharedValue(false);
  const tap =  Gesture.Tap().onEnd(()=>{
    if(Start.value){
        Start.value = false
    }
  });
  const CENTER = width/2;
  const childGesture =  Gesture.Pan()
  .onStart((e)=>{
    //console.log(e.absoluteX);
    XY.value = {x:e.absoluteX , y:e.absoluteY};
    if(Start.value){
        Start.value = false
    }
  })
  .onUpdate((e)=>{
    //console.log(e.absoluteX);
    XY.value = {x:e.absoluteX , y:e.absoluteY};
  });

  const pan = Gesture.Pan()
    .activeOffsetX([-10 , 0])
    .onStart((e)=>{
        Start.value = true;
    })
  const translate = useAnimatedStyle(()=>{
    return {
        transform : [
            {
                translateX : XY.value.x - 15
            },
            {
                translateY:XY.value.y
            }
        ]
    }
  })

  const translateButton = useAnimatedStyle(()=>{
    return {
        transform : [
            {
                translateY:XY.value.y - 25
            }
        ]
    }
  })

  const opacity = useAnimatedStyle(()=>{
    return {
        opacity : Start.value ? 0 : 1 ,
    }
  })
  const translateX = useAnimatedStyle(()=>{
    return {
        transform: [
            {translateX : Start.value ? withTiming(0 , {duration : 300}) : withTiming(81 , {duration : 100})}
        ],
    };
  });   

  return (
    <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
            <View style={styles.item}>
                <Text>Swipe the Right Edge</Text>
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
        <Animated.View style={[styles.floatobj , translate]}></Animated.View>
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
    backgroundColor: "red",
    zIndex : 6,
    top:20,
    left : 30 ,
    borderRadius : 10,
    borderCurve : "continuous",
  },
  panel : {
    width: 80 ,
    height : 800,
    backgroundColor: "blue",
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
    top: 0 ,
    right : 10 ,
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
