from flask import Flask, request, jsonify
from keras.models import load_model
from keras.preprocessing import image
import numpy as np


app = Flask(__name__)

# Load the trained model
model_path = "Lung-Classification-System.h5"  # Update with your model path
cnn = load_model(model_path)

# Define a mapping between class indices and class names
class_mapping = {0: 'NORMAL', 1: 'PNEUMONIA', 2: 'COVID'}  # Update with your actual mapping

def predict_image_class(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image

    # Make prediction
    prediction = cnn.predict(img_array)

    # Get the predicted class index
    predicted_class_index = np.argmax(prediction)

    # Get the predicted class name
    predicted_class_name = class_mapping.get(predicted_class_index, 'Unknown')

    return predicted_class_name

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        predicted_class = predict_image_class(file)
        return jsonify({'class': predicted_class})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
