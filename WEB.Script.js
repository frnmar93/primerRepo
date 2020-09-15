function solicitudesAltas (){
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  var lr = hoja.getLastRow();
  var lc = hoja.getLastColumn();
  var listado = hoja.getRange(1,1,lr,lc).getValues();
  
  var filtrado = listado.filter(function(item){
    return item[26]=="En curso"||item[26]=="A ordenar"}) //item[32]=="true"   item[26]=="En curso"||item[26]=="A ordenar"
 
  var obj = filtrado.map(function(item){
    return {
    nombre: item[2],
    marcaTemporal : item[0],
    idCalendar : item[30],
    correo : item[1],
    direccion : item[6],
    barrio : item[18],
    isp : item[25],
    estado : item[26],
    fecha : item[27],
    dni : item[3],
    telefono : item[4],
    localidad : item[7],
    ubicacion : item[8],
    viviendaAltura : item[9],
    viviendaExtras : item[10],
    plan : item[11],
    routerWiFi : item[12],
    disponibilidad : item[13],
    contactoAlternativoNombre : item[14],
    contactoAlternativoNumero: item[15],
    dondeNosConocio : item[16],
    comoAbona : item[20],
    nota : item[28],
    colorCal : item[29],
    fila : item[24],
    dias: Math.trunc((new Date().getTime() - item[0].getTime())/(1000*60*60*24)),
    }
  })
  
//  Logger.log(obj[15].nombre + "ese era el nombre y es la fila " + obj[15].fila)
    
//  Logger.log(obj[obj.length-1].dias)
  Logger.log(obj)
  return JSON.stringify(obj);
}


function solicitudesOperaciones (){
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[1]; 
  var lr = hoja.getLastRow();
  var lc = hoja.getLastColumn();
  var listado = hoja.getRange(1,1,lr,lc).getValues();
  
  var filtrado = listado.filter(function(item){
    return item[26]=="En curso"||item[26]=="A ordenar"||item[26]=="Pendiente"})
 
  var obj = filtrado.map(function(item){
    return {
    marcaTemporal : item[0],
    motivo : item[1],
    nombre: item[2],
    ip : item[3],
    plan : item[4],
    problemaReparacion : item[5],
    sugerenciaReparacion : item[6],
    comentariosReparacion : item[7],
    direccionMudanza : item[8],
    comentariosMudanza : item[9],
    contactoPrincipalNombre : item[10],
    contactoPrincipalNumero : item[11],
    contactoAlternativoNombre : item[12],
    contactoAlternativoNumero : item[13],
    direccion : item[14],
    ticket: item[15],
    referente : item[16],
    resumenTareaInfra : item[17],
    descripcionTareaInfra : item[18],
    tipoInfra : item[19],
    nodoInfra : item[20],
    corteInfra : item[21],
    fila : item[24],
    estado : item[26],
    fecha : item[27],
    nota : item[28],
    colorCal : item[29],
    idCalendar : item[30],
    dias: Math.trunc((new Date().getTime() - item[0].getTime())/(1000*60*60*24)),
    }
  })
  
//  Logger.log(obj[15].nombre + "ese era el nombre y es la fila " + obj[15].fila)

  
  return JSON.stringify(obj);
}


function solicitudesContratistas (){
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  var lr = hoja.getLastRow();
  var lc = hoja.getLastColumn();
  var listado = hoja.getRange(1,1,lr,lc).getValues();
  
  var filtrado = listado.filter(function(item){
    return item[32]==true}) //item[32]=="true"   item[26]=="En curso"||item[26]=="A ordenar"
 
  var obj = filtrado.map(function(item){
    return {
    nombre: item[2],
    marcaTemporal : item[0],
    idCalendar : item[30],
    correo : item[1],
    direccion : item[6],
    barrio : item[18],
    isp : item[25],
    estado : item[26],
    fecha : item[27],
    dni : item[3],
    telefono : item[4],
    localidad : item[7],
    ubicacion : item[8],
    viviendaAltura : item[9],
    viviendaExtras : item[10],
    plan : item[11],
    routerWiFi : item[12],
    disponibilidad : item[13],
    contactoAlternativoNombre : item[14],
    contactoAlternativoNumero: item[15],
    dondeNosConocio : item[16],
    comoAbona : item[20],
    nota : item[28],
    colorCal : item[29],
    fila : item[24],
    dias: Math.trunc((new Date().getTime() - item[0].getTime())/(1000*60*60*24)),
    }
  })
  
//  Logger.log(obj[15].nombre + "ese era el nombre y es la fila " + obj[15].fila)
    
//  Logger.log(obj[obj.length-1].dias)
  Logger.log(obj)
  return JSON.stringify(obj);
}




function userdb(){
  var correo = Session.getEffectiveUser().getEmail();
  
  Logger.log(Session.getTemporaryActiveUserKey())
//  correo = "obras@mgrupo.com.ar";
  var hoja = SpreadsheetApp.openById("1wG-XYojdBRgE5MThxRznAMIxKuXmOMy4mObaP4wPRcw").getSheets()[0];
  var lr = hoja.getLastRow();
  var lc = hoja.getLastColumn();
  var correos = hoja.getRange(2, 1,lr).getValues()[0];
  var res = correos.indexOf(correo);
  res = res + 2;
  var datos = hoja.getRange(res, 1,1,lc).getValues()[0];
  var obj = {
    mail: datos[0],
    nombre: datos[1],
    apellido: datos[2],
    contraseña: datos[3],
    perfil: datos[4],
    acceso: datos[5],
    vista1: datos[6],
    vista2: datos[7],
    vista3: datos[8],
  }
  Logger.log(obj)
  return JSON.stringify(obj);
   
}



function enviar(data){
  // var data = {user: "Frnco" ,pass: "urbana"};
    var hoja = SpreadsheetApp.openById("1wG-XYojdBRgE5MThxRznAMIxKuXmOMy4mObaP4wPRcw").getSheets()[0];
    var lr = hoja.getLastRow();
    var lc = hoja.getLastColumn();
    var usuarios = hoja.getRange(2, 1,lr,10).getValues();
    var aux;
    var usuario = usuarios.filter(function(item){
  //      Logger.log(item)
  //      Logger.log(data.user)
        if (item[0]==data.user && item[4]==data.pass){
          aux = "true";
          return true;
        }else{
         return false;
        }
    },this.data,this.aux)
    
    var url = ScriptApp.getService().getUrl;        
    
    Logger.log(usuario)
    
    Logger.log(aux)
    
    Logger.log(aux=="true")
    
    usuario = usuario[0];

    if(aux=="true"){
      var obj = {
        usuario: usuario[0],
        mail: usuario[1],
        nombre: usuario[2],
        apellido: usuario[3],
        contraseña: usuario[4],
        perfil: usuario[5],
        acceso: usuario[6],
        vista1: usuario[7],
        vista2: usuario[8],
        vista3: usuario[9],
        url: this.url,
      };
      
    return obj;
    } else{
      return "err";
    }
  }
   
function asigna(val){
  PropertiesService.getScriptProperties().setProperty('tabla', val);
}

function devuelve(){
  return PropertiesService.getScriptProperties().getProperty('tabla');
}





function paraSidebar (fila){
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  var lr = hoja.getLastRow();
  var lc = hoja.getLastColumn();
  var listado = hoja.getRange(1,1,lr,lc).getValues();
  
  var filtrado = listado.filter(function(item){
    return item[24]==fila;
  },this.fila)
 
  // var obj = {
  //   nombre: item[2],
  //   marcaTemporal : item[0],
  //   idCalendar : item[30],
  //   correo : item[1],
  //   direccion : item[6],
  //   barrio : item[18],
  //   isp : item[25],
  //   estado : item[26],
  //   fecha : item[27],
  //   dni : item[3],
  //   telefono : item[4],
  //   localidad : item[7],
  //   ubicacion : item[8],
  //   viviendaAltura : item[9],
  //   viviendaExtras : item[10],
  //   plan : item[11],
  //   routerWiFi : item[12],
  //   disponibilidad : item[13],
  //   contactoAlternativoNombre : item[14],
  //   contactoAlternativoNumero: item[15],
  //   dondeNosConocio : item[16],
  //   comoAbona : item[20],
  //   nota : item[28],
  //   colorCal : item[29],
  //   fila : item[24],
  //   dias: Math.trunc((new Date().getTime() - item[0].getTime())/(1000*60*60*24)),
  // }
  
//  Logger.log(obj[15].nombre + "ese era el nombre y es la fila " + obj[15].fila)
    
//  Logger.log(obj[obj.length-1].dias)
  // Logger.log(obj)
  return JSON.stringify(filtrado);
}


function estado(dato,fila,columna){
  // dato = "A ordenar";
  // fila = 27;
  // columna = 527;
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  hoja.getRange(fila,columna).setValue(dato);
  var cal = CalendarApp.getCalendarById("mgrupo.com.ar_99at4k0mmg2ubbb0e65ru52g1g@group.calendar.google.com");
  var idCal = hoja.getRange(fila,30,1,2).getValues(); //traigo id de evento desde planilla y numero que indica color de evento
  var ev = cal.getEventById(idCal[0][1]); //traigo el evento del calender byID
  ev.setColor(idCal[0][0]); //aplico el color al event
   
}

function cargaDatos(datos){
  var obj = JSON.parse(datos);
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  hoja.getRange(obj.fila,3).setValue(obj.nombre);
  hoja.getRange(obj.fila,2).setValue(obj.correo);
  hoja.getRange(obj.fila,5).setValue(obj.telefono);
  hoja.getRange(obj.fila,7).setValue(obj.direccion);
  hoja.getRange(obj.fila,19).setValue(obj.barrio);
  hoja.getRange(obj.fila,8).setValue(obj.localidad);
  hoja.getRange(obj.fila,9).setValue(obj.ubicacion);
  hoja.getRange(obj.fila,10).setValue(obj.altura);
  hoja.getRange(obj.fila,13).setValue(obj.router);
  hoja.getRange(obj.fila,21).setValue(obj.pago);
  hoja.getRange(obj.fila,14).setValue(obj.disponibilidad);
  hoja.getRange(obj.fila,15).setValue(obj.nombreAlter);
  hoja.getRange(obj.fila,16).setValue(obj.numeroAlter);
  hoja.getRange(obj.fila,11).setValue(obj.comentarios);

}

function comentarios(dato,fila){
  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  hoja.getRange(fila,29).setValue(dato);
}

function contratistaCheck(dato,fila){
    var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
    var hojas = ss.getSheets();
    var hoja = hojas[0]; 
    hoja.getRange(fila,33).setValue(dato);
}

function invitados(fila){

//  fila = 585;

  var ss = SpreadsheetApp.openById("1OcSBvXfJcBOjoTj1BiDCsxnPI_uNpUaKGX35nc6v6uM");
  var hojas = ss.getSheets();
  var hoja = hojas[0]; 
  var idCal = hoja.getRange(fila,31).getValue();
  var cal = CalendarApp.getCalendarById("mgrupo.com.ar_99at4k0mmg2ubbb0e65ru52g1g@group.calendar.google.com");
  var ev = cal.getEventById(idCal); //traigo el evento del calender byID
  Logger.log(ev.getTitle())
  var htmlGuestIcons = "";
  
  var guestList = ev.getGuestList();
  
  if(guestList.lenght!=0){
    Logger.log('entro al if')
    guestList.forEach(function(item){
      Logger.log(item.getEmail())
      var initials = getInitials(item.getEmail())
      Logger.log(initials)
      var htmlTemplate = `
      <div class="profileImage">${initials}</div>
      `;
      htmlGuestIcons = htmlGuestIcons + htmlTemplate;
    },this.htmlGuestIcons);
  }else{
    return "";
  }
  
  Logger.log(htmlGuestIcons)
  return htmlGuestIcons;
   
}

function getInitials(correo){
  Logger.log("paso por aca")
  var initials = "def";
  switch(correo){
    case "hector.mgrupo@gmail.com":initials = "HT";
    break;
    case "nico.mgrupo@gmail.com": initials =  "NA";
    break;
    case "fernavarro0301@gmail.com":  initials =  "FN";
    break;
    case "emmasyscom@gmail.com": initials =  "MC";
    break;
    default: Logger.log('ningun mail de aca');  initials =  "";
  }
  return initials;
}