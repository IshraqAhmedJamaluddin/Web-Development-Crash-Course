from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@localhost:5433/food'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Restaurants(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(80), unique=False)
    restaurant = db.Column(db.String(80), unique=True)

    def __init__(self, city, restaurant):
        self.city = city
        self.restaurant = restaurant
    
    def __repr__(self):
        return '<Restaurant %s>' % self.restaurant

db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=["POST"])
def search():
    search_term = request.form['city']
    search_result = db.session.query(Restaurants).filter(Restaurants.city.ilike(f'%{search_term}%')).all()
    return render_template('results.html', cities = search_result)