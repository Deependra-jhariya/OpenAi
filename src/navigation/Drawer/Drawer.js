import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomSideMenu from "./CustomeSideMenu/CustomSideMenu";
import { AppColors } from "../../themes";
import MainStack from "../MainStack";

const Drawer = createDrawerNavigator();

const DrawerNavigatorLeftMenu = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        drawerStyle: {
          backgroundColor: AppColors?.white,
          width: 300,
        },
        headerShown: false,
        unmountOnBlur: true,
      }}
      drawerContent={(props) => <CustomSideMenu {...props} />}
    >
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorLeftMenu;

const styles = StyleSheet.create({});
