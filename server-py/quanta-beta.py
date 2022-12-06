from flask import Flask, request
from flask_socketio import SocketIO, emit
import numpy as np
import random
import string
import process


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
all_users = {}

@socketio.on('connect')
def test_connect():
    all_users[request.args.get('id')] = request.sid   

@socketio.on('request-key')
def handle_request_key(json):
    # bits = process.bit_generator()
    # temp = ""
    # message,encoding_bases = process.encoder(bits)
    # temp = str(message)
    # temp2 = np.array(temp)
    # temp2.tobytes()
    # print(temp2)
    key = "lol"
    socketio.emit('response', {"key":key}, room=all_users[json['sender']])
    socketio.emit('response', {"key":key} ,room=all_users[json['receiver']])

    # @socketio.on('decode')
    # def handle_decode(json):
    #     results,decoding_bases = process.measure(json['key'])
    #     user_1_key = process.key_gen(encoding_bases,decoding_bases,bits)
    #     user_2_key = process.key_gen(encoding_bases,decoding_bases,results)
    #     user_1, user_2 = process.sampler(user_1_key,user_2_key)
    #     if user_1==user_2:
    #         socketio.emit("response",{"key":user_1_key}, room=all_users[json['sender']])
    #         socketio.emit("response",{"key":user_2_key}, room=all_users[json['reciever']])












if __name__ == "__main__":
    socketio.run(app, host='localhost', port=4444,debug=True)
