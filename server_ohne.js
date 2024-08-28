const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Konvertiere den Buffer in einen String
    const messageString = message.toString();
    
    try {
      // Versuche, die Nachricht als JSON zu parsen
      const data = JSON.parse(messageString);
      console.log('Received message from browser script:', data);

      // Leite die Daten an alle verbundenen Clients weiter
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (err) {
      console.error('Failed to parse message as JSON:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');

