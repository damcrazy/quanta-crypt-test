from flask import Flask,request
from flask_socketio import SocketIO, emit,send
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")



@socketio.on('connect')
def connection():
    print('connected')
    id = request.query_string.decode('utf-8').split("&")[0].split("=")[1]
    socketio.join(id)
    @socketio.on('send-message')
    def message(data):
        text = data.get('text')
        for recipient in data.get('recipients'):
            newRecipients = [r for r in data.get('recipients') if r != recipient]
            newRecipients.append(id)
            print(newRecipients)
            print(type(json.dumps({'text': text, 'recipients': newRecipients,'sender':id})))
            socketio.emit('recive-message', json.dumps({'recipients':newRecipients,'text':text,'sender':id}))


if __name__ == '__main__':
    socketio.run(app, debug=True)