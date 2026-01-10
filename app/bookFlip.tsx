import { View, StyleSheet , Dimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagetwo from './page';
import Page from './page';

export default function BookFlip() {
  const { width } = Dimensions.get('screen');
  const CARD_WIDTH = 150;
  const CARD_HEIGHT = 200;
  const offsetY = useSharedValue(0);
  const prevX = useSharedValue(0);
  const pageZ = [
    { L: useSharedValue(100), R: useSharedValue(101) }, 
    { L: useSharedValue(98),  R: useSharedValue(99)  },
    { L: useSharedValue(96),  R: useSharedValue(97)  },
    { L: useSharedValue(94),  R: useSharedValue(95)  },
    { L: useSharedValue(92),  R: useSharedValue(93)  },
    { L: useSharedValue(90),  R: useSharedValue(91)  },
  ];
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const x = event.contentOffset.x;
    const px = prevX.value;
    offsetY.value = x;
    console.log(`x - ${offsetY.value} / prev - ${px}`)
    if (px < 90 && x >= 90) {
      pageZ[0].L.value = 98;
      pageZ[0].R.value = 99;
      pageZ[1].L.value = 100;
      pageZ[1].R.value = 101;
    }

    if (px < 240 && x >= 240) {
      pageZ[2].L.value = 102;
      pageZ[2].R.value = 103;
    }

    if (px < 390 && x >= 390) {
      pageZ[3].L.value = 104;
      pageZ[3].R.value = 105;
    }

    if (px < 540 && x >= 540) {
      pageZ[4].L.value = 106;
      pageZ[4].R.value = 107;
    }

    if (px < 690 && x >= 690) {
      pageZ[5].L.value = 108;
      pageZ[5].R.value = 109;
    }

    if (px > 690 && x <= 690) {
      pageZ[5].L.value = 90;
      pageZ[5].R.value = 91;
    }

    if (px > 540 && x <= 540) {
      pageZ[4].L.value = 92;
      pageZ[4].R.value = 93;
    }

    if (px > 390 && x <= 390) {
      pageZ[3].L.value = 94;
      pageZ[3].R.value = 95;
    }

    if (px > 240 && x <= 240) {
      pageZ[2].L.value = 96;
      pageZ[2].R.value = 97;
    }

    if (px > 90 && x <= 90) {
      pageZ[1].L.value = 97;
      pageZ[1].R.value = 98;
      pageZ[0].L.value = 100;
      pageZ[0].R.value = 101;
    }
    prevX.value = x;
  });

  return (
    <View style={styles.item}>
      <Animated.FlatList
        horizontal
        disableIntervalMomentum
        onScroll={scrollHandler}
        snapToInterval={150}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        style={styles.scrollview}
        data={[0 , 1 , 2 , 3 , 4, 5]}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
        renderItem={() => (
          <View 
            style={{
              height:CARD_HEIGHT,
              width:CARD_WIDTH,
            }}
          />
        )}/>      
          <Animated.View
            style={{
              position:'absolute',
              top:50,
              bottom:25,
              justifyContent:"center",
              left:0,
              right:0,
              pointerEvents:'none',
            }}>
              <Page colors={["grey"  , "blue"]} index={0} value={offsetY} leftZ={pageZ[0].L} rightZ={pageZ[0].R} ></Page>
              <Page colors={["purple"  , "orange"]} index={1} value={offsetY} leftZ={pageZ[1].L} rightZ={pageZ[1].R} ></Page>
              <Page colors={["brown"  , "red"]} index={2} value={offsetY} leftZ={pageZ[2].L} rightZ={pageZ[2].R} ></Page>
              <Page colors={["violet"  , "green"]} index={3} value={offsetY} leftZ={pageZ[3].L} rightZ={pageZ[3].R} ></Page>
              <Page colors={["lime"  , "pink"]} index={4} value={offsetY} leftZ={pageZ[4].L} rightZ={pageZ[4].R} ></Page>
              <Page colors={["aqua"  , "yellow"]} index={5} value={offsetY} leftZ={pageZ[5].L} rightZ={pageZ[5].R} ></Page>
          </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex : 1,
    justifyContent : "center",
  },
  scrollview :{
    maxHeight : 200 + 25*2 ,
    position:"absolute",
  },
  container :{
    alignItems:'center',
    height: 200 + 25*2,
    justifyContent:'center',
    paddingHorizontal: 150,
  }
});