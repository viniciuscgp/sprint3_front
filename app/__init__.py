from flask import Flask

app = Flask(__name__)

from app.controllers import default
from app.controllers import error
from app.controllers import login
from app.controllers import register
from app.controllers import welcome

