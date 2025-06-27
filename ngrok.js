const ngrok = require('@ngrok/ngrok');

async function start() {
  // Wait a bit for the server to start (you might need a more robust check)
  await new Promise(resolve => setTimeout(resolve, 8000));

  try {
    // Connect to ngrok with your auth token
    // Make sure NGROK_AUTHTOKEN is set in your .env.local file
    if (!process.env.NGROK_AUTHTOKEN) {
        console.error('NGROK_AUTHTOKEN environment variable is not set.');
        process.exit(1);
    }
    await ngrok.authtoken(process.env.NGROK_AUTHTOKEN);

    // Start a tunnel to your local Next.js port (usually 3000)
    const listener = await ngrok.connect({ addr: 3000 });

    console.log(`Ngrok tunnel started at: ${listener.url()}`);
    console.log('Use this URL in your GitHub webhook settings.');

    // Keep the script running while the tunnel is active
    // You might want to add signal handling (SIGINT, SIGTERM) to close the tunnel gracefully
    process.stdin.resume(); // Keep the process alive

  } catch (error) {
    console.error('Error starting ngrok:', error);
    process.exit(1);
  }
}

start();