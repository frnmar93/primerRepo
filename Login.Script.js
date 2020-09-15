function enviar(data){
    // var data = {user: "Franco" ,pass: "urbana"};
    var hoja = SpreadsheetApp.openById("1wG-XYojdBRgE5MThxRznAMIxKuXmOMy4mObaP4wPRcw").getSheets()[0];
    var lr = hoja.getLastRow();
    var lc = hoja.getLastColumn();
    var usuarios = hoja.getRange(2, 1,lr,10).getValues();
    var usuario = usuarios.filter(function(item){
        Logger.log(item)
        Logger.log(data.user)
        if (item[0]==data.user){
            if(item[4]==data.pass){
                return true;
            }
        }else{ 
            return false;
        }
    },this.data)
    usuario = usuario[0];
    // var url = ScriptApp.getService().getUrl;           
    var url = ScriptApp.getScriptId(); 
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
        login: "ok",
    }
    return JSON.stringify(obj);

}