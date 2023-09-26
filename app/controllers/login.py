from flask import render_template
from app import app


@app.route("/login.html")
def login():
    return render_template("login.html")

