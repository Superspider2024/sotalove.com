const Messages = require("../models/message.js");
const Chats = require("../models/chats.js");

const socketHandler = async (socket, io) => {
  try {
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat ${chatId}`);
    });

    socket.on('sendMessage', async (data) => {
      const { chatId, sender, receiver, content, imageTrue } = data;


      const newMessage = new Messages({
        sender,
        receiver,
        content,
        imageTrue,
        chatId,
        created: Date.now(),
      });

      await newMessage.save();


      const updatedChat = await Chats.findOneAndUpdate(
        { chatId },
        {
          $set: { lastUpdated: Date.now(), latestMessage: content },
          ...(imageTrue && { $push: { images: content } }),
        },
        { new: true }
      );

      if (!updatedChat) {
        const chatData = {
          chatId,
          participants: [sender, receiver],
          latestMessage: content,
          lastUpdated: Date.now(),
        };

        if (imageTrue) {
          chatData.images = [content];
        }

        const newChat = await Chats.create(chatData);

        if (!newChat) {
          throw new Error("Error in creation of chat");
        }
      }

      io.to(chatId).emit('newMessage', {
        chatId,
        sender,
        content,
        imageTrue,
        created: newMessage.created,
      });
    });

    socket.on("messagesReadByReceiver",async(data)=>{
        const chatId=data.chatId
        const sender=data.sender.toLowerCase()

        await Messages.updateMany(
          { chatId, sender, isRead: false },
          { $set: { isRead: true } }
        );


        socket.to(chatId).emit("MessagesReadToSender",{
          sender,
        })


    })

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  } catch (e) {
    console.error("ERROR:", e.message);
  }
};

module.exports = socketHandler;
