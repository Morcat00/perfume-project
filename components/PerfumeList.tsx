import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Perfume = {
  name: string;
  fragrance: string;
  quantity: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Inventory'>;

export default function PerfumeList({ navigation }: Props) {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  const loadPerfumes = async () => {
    const data = await AsyncStorage.getItem('perfumes');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setPerfumes(parsed);
      } catch {
        Alert.alert('Error loading data');
      }
    }
  };

  const deletePerfume = async (index: number) => {
    const updated = perfumes.filter((_, i) => i !== index);
    await AsyncStorage.setItem('perfumes', JSON.stringify(updated));
    setPerfumes(updated);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPerfumes);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={perfumes}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              {item.name} ({item.fragrance}) - {item.quantity} units
            </Text>
            <Button title="Delete" color="red" onPress={() => deletePerfume(index)} />
          </View>
        )}
      />
      <Button title="Add New Perfume" onPress={() => navigation.navigate('Add Perfume')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0' },
  text: { marginBottom: 5 }
});
