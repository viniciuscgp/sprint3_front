from flask import render_template
from app import app


@app.route("/<route>")
def error(route):
    return render_template("404.html", route=route)

