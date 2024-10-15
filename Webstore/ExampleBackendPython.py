from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Connect to SQLite Database
def get_db_connection():
    conn = sqlite3.connect('db/inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/products')
def get_products():
    size = request.args.get('size', 'all')
    color = request.args.get('color', 'all')
    crystal = request.args.get('crystal', 'all')
    
    query = "SELECT * FROM collars WHERE 1=1"
    
    filters = []
    if size != 'all':
        query += " AND size=?"
        filters.append(size)
    if color != 'all':
        query += " AND color=?"
        filters.append(color)
    if crystal != 'all':
        query += " AND crystal=?"
        filters.append(crystal)
    
    conn = get_db_connection()
    collars = conn.execute(query, filters).fetchall()
    conn.close()

    return jsonify([dict(ix) for ix in collars])

if __name__ == '__main__':
    app.run(debug=True)
