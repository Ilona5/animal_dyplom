import numpy as np
from PIL import Image, UnidentifiedImageError
import io
from model import model, CLASSES


async def predict_image(file):
    image_bytes = await file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except UnidentifiedImageError:
        return {"error": "INVALID_IMAGE"}

    image = image.resize((224, 224))

    img = np.array(image) / 255.0
    img = np.expand_dims(img, axis=0)

    predictions = model.predict(img)
    idx = int(np.argmax(predictions))
    confidence = float(predictions[0][idx])

    return {
        "animal": CLASSES[idx],
        "confidence": round(confidence, 2)
    }

