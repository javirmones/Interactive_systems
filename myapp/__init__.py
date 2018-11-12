#!/usr/bin/python
# -*- coding:utf-8; tab-width:4; mode:python -*-

from flask import Flask, make_response, jsonify

from myapp.oils_routes import bp_oils
from myapp.users_routes import bp_users


# Por defecto el root es $PREFIX/var/myapp-instance
app=Flask(__name__, instance_relative_config=False)
app.config.from_pyfile('../instance/development.cfg')

app.register_blueprint(bp_oils)
app.register_blueprint(bp_users)

@app.route('/')
def root():
	return app.send_static_file('static/login.html')

# Este podría ir en otro Blueprint
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not Found'}), 404)

