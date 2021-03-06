function UsuariosViewModel() {
    var self = this;
    self.usuariosURI = 'http://127.0.0.1:5000/users/';
    self.usuarios = ko.observableArray();

    self.miAjax = function (uri, method, data) {
        var request = {
            url: uri,
            type: method,
            contentType: "application/json",
            accepts: "application/json",
            cache: false,
            dataType: 'json',
            data: JSON.stringify(data),
            error: function (jqXHR) {
                console.log("Se ha producido un error en una petición Ajax: " + jqXHR.status);
            }
        };

        return $.ajax(request);
    }

    self.anyadir = function () {
        $('#anyadir').modal('show');
    }

    self.guardarNuevo = function (usuario) {
        self.miAjax(self.usuariosURI, 'POST', usuario).done(
            function(data) {
                self.usuarios.push({
                    id: ko.observable(data.usuario.id),
                    nombreUsuario: ko.observable(data.usuario.nombreUsuario),
                    email: ko.observable(data.usuario.email),
                    password: ko.observable(data.usuario.password),
                    activo: ko.observable(true)
                });
            }
        );
    }

    self.editar = function (usuario) {
        editarUsuarioViewModel.mostrarUsuario(usuario);
        $('#editar').modal('show');
    }

    self.guardarModificacion = function (usuarioOriginal, usuarioModificado) {
        self.miAjax(self.usuariosURI + usuarioModificado.id + '/', 'PUT', usuarioModificado).done(
            function (data) {
                data.usuario.id = ko.observable(data.usuario.id);
                data.usuario.nombreUsuario = ko.observable(data.usuario.nombreUsuario);
                data.usuario.email = ko.observable(data.usuario.email);
                data.usuario.password = ko.observable(data.usuario.password);
                self.usuarios.replace(usuarioOriginal,data.usuario);
            });
    }

    self.borrar = function (usuario) {
        alert("Borrar: " + usuario.nombreUsuario());
        console.log(usuario.id());
        self.miAjax(self.usuariosURI + usuario.id() +'/','DELETE').done(
          function(data) {});
          console.log(self.usuarios.length);
          self.usuarios.removeAll();
          console.log(self.usuarios.length);
          self.miAjax(self.usuariosURI, 'GET').done(function (data) {
              for (var i = 0; i < data.usuarios.length; i++) {
                  self.usuarios.push({
                      id: ko.observable(data.usuarios[i].id),
                      nombreUsuario: ko.observable(data.usuarios[i].nombreUsuario),
                      email: ko.observable(data.usuarios[i].email),
                      password: ko.observable(data.usuarios[i].password),
                      activo: ko.observable(true)
                  });
              }
          });

    }

    // Para el get que obtiene la colección de usuarios completa NO pasamos datos
    self.miAjax(self.usuariosURI, 'GET').done(function (data) {
        for (var i = 0; i < data.usuarios.length; i++) {
            self.usuarios.push({
                id: ko.observable(data.usuarios[i].id),
                nombreUsuario: ko.observable(data.usuarios[i].nombreUsuario),
                email: ko.observable(data.usuarios[i].email),
                password: ko.observable(data.usuarios[i].password),
                activo: ko.observable(true)
            });
        }
    });
}

var usuariosViewModel = new UsuariosViewModel();

// Nuevo Modelo de Vista para anyadir usuarios
function AnyadirUsuarioViewModel() {
    var self = this;
    self.nombreUsuario = ko.observable();
    self.email = ko.observable();
    self.activo= ko.observable(true);

    self.anyadirUsuario = function() {
        $('#anyadir').modal('hide');

        usuariosViewModel.guardarNuevo({
            nombreUsuario: self.nombreUsuario(),
            email: self.email(),
            activo: self.activo()
        });
        self.nombreUsuario("");
        self.email("");
    }
}

// Nuevo Modelo de Vista para editar usuarios
function EditarUsuarioViewModel() {
    var self = this;
    self.id = ko.observable();
    self.nombreUsuario = ko.observable();
    self.email = ko.observable();
    self.estado= ko.observable(true);

    self.mostrarUsuario = function(usuario) {
        // Lo copia antes de modificarlo
        self.usuario = usuario;
        self.id(usuario.id())
        self.nombreUsuario(usuario.nombreUsuario());
        self.email(usuario.email());
        self.estado(usuario.activo());
    }

    self.guardarModificacion = function(){
        $('#editar'). modal('hide');
        usuariosViewModel.guardarModificacion(self.usuario, {
            id: self.id(),
            nombreUsuario: self.nombreUsuario(),
            email: self.email(),
            activo: self.estado()
        })
    }
}

var anyadirUsuarioViewModel = new AnyadirUsuarioViewModel();
ko.applyBindings(usuariosViewModel, $('#cuerpo')[0]);
ko.applyBindings(anyadirUsuarioViewModel, $('#anyadir')[0]);
var editarUsuarioViewModel = new EditarUsuarioViewModel();
ko.applyBindings(editarUsuarioViewModel, $('#editar')[0]);
