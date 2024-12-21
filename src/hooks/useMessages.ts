import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, doc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Message, Conversation } from '@/types/messages';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

export function useMessages(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Listen for messages in a specific conversation
  useEffect(() => {
    if (!conversationId || !user) return;

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date() // Convert Timestamp to Date
        };
      }) as Message[];
      
      setMessages(newMessages);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [conversationId, user]);

  // Listen for user's conversations
  useEffect(() => {
    if (!user) return;

    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newConversations = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lastMessage: data.lastMessage ? {
            ...data.lastMessage,
            createdAt: data.lastMessage.createdAt?.toDate() || new Date()
          } : undefined,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        };
      }) as Conversation[];
      
      setConversations(newConversations);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async (content: string, receiverId: string, campaignId: string) => {
    if (!user) {
      toast.error('You must be logged in to send messages');
      return;
    }

    try {
      // Get or create conversation
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('campaignId', '==', campaignId),
        where('participants', 'array-contains', user.uid)
      );
      
      const snapshot = await getDocs(q);
      let conversationId = snapshot.docs[0]?.id;

      if (!conversationId) {
        // Create new conversation
        const newConversationRef = await addDoc(conversationsRef, {
          campaignId,
          participants: [user.uid, receiverId],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
        conversationId = newConversationRef.id;
      }

      // Add message
      const messagesRef = collection(db, 'messages');
      await addDoc(messagesRef, {
        conversationId,
        campaignId,
        senderId: user.uid,
        receiverId,
        content,
        createdAt: Timestamp.now(),
        read: false
      });

      // Update conversation
      await updateDoc(doc(conversationsRef, conversationId), {
        lastMessage: {
          content,
          createdAt: Timestamp.now()
        },
        updatedAt: Timestamp.now()
      });

      return conversationId;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      throw error;
    }
  };

  return { messages, conversations, loading, sendMessage };
}