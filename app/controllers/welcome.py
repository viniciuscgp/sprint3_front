from flask import render_template
from app import app


@app.route("/welcome.html")
def welcome():
    return render_template("welcome.html")

