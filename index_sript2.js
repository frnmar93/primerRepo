
document.cookie = 'SameSite=Lax; Secure';

//VARIABLES GLOBALES
var v = 0;
var nombre = "NN";
var cantINS = 0;
var generalIns;
var generalOpe;




//####################################################################
// SELECTOR DE TAB SIDEBAR
function SidebarTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//####################################################################
// PARA LOGIN

function formulario(){
  var user = document.getElementById("usuario").value;
  var pass = document.getElementById("pass").value;
  var data = {user: user,pass: pass};
  google.script.run.withSuccessHandler(sesionchk).enviar(data);
}
// document.getElementById("send").addEventListener("click",formulario);
function sesionchk(objeto){
  console.log('entro en sesion chk')
  console.log(objeto)
  if(objeto!="err"){
    console.log("no hay error")
    document.getElementsByClassName("login")[0].setAttribute("class","login scale-transition scale-out");
    M.toast({html: "Hola " + objeto.nombre + "!"})
  }else{
    console.log("sesion no ok")
    M.toast({html: "Nombre de usuario o contraseña invalidos"})
    document.getElementById("usuario").value = "";
    document.getElementById("pass").value = "";
    document.getElementById('usuario').focus(); 
  }
}

//####################################################################
// CARGA PERFIL

function perfil(objeto){
  var obj = JSON.parse(objeto);
  console.log(obj)
  nombre = obj.nombre;
  M.toast({html: "Hola " + nombre + "!"})
}

//####################################################################
// EJECUTA AL CARGAR LA PAGINA -- LOS RETURN ASINCRONOS LLEGAN DESPUES QUE ESTO
  
  document.addEventListener('DOMContentLoaded', function() {
  }, false);
  window.onload = function() {
  };


//####################################################################
// FILTRO BUSQUEDA
  
  $(document).ready(function(){
    $("#headerInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  
  
//####################################################################  
// CARGA SUBTABLA CON DATOS CLIENTES INSTALACIONES

  function ficha(event){
    if(event.target.tagName=="TD"){
      var element = event.target.parentElement.lastChild;
    }else{
      var element = event.target.lastChild;
    }
    if(element.getAttribute("class")=="barraExp"){
      if(element.style.display=="flex"){
        element.style.display="none";
        if(v==1){
          v = 1;
        }else{
          v = 0;
        }
      }else{
        element.style.display="flex";
        v = 1;
      }
    }
  }
//#################################################################### 
//COPIA AL PORTAPAPELES LO QUE CLICKEA

  function copyToClipboard(event){
    console.log(event.target.tagName)
    if(event.target.tagName=="TD"){
      if(event.target.getAttribute("class")=="nombres_mainRow"){
        var str = event.target.innerHTML;
      }else{
        var str = event.target.parentElement.lastChild.innerHTML;
      }
      }else{
      var str = event.target.lastChild.innerHTML;
    }
    console.log(str)
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
//####################################################################
//EXPANDE O CONTRAE TODO LO QUE ESTE EN INSTALACIONES

  function expandir(event){
    var listado = event.currentTarget.parentElement.lastElementChild.firstElementChild.firstElementChild.children;
    if (v==0){
      for(var i=0;i<listado.length;i++){
        listado[i].lastElementChild.style.display="flex";
      }
      v = 1;
    }else{
      for(var i=0;i<listado.length;i++){
        listado[i].lastElementChild.style.display="none";
      }
      v = 0;
    }
  }  

//####################################################################

function listadoPersonalizado(event){
}

//###############################################################

  function tabla(obj){
    var tabla = document.getElementById("tablaInstalaciones");
    // if(tabla.firstElementChild==undefined){      
    //   localStorage.setItem("tablaIns", obj);
    //   armarTablaAltas(obj);
    // }else{
    //   if(localStorage.getItem("tablaIns")==obj){
    //     console.log("no se actualiza")
    //   }else{
    //     if(tabla.firstElementChild.getAttribute("id")=="myTable"){
    //       var temp = document.getElementById("myTable");
    //       tabla.removeChild(temp);
    //     }
    //     console.log("se actualiza")
    //     0
    //   }
    // }

    // var temp = document.getElementById("myTable");
    // tabla.removeChild(temp);
    armarTablaAltas(obj);
  }

  function tabla2(obj){
    var tabla = document.getElementById("tablaInstalaciones");
    var temp = document.getElementById("myTable");
    tabla.removeChild(temp);
    armarTablaAltas(obj);
  }

 
  function armarTablaAltas(objeto){
    
    console.log("armarTablaAltas")
    
    var obj = JSON.parse(objeto);
    generalIns = obj;
    var tabla = document.getElementById("tablaInstalaciones");
    
    
    //CREO CUERPO TABLA
    var bodyTabla = document.createElement("tbody");
    bodyTabla.setAttribute("id","myTable");
    tabla.appendChild(bodyTabla);
    
    document.getElementsByClassName("tituloins")[0].innerHTML="INSTALACIONES (" + obj.length + ")";
    
    var filaHTML = obj.map(function(item,index){
    
      var color = "#f53930";
      switch (item.estado){
        case "A ordenar": color = "#f53930";
        break;
        case "En curso": color = "#e6d501";
        break;
        case "Pendiente": color = "#1079b7";
        break;
        default: color = "black";
        break;
      
      }; 
       
       
      //CREO FILA TR
      var row = document.createElement("tr");
      row.setAttribute("class","mainRow");
      row.setAttribute("ondblclick","ficha(event)"); //ACA ESTA
      bodyTabla.appendChild(row);
      
      //CREO DIVISOR NOMBRE
      var nombree = document.createElement("td");
      nombree.setAttribute("class","nombres_mainRow");
      nombree.setAttribute("onclick","copyToClipboard(event)"); //ACA ESTA
      nombree.innerHTML=obj[index].nombre;
      row.appendChild(nombree);
      
      //CREO DIVISOR DERECHA
      var derecha = document.createElement("td")
      derecha.setAttribute("class","contenedorBadgeDerecha");
      row.appendChild(derecha);
      
      //CREO DIAS
      var dias = document.createElement("div");
      dias.setAttribute("class","dias");
      dias.innerHTML= obj[index].dias + " días";
      derecha.appendChild(dias);
      
      //CREO ICONO MENU
      var menu = document.createElement("i");
      menu.setAttribute("class","menuIcon material-icons tableIcons");
      menu.setAttribute("fila",obj[index].fila);
      menu.innerHTML= "exit_to_app";
      menu.setAttribute("onclick","rightPanel(event)"); //ACA ESTA
      derecha.appendChild(menu);
      
      //CREO DIVISOR BADGE
      var badge = document.createElement("div")
      badge.setAttribute("class","badgeFran");
      badge.setAttribute("style","background-color:"+color);
      badge.innerHTML= obj[index].estado;
      derecha.appendChild(badge);
      
      //CREO DIVISOR SUBTABLA
      var subTabla = document.createElement("td");
      subTabla.setAttribute("class","barraExp");
      subTabla.setAttribute("style","display: none;");
      row.appendChild(subTabla);
      
      //CREO SUBTABLA
      var subTabla2 = document.createElement("table");
      subTabla2.setAttribute("class","subdetalles");
      subTabla.appendChild(subTabla2);
      
      //CREO CUERPO SUBTABLA
      var subTabla3 = document.createElement("tbody");
      subTabla3.setAttribute("onclick","copyToClipboard(event)"); //ACA ESTA
      subTabla2.appendChild(subTabla3);
      
      //CREO FILA DNI
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","DNI");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "DNI/CUIT";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].dni;
      subFila.appendChild(contenido);
      
       //CREO FILA CORREO
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Correo");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Correo";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].correo;
      subFila.appendChild(contenido);
      
      //CREO FILA TELEFONO
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Telefono");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Telefono";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].telefono;
      subFila.appendChild(contenido);
      
      //CREO FILA Direccion
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Direccion");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Direccion";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].direccion;
      subFila.appendChild(contenido);
      
      //CREO FILA Barrio
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Barrio");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Barrio";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].barrio;
      subFila.appendChild(contenido);
      
      //CREO FILA Localidad
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Localidad");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Localidad";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].localidad;
      subFila.appendChild(contenido);
      
      //CREO FILA gps
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","ubicacion");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "GPS";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].ubicacion;
      subFila.appendChild(contenido);
      
      //CREO FILA Altura
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Altura");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Altura";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].viviendaAltura;
      subFila.appendChild(contenido);
      
      //CREO FILA Router
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Router");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Router";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].routerWiFi;
      subFila.appendChild(contenido);
      
      //CREO FILA Pago
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Pago");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Pago";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].comoAbona;
      subFila.appendChild(contenido);
      
      //CREO FILA Disponibilidad;
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Disponibilidad");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Disponibilidad";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].disponibilidad;
      subFila.appendChild(contenido);
      
      //CREO FILA NombreAlter
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","NombreAlter");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "NombreAlter";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].contactoAlternativoNombre;
      subFila.appendChild(contenido);
      
      //CREO FILA NumeroAlter
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","NumeroAlter");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "NumeroAlter";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].contactoAlternativoNumero ;
      subFila.appendChild(contenido);
      
      //CREO FILA Comentarios
      var subFila = document.createElement("tr");
      subFila.setAttribute("class","Comentarios");
      subTabla3.appendChild(subFila);
      
      var titulo = document.createElement("td");
      titulo.innerHTML= "Comentarios";
      subFila.appendChild(titulo);
      
      var contenido = document.createElement("td");
      contenido.innerHTML= obj[index].viviendaExtras;
      subFila.appendChild(contenido);
      
      
      return row;
    })
    
//    var tabla2 = document.getElementById("tablaInstalaciones");
  
    
    
    filaHTML.forEach(function(item,index){      
      bodyTabla.appendChild(item);            
    },this.bodyTabla)
    
  }
  
  
  
  
  
  
  
  
  
  function armarTablaOperaciones(objeto){
    var obj = JSON.parse(objeto);
    
    generalOpe = obj;
    
    armaTablaOpe(obj,"Reparacion","tablaReparaciones","titulorep");
    armaTablaOpe(obj,"Infraestructura","tablaInfraestructura","tituloinf");
    armaTablaOpe(obj,"Retiro","tablaRetiros","tituloret");
    armaTablaOpe(obj,"Mudanza","tablaMudanza","titulomud");
    
    
  }
  
  
    
  function armaTablaOpe(objeto,tipo,tabla,claseTitulo){
  
    console.log("ARMANDO TABLA: " + tabla)
    
    var obj = objeto.filter(function(item) {return item.motivo==tipo},this.tipo);
    var tablaOperaciones = document.getElementById(tabla);
    
//    console.log(obj.length)
    
//    var titulo = document.getElementsByClassName("titulorep")[0];
//    console.log(titulo)
//    titulo.innerHTML = titulo.innerHTML + " (" + obj.length + ")";
    
    var bodyTabla = document.createElement("tbody");
    bodyTabla.setAttribute("id","myTable");
    
    tablaOperaciones.appendChild(bodyTabla);
    
    
    if(obj.length==0){
      tablaOperaciones.setAttribute("style","display: block;text-align: center;");
      tablaOperaciones.innerHTML = "No hay solicitudes de "+tipo;
    }else{
      
      //#################   CREO CUERPO TABLA ###################
      
      var filaHTML = obj.map(function(item,index){
        var color = "#f53930";
          switch (item.estado){
          case "A ordenar": color = "#f53930";
          break;
          case "En curso": color = "#e6d501";
          break;
          case "Pendiente": color = "#1079b7";
          break;
          default: color = "black";
          break;
          
        };     
         
        //CREO FILA TR
        var row = document.createElement("tr")
        row.setAttribute("class","mainRow");
  //      row.setAttribute("onclick","ficha(event)");
        bodyTabla.appendChild(row);
        
        //CREO DIVISOR NOMBRE
        var nombree = document.createElement("td")
        nombree.setAttribute("class","nombres_mainRow");
        nombree.innerHTML=obj[index].nombre;
        row.appendChild(nombree);
        
        //CREO DIVISOR DERECHA
        var derecha = document.createElement("td")
        derecha.setAttribute("class","contenedorBadgeDerecha");
        row.appendChild(derecha);
        
        //CREO DIAS
        var dias = document.createElement("div");
        dias.setAttribute("class","dias");
        dias.innerHTML= obj[index].dias + " días";
        derecha.appendChild(dias);
        
        //CREO DIVISOR BADGE
        var badge = document.createElement("div")
        badge.setAttribute("class","badgeFran");
        badge.setAttribute("style","background-color:"+color);
        badge.innerHTML= obj[index].estado;
        derecha.appendChild(badge);
        
        return row  
        })
      
//      console.log("TABLA ARMADA")
//      console.log(filaHTML)
  
      filaHTML.forEach(function(item,index){
        
        bodyTabla.appendChild(item);
        
        
              
      },this.bodyTabla);
      
      
      tablaOperaciones.setAttribute("style","display: table");
    }

  }
  
//function copiar(event) {
//  var id_elemento = event.getElementById;
//  var aux = document.createElement("input");
//  aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
//  document.body.appendChild(aux);
//  aux.select();
//  document.execCommand("copy");
//  document.body.removeChild(aux);
//}  

  
  
