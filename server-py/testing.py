import socket
from random import randint
import random
from qiskit import QuantumCircuit, Aer, transpile, assemble
import pickle
import numpy as np

def encoder(bits): # function to initiate qubit creation by encoding random bits (user_1 side)
    encoding_bases = []
    message = []
    def random_encoder(detect): # function that encodes (converts) the random binary bits to qubits using random bases
        qc = QuantumCircuit(1, 1)
        if detect == 1:
            print("1 bit detected")
            qc.initialize([0,1],0)
        elements = ['x', 'h', 'y', 'z']
        chosen = random.choice(elements)
        if chosen == 'x':
            qc.x(0)
            encoding_bases.append('x')
        elif chosen == 'y':
            qc.y(0)
            encoding_bases.append('y')
        elif chosen == 'h':
            qc.h(0)
            encoding_bases.append('h')
        elif chosen == 'z':
            qc.z(0)
            encoding_bases.append('z')
        return qc

    for i in range(len(bits)):
        if bits[i] == 1:
            a = random_encoder(1)
            message.append(a)
        elif bits[i] == 0:
            b = random_encoder(0)
            message.append(b)
    return message, encoding_bases
bits = [1]
print(encoder(bits))