import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../themes';
import { CircleX, Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  style?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Search />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={AppColors.lightBlack}
      />
      {/* {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <CircleX />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    backgroundColor: AppColors.ExtralightYellow,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
