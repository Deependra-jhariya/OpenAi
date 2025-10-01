import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import AppText from "../../components/atoms/AppText/AppText";
import { AppColors, AppFontFamily } from "../../themes";
import ThemeInput from "../../components/atoms/ThemeInput/ThemeInput";
import { CircleArrowUp, Copy, NotebookPen, Share2 } from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/atoms/AppHeader/AppHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useChat } from "../../hooks/useChat";

const Chat = (props: any) => {
  const id = props?.route?.params?.id;
  const navigation = useNavigation();

  const {
    userMessage,
    setUserMessage,
    initializeSession,
    sendMessage,
    createNewChat,
    currentSession,
    flatListRef,
    handleCopy,
    handleShare,
  } = useChat(id);

  useEffect(() => {
    initializeSession();
  }, [id]);

  const renderMessage = ({
    item,
  }: {
    item: { role: string; content: string };
  }) => {
    const isUser = item.role === "user";
    return (
      <View>
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
              alignSelf: "flex-start",
            }}
          />
        </View>
        {!isUser && (
          <View style={styles.copyContainer}>
            <TouchableOpacity
              onPress={() => {
                handleCopy(item.content);
              }}
            >
              <Copy color={AppColors.grayColor} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleShare(item.content);
              }}
            >
              <Share2 color={AppColors.grayColor} size={18} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <AppHeader
        isMenuIcon
        tittle="ChatGpt"
        onRightIcon={
          <TouchableOpacity onPress={createNewChat}>
            <NotebookPen />
          </TouchableOpacity>
        }
        onMenuIcon={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "padding" : "height"}
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
              text={"What can I help with?"}
              style={styles.HeadingText}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <ThemeInput
            placeholder="Ask anything..."
            style={styles.input}
            inputContainerStyle={styles.inputContainersty}
            value={userMessage}
            placeholderColors={AppColors.white}
            onChangeText={setUserMessage}
            isEndIcon={
              <TouchableOpacity onPress={sendMessage}>
                {userMessage && <CircleArrowUp color={AppColors.white} />}
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
    maxWidth: "75%",
    padding: 5,
    marginVertical: 6,
    borderRadius: 12,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
    backgroundColor: AppColors.lightBlack,
  },
  aiBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
    backgroundColor: AppColors.ExtralightGray,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: AppColors.grayColor,
  },
  input: { height: 45, color: AppColors.white },
  headingContainer: { flex: 1, justifyContent: "center" },
  HeadingText: {
    color: AppColors.black,
    fontSize: 20,
    fontFamily: AppFontFamily.Bold,
    textAlign: "center",
  },
  newChatBtn: {
    padding: 12,
    alignItems: "center",
  },

  copyContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  inputContainersty: {
    borderRadius: 20,
    backgroundColor: AppColors.lightBlack,
  },
});
