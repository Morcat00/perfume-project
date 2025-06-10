import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Add Perfume'>;

export default function PerfumeForm({ navigation }: Props) {
  const [name, setName] = useState('');
  const [fragrance, setFragrance] = useState('');
  const [quantity, setQuantity] = useState('');

  const savePerfume = async () => {
    if (!name || !fragrance || !quantity) {
      Alert.alert('All fields are required');
      return;
    }

    const newPerfume = {
      name,
      fragrance,
      quantity: parseInt(quantity, 10)
    };

    if (isNaN(newPerfume.quantity)) {
      Alert.alert('Quantity must be a number');
      return;
    }

    const existing = await AsyncStorage.getItem('perfumes');
    const perfumes = existing ? JSON.parse(existing) : [];
    perfumes.push(newPerfume);
    await AsyncStorage.setItem('perfumes', JSON.stringify(perfumes));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Perfume Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Fragrance Type" value={fragrance} onChangeText={setFragrance} style={styles.input} />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save" onPress={savePerfume} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
});
