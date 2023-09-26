from flask import render_template
from app import app


@app.route("/register.html")
def register():
    return render_template("register.html")

