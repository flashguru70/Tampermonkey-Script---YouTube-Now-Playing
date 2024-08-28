const WebSocket = require('ws');
const http = require('http');
const fetch = require('node-fetch');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', async function incoming(message) {
        try {
            const data = JSON.parse(message);

            // Ensure that the incoming data contains a URL field
            if (!data || !data.url) {
                console.error("Invalid data format. 'url' field is missing.");
                return;
            }

            const videoId = extractVideoId(data.url);
            if (videoId) {
                const cover = await getVideoCover(videoId);

                // Attach the cover to the existing data
                data.cover = cover;

                // Send the updated data to all connected clients
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
            } else {
                console.error("Could not extract video ID from the URL.");
            }

        } catch (error) {
            console.error("Error processing message:", error);
        }
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

function extractVideoId(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

async function getVideoCover(videoId) {
    try {
        let cover = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        const response = await fetch(cover, { method: 'HEAD' });

        if (response.status !== 200) {
            cover = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }
        return cover;
    } catch (e) {
        console.error("Error fetching cover:", e);
        return 'static/default_cover.jpg';
    }
}

server.listen(8080, function listening() {
    console.log('WebSocket server running on ws://localhost:8080');
});

