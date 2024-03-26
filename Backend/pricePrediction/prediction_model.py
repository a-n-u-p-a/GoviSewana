from joblib import load

def selectPredictionModel(cropType):
    # Load the trained model
    if (cropType == "Carrot"):
        model = load('./ML_Components/Price_GradientBoostingRegressor_'+cropType+'.joblib')

    elif (cropType == "Potato"):
        model = load('./ML_Components/Price_DecisionTreeRegressor_'+cropType+'.joblib')

    return model


def selectScaler(cropType):
    # Load the scaler
    scaler = load('./ML_Components/Price_Scaler_'+cropType+'.joblib')
    return scaler


def scale_data(new_data, scaler):
    # Apply the scaling transformation to the new data
    scaled_data = scaler.transform(new_data)
    return scaled_data


# Define a function to make predictions on scaled new data
def make_predictions(scaled_data, model):
    # Make predictions using the loaded model
    predictions = model.predict(scaled_data)
    return predictions