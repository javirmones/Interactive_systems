#!/usr/bin/python
# -*- coding: utf-8; mode: python -*-

import random
import json
from flask import Blueprint, jsonify, abort, make_response, request, url_for, render_template, redirect

from myapp.models import usuarios

bp_users = Blueprint("bp_users", __name__)

# OPERACIONES sobre users

@bp_users.route('/users/', methods = ['GET'])
# Obtener todos los usuarios
def getUsers():
    return make_response(jsonify({'usuarios':usuarios}), 200)

# Obtener un usuario
def getUser(id_user):
    aux = list(filter(lambda t:t['id'] == id_user, usuarios))
    if len(aux) == 0:
        abort(404)
    return make_response(jsonify(aux[0]), 200)

# Eliminar un usuario
def delUser(id_user):
    aux = list(filter(lambda t:t['id'] == str(id_user), usuarios))
    if len(aux) == 0:
        abort(404)
    usuarios.remove(aux[0])
    return make_response(jsonify({'deleted':aux[0]['nombreUsuario']}), 200)

# Aniadir usuario
@bp_users.route('/users/', methods = ['POST'])
def addUser():
    if not request.json or not 'email' in request.json:
        abort(404)
    aux = int(usuarios[-1].get('id')) + 1
    id = str(aux)
    nombreUsuario = str(request.json.get('nombreUsuario'))
    email = str(request.json.get('email'))
    password = str(request.json.get('password'))
    usuario = {'id': id, 'nombreUsuario': nombreUsuario, 'email': email ,'password': password }
    usuarios.append(usuario)
    return make_response(jsonify({'usuario':usuario}),201)

#editar usuario
def edit_user(id):
    usuario = [usuario for usuario in usuarios if usuario ['id'] == id]
    usuario[0]['nombreUsuario'] = request.json.get('nombreUsuario', usuario[0]['nombreUsuario'])
    usuario[0]['email'] = request.json.get('email',usuario[0]['email'])
    usuario[0]['password'] = request.json.get('password', usuario[0]['password'])
    return make_response(jsonify({'usuarios':usuario[0]}))

#manager usuarios
@bp_users.route('/users/<path:id_user>/', methods = ['DELETE', 'PUT', 'GET'])
def manager_users(id_user):
    if request.method == 'GET':
        return getUser(id_user)
    elif request.method == 'PUT':
        return edit_user(id_user)
    elif request.method == 'DELETE':
        return delUser(id_user)
