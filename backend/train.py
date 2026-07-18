import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import os

def train_model():
    print("Loading data...")
    df = pd.read_csv(r"e:\Pfsinterns\E-commerce Customer Behavior - Sheet1.csv")
    
    # Preprocessing based on notebook
    df.columns = df.columns.str.replace(' ', '_')
    df['Satisfaction_Level'] = df.get('Satisfaction_Level', pd.Series(['Unknown']*len(df))).fillna('Unknown')
    df['Satisfaction_Level'] = df['Satisfaction_Level'].astype('category')
    
    if 'Discount_Applied' in df.columns:
        df['Discount_Applied'] = df['Discount_Applied'].astype(int)
        
    numeric_cols = ['Total_Spend', 'Items_Purchased', 'Average_Rating', 'Days_Since_Last_Purchase']
    
    # Drop rows where these might be completely missing if any (or fill)
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())
    
    X = df[numeric_cols]
    
    print("Scaling...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    print("Clustering...")
    # Improve KMeans parameters for better convergence and accuracy
    kmeans = KMeans(n_clusters=4, init='k-means++', n_init=20, max_iter=500, random_state=42)
    kmeans.fit(X_scaled)
    
    print("Saving models...")
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(kmeans, 'kmeans_model.pkl')
    print("Models saved successfully.")

if __name__ == "__main__":
    train_model()
