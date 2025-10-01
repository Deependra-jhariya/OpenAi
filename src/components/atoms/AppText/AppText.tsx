import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { AppColors } from '../../../themes';

interface AppTextProps {
  text?: String;
  highlightedText?: string;
  style?: StyleProp<TextStyle>;
  hightlightStyle?: StyleProp<TextStyle>;
  onHighlightPress?: () => void;
}

const AppText: React.FC<AppTextProps> = props => {
  const { text, style, highlightedText, hightlightStyle, onHighlightPress } =
    props;
  return (
    <View>
      <Text allowFontScaling={false} style={[styles?.textStyle, style]}>
        {text}
        {highlightedText && (
          <>
            <Text
              allowFontScaling={false}
              style={[styles.highlightedText, hightlightStyle]}
              onPress={onHighlightPress}
            >
              {highlightedText}
            </Text>
          </>
        )}
      </Text>
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: AppColors.black,
  },
  highlightedText: {
    fontSize: 18,
    color: AppColors.black,
  },
});
