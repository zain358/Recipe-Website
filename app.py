from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

# Load recipes from JSON file
def load_recipes():
    with open('static/recipes.json', 'r') as file:
        return json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    query = request.args.get('search', '').lower()
    recipes = load_recipes()
    
    if query:
        filtered_recipes = [
            recipe for recipe in recipes
            if query in recipe['title'].lower() or
            query in recipe['description'].lower() or
            query in recipe['category'].lower()
        ]
    else:
        filtered_recipes = recipes
    
    return jsonify(filtered_recipes)

if __name__ == '__main__':
    app.run(debug=True)