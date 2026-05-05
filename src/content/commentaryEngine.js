let contextBuffer = [];

export async function generateCommentary({ base64Frame, detections, mode, customPrompt, proxyUrl, authToken }) {
  try {
    const response = await fetch(`${proxyUrl}/api/commentary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        frame: base64Frame,
        detections,
        context: contextBuffer,
        mode,
        customPrompt
      })
    });

    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }

    const result = await response.json();
    const commentary = result.commentary || "";

    const finalString = commentary.trim();
    if (finalString) {
      contextBuffer.push(finalString);
      if (contextBuffer.length > 10) {
        contextBuffer.shift();
      }
      return finalString;
    }
    return null;

  } catch (error) {
    console.error("CommentX: generateCommentary failed", error);
    return null;
  }
}
