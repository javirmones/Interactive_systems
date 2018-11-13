function AceitesViewModel() {
    var self = this;
    self.aceitesURI = 'http://127.0.0.1:5000/oils/';
    self.aceites = ko.observableArray();

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

    self.mostrar_aceite = function (){
        $('#mostrar_aceite').modal('show');
    }

    self.guardarNuevo = function (usuario) {
        self.miAjax(self.aceitesURI, 'POST', usuario).done(
            function(data) {
                self.aceites.push({
                    id: ko.observable(data.usuario.id),
                    nombreUsuario: ko.observable(data.usuario.nombreUsuario),
                    email: ko.observable(data.usuario.email),
                    activo: ko.observable(data.usuario.activo)
                });
            }
        );
    }

    self.editar = function (usuario) {
        editarUsuarioViewModel.mostrarUsuario(usuario);
        $('#editar').modal('show');
    }

    self.guardarModificacion = function (usuarioOriginal, usuarioModificado) {
        self.miAjax(self.aceitesURI + usuarioModificado.id + '/', 'PUT', usuarioModificado).done(
            function (data) {
                data.usuario.id = ko.observable(data.usuario.id);
                data.usuario.nombreUsuario = ko.observable(data.usuario.nombreUsuario);
                data.usuario.email = ko.observable(data.usuario.email);
                data.usuario.activo = ko.observable(data.usuario.activo);
                self.aceites.replace(usuarioOriginal,data.usuario);
            });
    }

    self.borrar = function (usuario) {
        alert("Borrar: " + usuario.nombreUsuario());
    }

    // Para el get que obtiene la colección de aceites completa NO pasamos datos
    self.miAjax(self.aceitesURI, 'GET').done(function (data) {
        for (var i = 0; i < data.oils.length; i++) {
            self.aceites.push({
                id: ko.observable(data.oils[i].id_oil),
                nombreAceite: ko.observable(data.oils[i].nombre),
                familia: ko.observable(data.oils[i].familia),
                etiqueta1 : ko.observable(data.oils[i].etiquetas[1]),
                etiqueta2 : ko.observable(data.oils[i].etiquetas[2]),
                etiqueta3 : ko.observable(data.oils[i].etiquetas[3]),
                etiqueta4 : ko.observable(data.oils[i].etiquetas[4]),                
                etiqueta5 : ko.observable(data.oils[i].etiquetas[5]),
                etiqueta6 : ko.observable(data.oils[i].etiquetas[6]),
                etiqueta7 : ko.observable(data.oils[i].etiquetas[7])
            });
        }
    });
}

var aceitesViewModel = new AceitesViewModel();

// Nuevo Modelo de Vista para anyadir aceites
function AnyadirUsuarioViewModel() {
    var self = this;
    self.nombreUsuario = ko.observable();
    self.email = ko.observable();
    self.estado= ko.observable(true);

    self.anyadirUsuario = function() {
        $('#anyadir').modal('hide');

        aceitesViewModel.guardarNuevo({
            nombreUsuario: self.nombreUsuario(),
            email: self.email(),
            activo: self.estado()
        });
        self.nombreUsuario("");
        self.email("");
    }
}

// Nuevo Modelo de Vista para editar aceites
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
        aceitesViewModel.guardarModificacion(self.usuario, {
            id: self.id(),
            nombreUsuario: self.nombreUsuario(),
            email: self.email(),
            activo: self.estado()
        })
    }
}

var anyadirUsuarioViewModel = new AnyadirUsuarioViewModel();
ko.applyBindings(aceitesViewModel, $('#cuerpo')[0]);
ko.applyBindings(anyadirUsuarioViewModel, $('#anyadir')[0]);
var editarUsuarioViewModel = new EditarUsuarioViewModel();
ko.applyBindings(editarUsuarioViewModel, $('#editar')[0]);
