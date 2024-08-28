# Installation Guide for the "Now Playing" Integration

This guide will walk you through the installation and setup of the "Now Playing" integration. The integration consists of three files: a Tampermonkey script, an HTML file for OBS display, and a Node.js server script.

## 1. Required Files

- **Tampermonkey Script:** `Tampermonkey Now Playing Youtube-1.0.24.user.js`
- **HTML File:** `now_playing.html`
- **Server Script:** `server_ohne.js`

## 2. Installing the Tampermonkey Script

1. Install the browser extension [Tampermonkey](https://www.tampermonkey.net/) if you haven't already.
2. Open the file `Tampermonkey Now Playing Youtube-1.0.24.user.js` and add the script to Tampermonkey.
3. Enable the script. This script collects the current video information from YouTube and sends it to the server.

## 3. Setting Up the Node.js Server

1. Ensure that Node.js is installed on your system. If not, download and install it from [nodejs.org](https://nodejs.org/).
2. Save the `server_ohne.js` script on your computer.
3. Open a terminal (or command prompt) and navigate to the folder where `server_ohne.js` is located.
4. Run the following command to create a new `package.json`:

    ```bash
    npm init -y
    ```

5. Install the necessary dependencies by running:

    ```bash
    npm install ws
    ```

6. Start the server with the following command:

    ```bash
    node server_ohne.js
    ```

7. The WebSocket server will now be running and ready to receive data from YouTube.

## 4. Setting Up the HTML File in OBS

1. Open OBS Studio.
2. Add a new **Browser Source**.
3. In the settings for the browser source, point it to the `now_playing.html` file on your local computer.
4. Set the dimensions of the source to your desired size (e.g., 1300x300 pixels).
5. Save the settings. The "Now Playing" information will be displayed in your stream as soon as the server receives data.

## 5. How It Works

The Node.js server receives real-time video information from YouTube via the Tampermonkey script (including title, channel, cover, and progress). This data is then sent to the HTML file, which is displayed in OBS. The display updates every few minutes based on the length of the video and is shown for 30 seconds each time.

## 6. Troubleshooting

If you encounter issues, make sure that:

- The Node.js server is running correctly (no errors in the terminal).
- The Tampermonkey script is enabled and working on YouTube.
- The OBS browser source is correctly pointing to the `now_playing.html` file.

Good luck with your "Now Playing" integration!
