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

    self.mostrar_aceite = function (){
        $('#mostrar_aceite').modal('show');
    }
    self.anyadir = function () {
        $('#anyadir_aceite').modal('show');
      }

    self.guardarNuevoAceite = function (aceite) {
        self.miAjax(self.aceitesURI, 'POST', aceite).done(
          function(data) {
            self.aceites.push({
              nombreAceite: ko.observable(data.aceite.nombreAceite),
              nombreUsuario: ko.observable(data.usuario.nombreUsuario),
              email: ko.observable(data.usuario.email),
              activo: ko.observable(data.usuario.activo)
            });
          }
        );
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

function AnyadirAceitesViewModel() {
    var self = this;
    self.nombreAceite          = ko.observable();
    self.nombreLatinoAceite    = ko.observable();
    self.descripcionAceite     = ko.observable();
    self.familiaAceite         = ko.observable();
    self.procedenciaAceite     = ko.observable();
    self.extraccionAceite      = ko.observable();
    self.descOlfAceite         = ko.observable();
    self.aparienciaAceite      = ko.observable();
    self.notaPerfAceite        = ko.observable();
    self.perfumeAceite         = ko.observable();
    self.solubilidadAceite     = ko.observable();
    self.usosAceite            = ko.observable();
    self.propiedadesAceite     = ko.observable();
    

    self.anyadirAceites = function() {
      $('#anyadir_aceite').modal('hide');

      usuariosViewModel.guardarNuevo({
        nombreUsuario: self.nombreUsuario(),
        email: self.email(),
        activo: self.estado()
      });
      self.nombreAceite("");
      self.email("");
    }
  }

var aceitesViewModel = new AceitesViewModel();
ko.applyBindings(aceitesViewModel, $('#prueba')[0]);
var anyadirAceitesViewModel = new AnyadirAceitesViewModel();
ko.applyBindings(anyadirAceitesViewModel, $('#anyadir_aceite')[0])
