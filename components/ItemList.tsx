// components/ItemList.tsx
import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

type Props = {
  items: string[];
};

function ItemList({ items }: Props) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay elementos.</Text>}
      contentContainerStyle={items.length === 0 && styles.emptyContainer}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    fontSize: 18,
    backgroundColor: '#E9ECEF',
    borderRadius: 6,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6C757D',
    fontStyle: 'italic',
    fontSize: 16,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default ItemList;
