import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SearchBar from '../../../components/atoms/SearchBar/SearchBar';
import { Navigation, NotebookPen } from 'lucide-react-native';
import { startNewChat } from '../../../redux/features/Chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppColors, AppFontFamily } from '../../../themes';
import { SessionSelector } from '../../../redux/features/Chat/chatSelecor';
import AppText from '../../../components/atoms/AppText/AppText';
import { useAppNavigation } from '../../../utils/navigationHelper';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const CustomSideMenu = () => {
  const sessions = useSelector(SessionSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { navigateTo } = useAppNavigation();
  const handleNewChat = () => {
    dispatch(startNewChat({ sessionName: 'New Chat' }));
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const renderSession = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateTo('Chat', { id: item?.sessionId });
        }}
      >
        <AppText
          text={item?.messages[0]?.content.slice(0, 30) || 'New chat'}
          style={styles.contentName}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <SearchBar style={styles.searchBar} />
        <TouchableOpacity style={styles.noteIcon} onPress={handleNewChat}>
          <NotebookPen color={AppColors.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSession}
      />
    </View>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  searchBar: {
    width: 250,
    marginHorizontal: 10,
  },
  noteIcon: { alignSelf: 'center' },
  contentName: {
    color: AppColors.black,
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 20,
    fontFamily: AppFontFamily.Medium,
  },
});
