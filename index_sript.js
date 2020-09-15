
//FUNCIONES PRINCIPALES PRECARGA

// document.getElementById("html").style.overflow = "hidden";
google.script.run.withSuccessHandler(tabla).solicitudesAltas();
google.script.run.withSuccessHandler(armarTablaOperaciones).solicitudesOperaciones();

setInterval("google.script.run.withSuccessHandler(tabla2).solicitudesAltas();",60000);

