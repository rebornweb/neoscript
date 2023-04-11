from sklearn import tree

def predict_fruit(weight, texture):
    # Define the features and labels
    features = [[140, 1], [130, 1], [150, 0], [170, 0]]
    labels = [0, 0, 1, 1]

    # Train a decision tree classifier on the features and labels
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(features, labels)

    # Use the trained model to make a prediction
    new_fruit = [[weight, texture]]
    prediction = clf.predict(new_fruit)

    # Return the prediction
    if prediction == 0:
        return "apple"
    else:
        return "orange"

# Test the function with some example inputs
print(predict_fruit(160, 0)) # should output "orange"
print(predict_fruit(120, 1)) # should output "apple"
