from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import random
import string


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
all_users = []

@socketio.on('connect')
def test_connect():
    all_users.append(request.args.get('id'))   
    print(all_users)

    
    @socketio.on('request-key')
    def handle_request_key(json):
        curr_sender = all_users.index(json['sender'])
        curr_receiver = all_users.index(json['receiver'])
        key = ''.join(random.choice(string.ascii_uppercase + string.digits)
                    for _ in range(6))
        socketio.emit('key', {'key': key}, room=curr_receiver)
        socketio.emit('key', {'key': key}, room=curr_sender)


# @app.route('/encrypt', methods=['GET'])
# def message():
    # res = ''.join(random.choices(string.ascii_uppercase + string.digits, k=64))
#     return str(res)


if __name__ == "__main__":
    socketio.run(app, host='localhost', port=4444,debug=True)
