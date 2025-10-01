import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AppText from '../../components/atoms/AppText/AppText';
import { AppColors, AppFontFamily } from '../../themes';
import ThemeInput from '../../components/atoms/ThemeInput/ThemeInput';
import { CircleArrowUp, NotebookPen } from 'lucide-react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  startNewChat,
  setCurrentSession,
} from '../../redux/features/Chat/chatSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/atoms/AppHeader/AppHeader';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Chat = (props: any) => {
  const [userMessage, setUserMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const id = props?.route?.params?.id;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const sessions = useSelector((state: RootState) => state.chat.sessions);
  const currentSessionId = useSelector(
    (state: RootState) => state.chat.currentSessionId,
  );
  const currentSession = sessions.find(
    session => session.sessionId === currentSessionId,
  );


  useEffect(() => {
    if (id) {
      dispatch(setCurrentSession(id)); // ✅ set correct session
    }
  }, [id]);

  useEffect(() => {
    if (!currentSession) {
      dispatch(startNewChat({ sessionName: 'New Chat' }));
    }
  }, []);

  const handleOpenApi = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user', content: userMessage };
    dispatch(addMessage(newUserMessage));
    setUserMessage('');

    try {
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...(currentSession?.messages || []),
        newUserMessage,
      ];

      const response = await axios.post(
        'https://our-cafe-backend.onrender.com/api/v1/OpenAi/chat',
        { messages },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const aiReply =
        response?.data?.data?.choices?.[0]?.message?.content || 'No response';
      dispatch(addMessage({ role: 'assistant', content: aiReply }));

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error: any) {
      console.log('Something went wrong on Open Ai.', error.message);
    }
  };

  const renderMessage = ({
    item,
  }: {
    item: { role: string; content: string };
  }) => {
    const isUser = item.role === 'user';
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <AppText
          text={item.content}
          style={{
            color: isUser ? AppColors.white : AppColors.black,
            fontFamily: AppFontFamily.Medium,
            padding: 10,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };

  const handleNewChat = () => {
    dispatch(
      startNewChat({
        sessionName:
          userMessage && userMessage.trim().length > 0
            ? userMessage.slice(0, 20)
            : 'New Chat',
      }),
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <AppHeader
        isMenuIcon
        tittle="ChatGpt"
        onRightIcon={
          <TouchableOpacity onPress={handleNewChat}>
            <NotebookPen />
          </TouchableOpacity>
        }
        onMenuIcon={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headingContainer}>
          {currentSession?.messages.length ? (
            <FlatList
              ref={flatListRef}
              data={currentSession?.messages}
              renderItem={renderMessage}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.messageList}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
            />
          ) : (
            <AppText
              text={'What can I help with?'}
              style={styles.HeadingText}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <ThemeInput
            placeholder="Ask anything..."
            style={styles.input}
            value={userMessage}
            placeholderColors={AppColors.black}
            onChangeText={setUserMessage}
            isEndIcon={
              <TouchableOpacity onPress={handleOpenApi}>
                {userMessage && <CircleArrowUp />}
              </TouchableOpacity>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.white },
  messageList: { padding: 12 },
  messageBubble: {
    maxWidth: '75%',
    padding: 5,
    marginVertical: 6,
    borderRadius: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    backgroundColor: AppColors.lightBlack,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    backgroundColor: AppColors.ExtralightGray,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: AppColors.grayColor,
  },
  input: { height: 45 },
  headingContainer: { flex: 1, justifyContent: 'center' },
  HeadingText: {
    color: AppColors.black,
    fontSize: 20,
    fontFamily: AppFontFamily.Bold,
    textAlign: 'center',
  },
  newChatBtn: {
    padding: 12,
    alignItems: 'center',
  },
});
