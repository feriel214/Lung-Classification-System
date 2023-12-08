from flask import Flask, render_template, request, jsonify

import os
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from modelcnn import predict_image_class
app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/symptoms', methods=['GET', 'POST'])
def symptoms():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            predicted_class=predict_image_class(file_path)
          
            return jsonify({'class': predicted_class})

        return jsonify({'error': 'Invalid file format'})
    


    

if __name__ == '__main__':
    app.run(debug=True)

