from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('flights.html')  # default landing page

@app.route('/flights')
def flights():
    return render_template('flights.html')

@app.route('/cars')
def cars():
    return render_template('cars.html')

@app.route('/stays')
def stays():
    return render_template('stays.html')

if __name__ == '__main__':
    app.run(debug=True)