import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AppColors } from '../../../themes';

interface DividerLineProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  width?: string | number;
  style?: ViewStyle;
}

const DividerLine: React.FC<DividerLineProps> = ({
  color = AppColors?.black,
  thickness = 1,
  marginVertical = 10,
  style,
  width = '100%',
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical,
          width,
        } as ViewStyle,
        style,
      ]}
    />
  );
};

export default DividerLine;

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});
