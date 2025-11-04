from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def base():
    return render_template('base.html')

@app.route('/flights')
def flights():
    return render_template('flights.html')

@app.route('/stays')
def stays():
    return render_template('stays.html')

@app.route('/cars')
def cars():
    return render_template('cars.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)

