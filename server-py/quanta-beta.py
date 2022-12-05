from flask import Flask, request 
import random
import string


app = Flask(__name__)



@app.route('/encrypt', methods=['GET'])
def message():
    res = ''.join(random.choices(string.ascii_uppercase + string.digits, k=64))
    return str(res)


if __name__ == "__main__":
    app.run(host='localhost',port=4444,debug=True)