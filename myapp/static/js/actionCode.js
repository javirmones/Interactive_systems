$( document ).ready(function() {
  $( ".nav_link_home" ).click(function() {
    $('#cuerpo').show();
    $('#prueba').hide();
    $('#informacion').hide();

  });

  $( ".nav_link_aceites" ).click(function() {
    $('#prueba').show();
    $('#cuerpo').hide();
    $('#informacion').hide();
    $("#boton_aniadir").hide();
  });

  $( ".nav_link_info" ).click(function() {
    $('#informacion').show();
    $('#prueba').hide();
    $('#cuerpo').hide();

  });

  $('#boton-cambio').click(function(){
   $('#imagen').replaceWith('<img src="img/other.png" id="imagen" alt="..." class="img-thumbnail">');
  });
  
  $("#mostrar_aceite").on('hidden.bs.modal', function () {
    //alert("Esta accion se ejecuta al cerrar el modal")
   $('#imagen').replaceWith('<img src="img/potion.jpg" id="imagen" alt="..." class="img-thumbnail">');

  });
});
