import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextStyle,
  ColorValue,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import AppText from '../AppText/AppText';
import { AppColors, AppFontFamily } from '../../../themes';


interface ThemeInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmit?: () => void;
  keyboardType?: KeyboardTypeOptions;
  style?: TextStyle;
  inputContainerStyle?: ViewStyle;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom';
  multiline?: boolean;
  iconFamily?: string;
  iconName?: string;
  isIcon?: React.ReactNode;
  isRightIcon?: React.ReactNode;
  isEndIcon?: React.ReactNode;
  placeholderColors?: ColorValue | undefined;
  isError?: string;
  secureTextEntry?: boolean;
}

const ThemeInput: React.FC<ThemeInputProps> = props => {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    onSubmit,
    keyboardType,
    style,
    inputContainerStyle,
    textAlignVertical,
    multiline,
    iconFamily,
    iconName,
    isIcon,
    isRightIcon,
    isEndIcon,
    placeholderColors,
    isError,
    secureTextEntry,
  } = props;
  return (
    <View style={styles?.inputContainer}>
      {label && (
        <Text style={styles?.labelStyle}>{label || 'Full Name *'}</Text>
      )}
      <View style={[styles?.inputMainView, inputContainerStyle]}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {isIcon && isIcon}
          <TextInput
            style={[styles?.inputStyle, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            textAlignVertical={textAlignVertical}
            multiline={multiline}
            placeholderTextColor={placeholderColors}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {isEndIcon && <View style={styles?.endIconStyle}>{isEndIcon}</View>}
      </View>
      {isError && (
        <AppText
          text={isError}
          style={{
            fontSize: 13,
            color: AppColors?.redColor,
            fontFamily: AppFontFamily?.Medium,
            marginVertical: 5,
          }}
        />
      )}
    </View>
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  inputContainer: {},
  inputMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AppColors?.black,
    borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
    height: 50,
    borderColor: AppColors?.grayColor,
    color: AppColors?.black,
    fontSize: 14,
    fontFamily: AppFontFamily?.Regular,
    marginHorizontal: 5,
  },
  iconView: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  labelStyle: {
    fontSize: 15,
    color: AppColors?.black,
    fontFamily: AppFontFamily?.Medium,
    marginVertical: 10,
  },
  endIconStyle: { alignSelf: 'center', marginHorizontal: 10 },
});
