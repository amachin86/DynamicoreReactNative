import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import ItemList from './components/ItemList'; // Importamos el componente

const App = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef<TextInput>(null);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
      Keyboard.dismiss();
    } else {
      Alert.alert('Campo vacío', 'Por favor ingresa un elemento válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Elementos</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Agregar nuevo elemento"
        value={newItem}
        onChangeText={setNewItem}
        onSubmitEditing={addItem}
        returnKeyType="done"
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, !newItem.trim() && styles.buttonDisabled]}
        onPress={addItem}
        disabled={!newItem.trim()}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>

      <ItemList items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    color: '#343A40',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0AFC2',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default App;
