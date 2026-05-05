import * as ort from 'onnxruntime-web';

const COCO_CLASSES = [
  'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
  'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
  'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
  'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
  'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
  'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
  'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
  'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
  'hair drier', 'toothbrush'
];

let session = null;

ort.env.wasm.wasmPaths = chrome.runtime.getURL('assets/');

export async function loadYolo() {
  if (session) return;
  try {
    const modelUrl = chrome.runtime.getURL('src/models/yolov8n.onnx');
    session = await ort.InferenceSession.create(modelUrl);
    console.log("CommentX: YOLO model loaded");
  } catch (error) {
    console.error("CommentX: Failed to load YOLO model", error);
  }
}

export async function detect(imageData) {
  if (!session || !imageData) return [];
  
  try {
    const width = imageData.width;
    const height = imageData.height;
    
    const data = imageData.data;
    const float32Data = new Float32Array(3 * 640 * 640);
    
    for (let c = 0; c < 3; c++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (x < 640 && y < 640) {
            const pixelIdx = (y * width + x) * 4;
            const destIdx = c * 640 * 640 + y * 640 + x;
            float32Data[destIdx] = data[pixelIdx + c] / 255.0;
          }
        }
      }
    }
    
    const tensor = new ort.Tensor('float32', float32Data, [1, 3, 640, 640]);
    const results = await session.run({ images: tensor });
    const output = results[session.outputNames[0]].data;
    
    const detections = [];
    const numClasses = 80;
    const numBoxes = 8400;

    for (let i = 0; i < numBoxes; i++) {
      let maxClassProb = 0;
      let classId = -1;

      for (let c = 0; c < numClasses; c++) {
        const prob = output[(4 + c) * numBoxes + i];
        if (prob > maxClassProb) {
          maxClassProb = prob;
          classId = c;
        }
      }

      if (maxClassProb > 0.4) {
        const xc = output[0 * numBoxes + i];
        const yc = output[1 * numBoxes + i];
        const w = output[2 * numBoxes + i];
        const h = output[3 * numBoxes + i];
        
        detections.push({
          label: COCO_CLASSES[classId],
          confidence: maxClassProb,
          bbox: [xc - w/2, yc - h/2, w, h]
        });
      }
    }
    
    return detections;
  } catch (error) {
    console.error("CommentX: YOLO inference failed", error);
    return [];
  }
}
