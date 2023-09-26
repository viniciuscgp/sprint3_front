from flask import render_template
from app import app


@app.route("/")
@app.route("/index.html")
@app.route("/home.html")
@app.route("/editor.html")
def index():
    return render_template("editor.html")

