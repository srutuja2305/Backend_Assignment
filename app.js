const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./models/index.js');
const { authenticateToken } = require('./middleware/auth.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);
app.use('/items', require('./routes/itemRoutes.js'));
app.use('/bids', require('./routes/bidRoutes.js'));
app.use('/notifications', require('./routes/notificationRoutes.js'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('placeBid', (data) => {
        io.emit('newBid', data);
    });

    socket.on('notify', (data) => {
        io.emit('newNotification', data);
    });
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
