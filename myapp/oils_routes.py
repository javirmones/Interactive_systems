#!/usr/bin/python
# -*- coding: utf-8; mode: python -*-


import random
import json
from flask import Blueprint, jsonify, abort, make_response, request, url_for
from myapp.models import oils

bp_oils=Blueprint("bp_oils", __name__)

# OPERACIONES sobre oils
@bp_oils.route('/oils', methods = ['GET'])
def getOils():
    return make_response(jsonify({"oils":oils}), 200)

def delOil(id_oil):
    aux = list(filter(lambda t:t['name'] == id_oil, oils))
    if len(aux) == 0:
        abort(404)
    oils.remove(aux[0])
    return make_response(jsonify({'deleted':aux[0]['name']}), 200)

def getOil(id_ps):    
    aux = list(filter(lambda t:t['name'] == str(id_ps), oils))
    if len(aux) == 0:
        abort(404)
    return make_response(jsonify(aux[0]), 200)

def addOil(id_ps):
    aux = list(filter(lambda t:t['name'] == id_ps, oils))

    nombreLatino = ""
    descripcion = ""
    familia = ""
    procedencia = ""
    extraccion = ""
    descripcionOlf = ""
    apariencia = ""
    notaDePerf = ""
    perfume = ""
    solubilidad = ""
    usos = ""
    propiedades = ""

    if request.json and 'descripcion' in request.json:
        nombreLatino = request.json['nombreLatino']
        descripcion = request.json['descripcion']
        familia = request.json['familia']
        procedencia = request.json['procedencia']
        extraccion = request.json['extraccion']
        descripcionOlf = request.json['descripcionOlf']
        apariencia = request.json['apariencia']
        notaDePerf = request.json['notaDePerf']
        perfume = request.json['perfume']
        solubilidad = request.json['solubilidad']
        usos = request.json['usos']
        propiedades = request.json['propiedades']

    if len(aux) != 0:
        aux[0]['descripcion'] = descripcion
        return make_response(jsonify({"updated":str(id_ps)}), 200)
        
    new_ps = {"nombre" : str(id_ps),
                "nombreLatino" : str(nombreLatino),
                "familia" : str(familia),
                "procedencia" : str(procedencia),
                "extraccion" : str(extraccion),
                "descripcionOlf" : str(descripcionOlf),
                "apariencia" : str(apariencia),
                "notaDePerf" : str(notaDePerf),
                "perfume" : str(perfume),
                "solubilidad" : str(solubilidad),
                "usos" : str(usos),
                "descripcion" : str(descripcion),
                "propiedades" : str(propiedades)
        }
    oils.append(new_ps)
    return make_response(jsonify({"id":str(id_ps)}), 201)

@bp_oils.route('/oils/<path:id_ps>', methods = ['DELETE', 'PUT', 'GET'])
def manager_playlist(id_ps):
    if request.method == 'GET':
        return getOil(id_ps)
    elif request.method == 'PUT':
        return addOil(id_ps)
    elif request.method == 'DELETE':
        return delOil(id_ps)
