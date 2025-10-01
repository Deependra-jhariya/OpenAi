import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { DrawerActions, useNavigation } from '@react-navigation/native';
import { AppColors, AppFontFamily } from '../../../themes';
import AppText from '../AppText/AppText';
import { ChevronLeft, Menu } from 'lucide-react-native';
import { useAppNavigation } from '../../../utils/navigationHelper';

interface HeaderProps {
  onMenuIcon?: () => void;
  onRightIcon?: React.ReactNode;
  isMenuIcon?: Boolean;
  isdisableLeftIcon?: Boolean;
  isLogo?: Boolean;
  tittle?: string;
  headerContainerStyle?: ViewStyle;
  tittleStyle?: TextStyle;
  leftIconStyle?: TextStyle | ViewStyle;
}

const AppHeader: React.FC<HeaderProps> = props => {
  const {
    onMenuIcon,
    isMenuIcon,
    isdisableLeftIcon,
    isLogo,
    tittle,
    headerContainerStyle,
    tittleStyle,
    leftIconStyle,
    onRightIcon,
  } = props;

  const navigation = useNavigation();
  const { goBack } = useAppNavigation();

  return (
    <View style={[HeaderStyle?.headerContainer, headerContainerStyle]}>
      <View style={HeaderStyle?.headerView}>
        {isMenuIcon ? (
          <TouchableOpacity
            style={HeaderStyle?.menuIconView}
            onPress={() =>navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Menu color={AppColors.black} size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={HeaderStyle?.menuIconView}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft color={AppColors.black} size={30} />
          </TouchableOpacity>
        )}

        <View style={HeaderStyle?.logoView}>
          <AppText
            text={tittle}
            style={[HeaderStyle?.tittleStyle, tittleStyle]}
          />
        </View>

        {onRightIcon && (
          <View style={HeaderStyle?.menuIconView}>{onRightIcon}</View>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: AppColors?.white,
    paddingHorizontal: 16,
    borderBottomWidth:1,
    borderBottomColor:AppColors.lightBlack
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSty: {
    // height: 25,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menuIconView: {
    alignSelf: 'center',
  },
  tittleStyle: {
    fontSize: 16,
    fontFamily: AppFontFamily.Regular,
    color: AppColors.black,
  },
});
