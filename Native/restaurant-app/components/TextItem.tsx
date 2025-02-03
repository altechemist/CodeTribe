import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TextItemProps {
  label: string;
  value: string;
}

const TextItem: React.FC<TextItemProps> = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default TextItem;
