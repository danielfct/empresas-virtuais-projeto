function isFullScreen()
{
    return (document.fullScreenElement && document.fullScreenElement !== null)
         || document.mozFullScreen
         || document.webkitIsFullScreen;
}


function requestFullScreen(element)
{
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}

function exitFullScreen()
{
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
}

function toggleFullScreen(element)
{
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element || document.documentElement);
}

var i=1;
var festival=[];
var festivais=[];
var pedidos_VOs=[];
var pedidos_empresas=[];
var VOs=[];
var empresas=[];
var imagens =[];

$(document).ready(function(){
	$('.waves-effect.waves-block.waves-light.toogle-fullscreen').click(function() { 
		toggleFullScreen();
    });

    get_empresas();
    get_VOs();
    get_festivais();
    get_pedidos_VOs();
    get_pedidos_empresas();
    
    $('#logout').click(function(){
        console.log('logout');///fazer o logout
    });

    $('#dashboard').click(function(){
        console.log('click');
        $('#profile-page-wall').html(make_Dashboard());
        empresas.forEach(element => {
            document.getElementById("table_body").innerHTML +=  show_row(element);
        });
        VOs.forEach(element => {
            document.getElementById("VO_table").innerHTML +=  show_row_VO(element, festivais[(element.idFestival)-1]);
        });
        document.getElementById("VOs_number").innerHTML = pedidos_VOs.length;
        document.getElementById("Empresas_number").innerHTML = pedidos_empresas.length;
    });
    
    $('#messages').click(function(){
        console.log(empresas);
        $('#profile-page-wall').html(make_Message());
        empresas.forEach(empresa => {
            console.log(empresa);
            document.getElementById("recetores").innerHTML +=  show_options(empresa);
        });
        document.getElementById('recetores').style.display = "block";
    }); 
    
    $('#VOs').click(function(){
        get_imagem_festival(pedidos_VOs[0].idFestival);
        console.log(pedidos_VOs);
        if(pedidos_VOs.length === 0){
            $('#profile-page-wall').html(make_VOs_1());
        }
        else{
            $('#profile-page-wall').html(make_VOs());
            get_festival(pedidos_VOs, pedidos_VOs[0].idFestival);
            console.log('voltei');  
                $('#ped1').click(function(){ 
                    console.log('clicked');
                    var modal = document.getElementById('modal1');
                    console.log(modal);
                    modal.style.display = 'block';
                });
                $('#ped2').click(function(){   
                    var modal = document.getElementById('modal1');
                    modal.style.display = 'block';
                }); 
                $('#ped3').click(function(){   
                    var modal = document.getElementById('modal1');
                    modal.style.display = 'block';
                }); 
                $('#closeModal').click(function(){   
                    var modal = document.getElementById('modal1');
                    modal.style.display = 'none';
                });
        }         
    });
    
    $('#empresas').click(function(){
        console.log(pedidos_empresas);
        var k=1;
        var ped=0;
        if(pedidos_empresas.length === 0){
            $('#profile-page-wall').html(make_Empresas_1());
        }
        else{
            $('#profile-page-wall').html(make_Empresas());
            pedidos_empresas.forEach(empresa => {
                document.getElementById("pedidos_empresas").innerHTML +=  show_empresas(empresa,k);
                k++;
            });
            $('#ped1').click(function(){   
                var modal = document.getElementById('modal1');
                modal.style.display = 'block';
                ped=1;
            }); 
            $('#ped2').click(function(){   
                var modal = document.getElementById('modal2');
                modal.style.display = 'block';
                ped=2;
            }); 
            $('#ped3').click(function(){   
                var modal = document.getElementById('modal3');
                modal.style.display = 'block';
                ped=3;
            }); 
            $('#closeModal').click(function(){   
                var modal = document.getElementById('modal'+ped);
                modal.style.display = 'none';
            }); 
            $('#aceitar').click(function(){ 
                console.log('aceitou');
                var modal = document.getElementById('modal'+ped);
                console.log(modal);
                modal.style.display = 'none';
                // pedido[0].emailEmpresa="outraempresa@gmail.com";
                //empresa=JSON.stringify(pedidos_empresas[ped-1]);
            // console.log(empresa);
                update_empresa(pedidos_empresas[ped-1]);
            });
            $('#rejeitar').click(function(){ 
                console.log('rejeitou');
                var modal = document.getElementsByClassName('modal');
                console.log(modal);
                modal[0].style.display = 'none';
            });
        }
    });
});

function get_empresas() {
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            empresas = response;
            response.forEach(element => {
                document.getElementById("table_body").innerHTML +=  show_row(element);
            });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=registoAprovado&value=1', true);
    http_request.send();
}

function get_festivais() {
    var data_file = "http://localhost/evr/get_festivais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            festivais = response;
            VOs.forEach(element => {
                document.getElementById("VO_table").innerHTML +=  show_row_VO(element, festivais[(element.idFestival)-1]);
            });
            // response.forEach(element => {
            //     document.getElementById("table_body").innerHTML +=  show_row(element);
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);
    http_request.send();
}

function get_VOs() {
    var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            VOs=response;
            console.log(response);
            //console.log(festivais);
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);//+'?filter=pedidoAprovado&value=1'
    http_request.send();
}

function get_pedidos_VOs(){
    var data_file = "http://localhost/evr/get_pedidos_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();
    
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            pedidos_VOs=response;
            document.getElementById("VOs_number").innerHTML = pedidos_VOs.length;
            // response.forEach(element => {
            //     
            //     console.log(festival);
            //     ////pedidos e festivais problema de assincronia,continuar aqui
            //     
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=pedidoAprovado&value=0', true);
    http_request.send();
}

function get_pedidos_empresas(){
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();
    
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            pedidos_empresas=response;
            document.getElementById("Empresas_number").innerHTML = pedidos_empresas.length;
            //M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=registoAprovado&value=0', true);
    http_request.send();
}

function get_festival(pedido,id) {
    var data_file = "http://localhost/evr/get_festivais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {
        
        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            festival = JSON.parse(http_request.responseText);
            console.log(festival);
            document.getElementById("pedidos").innerHTML +=  show_VOs(pedido[0],1,festival[0]);
            //     i++;
            var a = document.getElementById('ped1');
            console.log(a);
            $('#ped1').click(function(){ 
                console.log('clicked');
                document.getElementById("imagem").src = imagens[0];
                var modal = document.getElementById('modal1');
                console.log(modal);
                modal.style.display = 'block';
                $('#aceitar').click(function(){ 
                    console.log('aceitou');
                    var modal = document.getElementById('modal1');
                    console.log(modal);
                    modal.style.display = 'none';
                    pedido[0].emailEmpresa="outraempresa@gmail.com";
                    update_pedido_VO(pedido[0]);
                    VO=JSON.stringify(pedido[0]);
                    console.log(VO);
                    post_VO(VO);
                });
                $('#rejeitar').click(function(){ 
                    console.log('rejeitou');
                    var modal = document.getElementById('modal1');
                    console.log(modal);
                    modal.style.display = 'none';
                });
            });
            $('#closeModal').click(function(){   
                var modal = document.getElementById('modal1');
                modal.style.display = 'none';
            }); 
            //document.getElementById("pedidos").innerHTML += show_modal(pedido,i,response[0]);
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=ID&value='+id, true);
    http_request.send();
}

function get_imagem_festival(id){
    var data_file = "http://localhost/evr/get_imagem_festival.php";
    var http_request = new XMLHttpRequest();
    var i=1;

    function response(e) {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        console.log(imageUrl);
        imagens.push(imageUrl);
    }   

    http_request.open("GET", data_file+'?id='+id, true);
    http_request.responseType = "blob";
    http_request.onload = response;
    http_request.send();
}

function post_VO(VO){
    var data_file = "http://localhost/evr/post_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            // if(response.mensagem=''){
            //     alert('Pedido submetido. Fique a aguardar resposta');
            // }
            // else{
            //     alert(response.mensagem);
            // }
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(VO);
}

function update_empresa(empresa){
    var data_file = "http://localhost/evr/update_empresa.php";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function () {
        //console.log(empresa);
        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            // if(response.mensagem=''){
            //     alert('Pedido submetido. Fique a aguardar resposta');
            // }
            // else{
            //     alert(response.mensagem);
            // }
        }
    }
    //console.log('{"email":"'+empresa.email+'","registoAprovado":"1"}');
    
    http_request.open("POST", data_file, true);
    http_request.send('{"email":"'+empresa.email+'","registoAprovado":"1"}');
}

function update_pedido_VO(VO){
    var data_file = "http://localhost/evr/update_pedido_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function () {
        //console.log(empresa);
        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            // if(response.mensagem=''){
            //     alert('Pedido submetido. Fique a aguardar resposta');
            // }
            // else{
            //     alert(response.mensagem);
            // }
        }
    }
    //console.log('{"email":"'+empresa.email+'","registoAprovado":"1"}');
    
    http_request.open("POST", data_file, true);
    http_request.send('{"email":"'+VO.email+'","pedidoAprovado":"1"}');//preciso por email e id
}