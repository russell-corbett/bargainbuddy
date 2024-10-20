from flask import Flask, request, jsonify
from matplotlib import pyplot as plt

app = Flask(__name__)

def plot_price_trends(itemID, dates, prices, store):
    plt.figure(figsize=(10, 6))
    plt.scatter(dates, prices, label=store)
    plt.title('Price Trends')
    plt.xlabel('Dates')
    plt.ylabel('Prices($)')
    plt.legend()
    plt.tight_layout()
    output_file = "trends/" + str(itemID) + "_trend.png"
    plt.savefig(output_file)
    plt.close()  # Close the figure to free up memory
    return output_file

@app.route('/plot-price-trends', methods=['POST'])
def plot_price_trends_endpoint():
    data = request.json
    itemID = data['itemID']
    dates = data['dates']
    prices = data['prices']
    store = data['store']
    
    # Call the plot_price_trends function
    output_file = plot_price_trends(itemID, dates, prices, store)
    
    # Return the path to the saved image
    return jsonify({"file_path": output_file})

if __name__ == '__main__':
    app.run(debug=True)
