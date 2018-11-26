#!/usr/bin/python
# -*- coding: utf-8; mode: python -*-

import random
import json
from flask import Blueprint, jsonify, abort, make_response, request, url_for, render_template, redirect

from myapp.models import users

bp_users = Blueprint("bp_users", __name__)

# OPERACIONES sobre users

@bp_users.route('/users/', methods = ['GET'])
def getUsers():
    return make_response(jsonify({'users':users}), 200)

def delUser(id_user):
    aux = list(filter(lambda t:t['user'] == id_user, users))
    if len(aux) == 0:
        abort(404)
    users.remove(aux[0])
    return make_response(jsonify({'deleted':aux[0]['name']}), 200)

def getUser(id_user):    
    aux = list(filter(lambda t:t['user'] == str(id_user), users))
    if len(aux) == 0:
        abort(404)
    return make_response(jsonify(aux[0]), 200)

def addUser(id_user):
    aux = list(filter(lambda t:t['user'] == id_user, users))
    
    user        = ""
    password    = ""

    if request.json and 'user' in request.json:

        user        = request.json['user']
        password    = request.json['password']

    if len(aux) != 0:
        aux[0]['user'] = user
        return make_response(jsonify({"updated":str(user)}), 200)
        
    new_user = {"id_user"   : str(id_user),
                "user"      : str(user),
                "password"  : str(password)
                }
    users.append(new_user)
    return make_response(jsonify({"id_user":str(id_user)}), 201)

@bp_users.route('/users/<path:id_user>', methods = ['DELETE', 'PUT', 'GET'])
def manager_users(id_user):
    if request.method == 'GET':
        return getUser(id_user)
    elif request.method == 'PUT':
        return addUser(id_user)
    elif request.method == 'DELETE':
        return delUser(id_user)

@bp_users.route('/login/', methods = ['POST'])
def make_login():
    
    user        = ""
    password    = ""

    if request.json and 'user' in request.json:

        user        = request.json['user']
        password    = request.json['password']

    aux = list(filter(lambda t:t['user'] == user, users))

    if len(aux) != 0:
        if (aux[0]['user'] == user):
            if(aux[0]['password'] == password):
                return redirect(url_for('127.0.0.1:5000/index.html'))
