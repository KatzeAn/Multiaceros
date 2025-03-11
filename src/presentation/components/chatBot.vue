<template>
    <div class="w-[450px] h-[500px] min-h-[500px] border border-gray-300 rounded-lg flex flex-col bg-white shadow-lg">
      <div class="text-white p-3 flex items-center justify-between bg-[#00335B]">
        <div class="flex items-center">
          <img :src="avatar" alt="Avatar" class="w-8 h-8 rounded-full mr-3">
          <span class="font-bold">Chatbot</span>
        </div>
        <el-button type="text" @click="$emit('closeChat')" class="hover:text-white">
          <el-icon class="text-white"><Close /></el-icon>
        </el-button>
      </div>
  
      <div ref="messagesContainer" class="flex-1 p-3 overflow-y-auto bg-gray-100 space-y-3 flex flex-col">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          :class="[
            'p-2 rounded-lg max-w-[80%] break-words flex',
            message.sender === 'user' 
              ? 'bg-[#00335B] text-white self-end ml-auto' 
              : 'bg-white text-black self-start mr-auto'
          ]"
          class="message"
        >
          <p>{{ message.text }}</p>
        </div>
      </div>
  
      <div class="p-3 border-t border-gray-300 flex items-center space-x-2">
        <el-input 
          v-model="newMessage" 
          placeholder="Escribe un mensaje..." 
          @keyup.enter="sendMessage"
          class="flex-grow"
        />
        <el-button class="!bg-[#00335B] !text-white hover:opacity-90" @click="sendMessage">
          Enviar
        </el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        avatar: 'src/presentation/assets/avatar.png',
        messages: [
          { id: 1, text: 'Hola, ¿cómo estás?', sender: 'bot' },
          { id: 2, text: '¡Hola! Estoy bien, gracias.', sender: 'user' },
        ],
        newMessage: '',
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          this.messages.push({
            id: Date.now(),
            text: this.newMessage,
            sender: 'user',
          });
          this.newMessage = '';
          this.scrollToBottom();
        }
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      },
    },
    mounted() {
      this.scrollToBottom();
    },
  };
  </script>
  