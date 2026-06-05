import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

// Mock Data for the Post Feed (Week 2 Requirements)
const MOCK_POSTS = [
  { id: '1', user: 'Alex Doe', content: 'Building my first React Native app!', timestamp: '2 mins ago', likes: 4 },
  { id: '2', user: 'Sam Smith', content: 'Social Connect is looking great.', timestamp: '1 hour ago', likes: 12 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  // Authentication Mock (Week 1)
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authBox}>
          <Text style={styles.title}>Social Connect</Text>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#aaa" />
          <TouchableOpacity style={styles.button} onPress={() => setIsLoggedIn(true)}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Main App Feed (Week 2)
  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      user: 'Current User',
      content: newPostText,
      timestamp: 'Just now',
      likes: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Social Connect Feed</Text>
        <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
          <Text style={{ color: '#e74c3c' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Post Creator */}
      <View style={styles.postCreator}>
        <TextInput 
          style={styles.input} 
          placeholder="What's on your mind?" 
          value={newPostText}
          onChangeText={setNewPostText}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Post Feed List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postUser}>{item.user}</Text>
            <Text style={styles.postTime}>{item.timestamp}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <div style={styles.interactionBar}>
              <TouchableOpacity><Text style={styles.interactionText}>👍 {item.likes} Likes</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
                <Text style={styles.interactionText}>💬 Comment</Text>
              </TouchableOpacity>
            </div>
          </View>
        )}
      />

      {/* Comments Modal */}
      <Modal visible={commentModalVisible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Comments</Text>
            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
              <Text style={{ color: '#007AFF' }}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ fontStyle: 'italic', color: '#666' }}>No comments yet.</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  authBox: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#2c3e50' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  postCreator: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#eee' },
  postCard: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  postUser: { fontWeight: 'bold', fontSize: 16 },
  postTime: { color: '#888', fontSize: 12, marginBottom: 8 },
  postContent: { fontSize: 15, lineHeight: 20, marginBottom: 12 },
  interactionBar: { flexDirection: 'row', gap: 20 },
  interactionText: { color: '#555', fontWeight: '600' }
});
