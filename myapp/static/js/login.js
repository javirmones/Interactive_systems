function go(){
if (document.form.password.value=='javi' && document.form.login.value=='javi'){
        document.form.submit();
        window.location="index.html";
    }
    else{
         alert("Porfavor ingrese, nombre de usuario y contraseña correctos.");
    }
}
