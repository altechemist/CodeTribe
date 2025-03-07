import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import MainCard from '@/components/MainCard';
import DailyCard from '@/components/DailyCard';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
       <MainCard path="app/(tabs)/index.tsx" />

       <DailyCard path="app/(tabs)/index.tsx"/>
   
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
