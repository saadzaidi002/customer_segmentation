from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

SCALER_PATH = 'scaler.pkl'
MODEL_PATH = 'kmeans_model.pkl'

if os.path.exists(SCALER_PATH) and os.path.exists(MODEL_PATH):
    scaler = joblib.load(SCALER_PATH)
    kmeans = joblib.load(MODEL_PATH)
else:
    scaler = None
    kmeans = None

@app.route('/predict', methods=['POST'])
def predict():
    if not scaler or not kmeans:
        return jsonify({'error': 'Models not trained yet.'}), 500
        
    try:
        data = request.json
        # Expected keys: Total_Spend, Items_Purchased, Average_Rating, Days_Since_Last_Purchase
        # The frontend provides spend, items, age (which corresponds to Days_Since_Last_Purchase),
        # we will mock Average_Rating if missing.
        
        total_spend = data.get('Total_Spend', 0)
        items_purchased = data.get('Items_Purchased', 0)
        avg_rating = data.get('Average_Rating', 4.0)
        days_since = data.get('Days_Since_Last_Purchase', 0)
        
        df = pd.DataFrame([[total_spend, items_purchased, avg_rating, days_since]], 
                          columns=['Total_Spend', 'Items_Purchased', 'Average_Rating', 'Days_Since_Last_Purchase'])
        
        scaled = scaler.transform(df)
        cluster = kmeans.predict(scaled)[0]
        
        return jsonify({
            'cluster': int(cluster),
            'message': 'Prediction successful'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5002, debug=True)
