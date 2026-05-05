# CommentX

AI-Powered Video Commentary Browser Extension.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder.

## YOLOv8 Model

Download the YOLOv8 nano model and place it in `src/models/yolov8n.onnx`.
To export it:
```bash
pip install ultralytics
yolo export model=yolov8n.pt format=onnx imgsz=640
```

## Cloudflare Proxy

Deploy the proxy backend to Cloudflare Workers:
```bash
cd proxy
npm install -g wrangler
wrangler deploy
```
