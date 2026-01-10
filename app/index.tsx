import { View , Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
        <Link href="/backbutton" style={styles.item}>
            <Text style={styles.item}>BackButton</Text>
        </Link>
        <Link href="/sidebar" style={styles.item}>
            <Text style={styles.item}>Sidebar</Text>
        </Link>
        <Link href="/practice" style={styles.item}>
            <Text style={styles.item}>Practice</Text>
        </Link>
        <Link href="/final" style={styles.item}>
            <Text style={styles.item}>Final</Text>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    top : 50,
  },
  item: {
    width: '50%',
    padding: 16,
    textAlign: 'center',
  },
});
