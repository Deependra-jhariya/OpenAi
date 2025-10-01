import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SearchBar from "../../../components/atoms/SearchBar/SearchBar";
import { Navigation, NotebookPen } from "lucide-react-native";
import { startNewChat } from "../../../redux/features/Chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppColors, AppFontFamily } from "../../../themes";
import { SessionSelector } from "../../../redux/features/Chat/chatSelecor";
import AppText from "../../../components/atoms/AppText/AppText";
import { useAppNavigation } from "../../../utils/navigationHelper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import DividerLine from "../../../components/atoms/DividerLine/DividerLine";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomSideMenu = () => {
  const sessions = useSelector(SessionSelector);
  const [selectedId, setSelectedId] = useState(null > null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { navigateTo } = useAppNavigation();
  const handleNewChat = () => {
    dispatch(startNewChat({ sessionName: "New Chat" }));
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredSessions = sessions.filter((session) =>
    session?.messages[0]?.content
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderSession = ({ item }) => {
    const isSelected = selectedId === item?.sessionId;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item?.sessionId);
          navigateTo("Chat", { id: item?.sessionId });
        }}
        style={[styles.sessionItem, isSelected && styles.selectedSession]}
      >
        <AppText
          text={item?.messages[0]?.content.slice(0, 30) || "New chat"}
          style={styles.contentName}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <SearchBar
          style={styles.searchBar}
          placeholder="Search chats..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.noteIcon} onPress={handleNewChat}>
          <NotebookPen color={AppColors.black} />
        </TouchableOpacity>
      </View>

      <DividerLine thickness={0.5} />

      <FlatList
        data={filteredSessions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSession}
      />
    </SafeAreaView>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  searchBar: {
    width: 235,
    marginHorizontal: 10,
  },
  noteIcon: { alignSelf: "center", marginLeft: 5 },
  contentName: {
    color: AppColors.black,
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: AppFontFamily.Regular,
  },
  sessionItem: {
    padding: 5,
  },
  selectedSession: {
    backgroundColor: AppColors.ExtralightGray,
  },
});
