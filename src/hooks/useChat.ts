import { useState, useRef } from "react";
import { FlatList, Share } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addMessage,
  setCurrentSession,
  startNewChat,
} from "../redux/features/Chat/chatSlice";
import { chatService } from "../services/chatServices/chatServices";
import Clipboard from "@react-native-clipboard/clipboard";

export const useChat = (sessionId: string) => {
  const [userMessage, setUserMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.chat.sessions);
  const currentSessionId = useSelector(
    (state: RootState) => state.chat.currentSessionId
  );
  const currentSession = sessions.find(
    (session) => session.sessionId === currentSessionId
  );

  const initializeSession = () => {
    if (sessionId) {
      dispatch(setCurrentSession(sessionId));
    } else if (!currentSession) {
      dispatch(startNewChat({ sessionName: "New Chat" }));
    }
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    const newUserMessage = { role: "user", content: userMessage };
    dispatch(addMessage(newUserMessage));
    setUserMessage("");

    try {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        ...(currentSession?.messages || []),
        newUserMessage,
      ];

      const aiReply = await chatService.sendMessage(messages);
      dispatch(addMessage({ role: "assistant", content: aiReply }));
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const createNewChat = () => {
    dispatch(
      startNewChat({
        sessionName:
          userMessage && userMessage.trim().length > 0
            ? userMessage.slice(0, 20)
            : "New Chat",
      })
    );
  };

  const handleCopy = (item: string) => {
    Clipboard.setString(item);
  };

  const handleShare = async (message: string) => {
    try {
      const result = await Share.share({
        title: "Visit this site",
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  return {
    userMessage,
    setUserMessage,
    currentSession,
    flatListRef,
    initializeSession,
    sendMessage,
    createNewChat,
    handleCopy,
    handleShare
  };
};
