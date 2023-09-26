import os
from dotenv import load_dotenv
from app import app

load_dotenv()

if __name__ == "__main__":
    load_dotenv()
    port = int(os.getenv("PORT", 5006))
    app.run(host='0.0.0.0', port=port, debug=True)
