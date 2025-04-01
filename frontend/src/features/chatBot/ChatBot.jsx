import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../../hooks/useAuth/useChatBot.js';
import { Box, Button, TextField, Paper, Typography, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChatbot();
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <Box 
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
          sx={{
            borderRadius: '50%',
            width: 60,
            height: 60,
            minWidth: 0,
            boxShadow: 3,
          }}
        >
          <Avatar src="/chatbot-icon.png" />
        </Button>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 350,
        maxWidth: '90vw',
        height: 500,
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Customer Support</Typography>
        <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200',
              color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
              p: 1.5,
              borderRadius: 2,
              wordWrap: 'break-word',
            }}
          >
            {msg.text}
          </Box>
        ))}
        {isLoading && (
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: 'grey.200',
              p: 1.5,
              borderRadius: 2,
            }}
          >
            Typing...
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                color="primary"
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default ChatBot;