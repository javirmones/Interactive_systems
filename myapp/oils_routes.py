#!/usr/bin/python
# -*- coding: utf-8; mode: python -*-


import random
import json
from flask import Blueprint, jsonify, abort, make_response, request, url_for
from myapp.models import oils

bp_oils=Blueprint("bp_oils", __name__)

# OPERACIONES sobre oils
@bp_oils.route('/oils/', methods = ['GET'])
def getOils():
    return make_response(jsonify({"oils":oils}), 200)
# Eliminar aceite
def delOil(id_oil):
    aux = list(filter(lambda t:t['id_oil'] == str(id_oil), oils))
    if len(aux) == 0:
        abort(404)
    oils.remove(aux[0])
    return make_response(jsonify({'deleted':aux[0]['nombre']}), 200)
# Obtener aceite
def getOil(id_oil):
    aux = list(filter(lambda t:t['id_oil'] == str(id_oil), oils))
    if len(aux) == 0:
        abort(404)
    return make_response(jsonify(aux[0]), 200)
# Aniadir aceite 
def addOil(id_oil):
    aux = list(filter(lambda t:t['nombre'] == id_oil, oils))

    nombre              = ""
    nombreLatino        = ""
    descripcion         = ""
    familia             = ""
    procedencia         = ""
    extraccion          = ""
    descripcionOlf      = ""
    apariencia          = ""
    notaDePerf          = ""
    perfume             = ""
    solubilidad         = ""
    usos                = ""
    propiedades         = ""

    if request.json and 'descripcion' in request.json:
        nombre              = request.json['nombre']
        nombreLatino        = request.json['nombreLatino']
        descripcion         = request.json['descripcion']
        familia             = request.json['familia']
        procedencia         = request.json['procedencia']
        extraccion          = request.json['extraccion']
        descripcionOlf      = request.json['descripcionOlf']
        apariencia          = request.json['apariencia']
        notaDePerf          = request.json['notaDePerf']
        perfume             = request.json['perfume']
        solubilidad         = request.json['solubilidad']
        usos                = request.json['usos']
        propiedades         = request.json['propiedades']

    if len(aux) != 0:
        aux[0]['nombre'] = nombre
        return make_response(jsonify({"updated":str(nombre)}), 200)

    new_id = int(oils[-1]['id_oil']+1)

    new_ps = {"id_oil"              : str(new_id),
                "nombre"            : str(id_oil),
                "nombreLatino"      : str(nombreLatino),
                "familia"           : str(familia),
                "procedencia"       : str(procedencia),
                "extraccion"        : str(extraccion),
                "descripcionOlf"    : str(descripcionOlf),
                "apariencia"        : str(apariencia),
                "notaDePerf"        : str(notaDePerf),
                "perfume"           : str(perfume),
                "solubilidad"       : str(solubilidad),
                "usos"              : str(usos),
                "descripcion"       : str(descripcion),
                "propiedades"       : str(propiedades)
        }
    oils.append(new_ps)
    return make_response(jsonify({"id_oil":str(id_oil)}), 200)

@bp_oils.route('/oils/<path:id_oil>/', methods = ['DELETE', 'PUT', 'GET'])
def manager_oils(id_oil):
    if request.method == 'GET':
        return getOil(id_oil)
    elif request.method == 'PUT':
        return addOil(id_oil)
    elif request.method == 'DELETE':
        return delOil(id_oil)
