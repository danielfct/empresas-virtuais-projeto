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

var mensagens_trocadas = [];
var mensagens_enviadas = [];
var mensagens_recebidas = [];
var tasks = [];
var VOs = [];
var empresa;
var empresas = [];
var i = 0;
var festival;
var empresas_filter = [];
var imagens = [];
var parceiros = [];

var user=JSON.parse(localStorage.getItem('User-Logged'));
console.log(user);


$(document).ready(function(){
	$('.waves-effect.waves-block.waves-light.toogle-fullscreen').click(function() { 
		toggleFullScreen();
    });

    get_VO(user.email);
    get_empresas();
    get_tasks();////////////empresa é que pode dar tarefa como concluida e depois o cliente so da o feedback

    $('#logout').click(function(){
        console.log('logout');///fazer o logout
        localStorage.removeItem('User-Logged');
        location.href = "Homepage.html";
    });
    
    $('#myProfile').click(function(){
        console.log('click');
        $('#profile-page-wall').html(make_Profile(user.nome,user.email,user.telefone,user.localidade,user.numTrabalhadores));
    });
    
    $('#messages').click(function(){
        console.log('clickMessages');
        var type;
        $('#profile-page-wall').html(make_Message());
        $('#private').click(function () {
            document.getElementById('indicator').style = 'right:440px; left:0px;';
            console.log('private');
            document.getElementById("showMessages").innerHTML = "";
            type='private';
            empresas.forEach( empresa => {
                document.getElementById('optionslist').innerHTML += list_options(empresa.nome,empresa.email);
            })
            $('.op').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
                var num = $(this).find('h6').html();
                //console.log(num);
                if(check){
                    document.getElementById("showMessages").innerHTML = "";
                    check = false;
                }
                else{
                    var ind = num.indexOf('-');
                    console.log(num.substring(0,ind-1));
                    for (var i=0; i < empresas.length; i++) {    
                        if (num.substring(0,ind-1) === empresas[i].nome) { 
                            get_mensagens(user.email,empresas[i].email);
                        }
                    }
                    check = true;
                }
            })
        });
        $('#public').click(function () {
            console.log('public');
            type='public';
            document.getElementById('indicator').style = 'right:0px; left:440px;';
            document.getElementById("showMessages").innerHTML = "";
            document.getElementById('optionslist').innerHTML = "";
            get_mensagens_publicas();
        });
        empresas.forEach(element => {
            //console.log(element);
            document.getElementById("recetores").innerHTML +=  show_row(element);
        });
        document.getElementById('recetores').style.display = "block";
        $('#send').click(function () {
            console.log('click');
            destino_aux = document.getElementById("recetores").value;
            var dest = destino_aux.split(' - '); 
            console.log(dest);
            var destino = dest[1];
            if ($.trim($("#textarea").val()) !== "") {
                //console.log($.trim($("#textarea").val()));
                conteudo = $.trim($("#textarea").val());
                tipoEmissor=0; //0-cliente,1-empresa
                tipoRecetor=1;
                origem = user.email;
                document.getElementById('textarea').value = "";
                data = new Date().toISOString().slice(0, 19).replace('T', ' ');
                idOrganizacao=2;
                if(type === 'private'){
                    mensagem = new MensagemPrivada(tipoEmissor,tipoRecetor,origem, destino, conteudo, data,idOrganizacao);
                }
                else{
                    mensagem = new MensagemPublica(tipoEmissor,origem, conteudo, data, idOrganizacao);
                }
                console.log(mensagem);
                post_mensagem(JSON.stringify(mensagem));
            }
        });
    }); 
    
    $('#calendar').click(function(){
        console.log('clickCalen');
        $('#profile-page-wall').html(make_Calendar());
    });
    
    $('#opportunities').click(function(){
        console.log('clickOPP');
        $('#profile-page-wall').html(make_Opportunities());
        $('#VO1').click(function(){   
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#VO2').click(function(){   
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        }); 
        $('#VO3').click(function(){   
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        }); 
        $('#closeModal').click(function(){   
            var modal = document.getElementById('modal1');
            modal.style.display = 'none';
        }); 
    });
});

function updateTask(id){
    var data_file = "http://localhost/evr/update_tarefa.php";
    var http_request = new XMLHttpRequest();
    var i=0;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            console.log(tasks);
            
            // tasks.forEach( task => {
            //     if(task.id === id){
            //         tasks.splice(i,1);
            //     }
            //     i++;
            // })
            // console.log(tasks);
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(JSON.stringify({'id':id, 'estado':'completa'}));
}

function get_festivais() {
    var data_file = "http://localhost/evr/get_festivais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            //console.log(response.Nome);
            response.forEach(element => {
                console.log(element);
                document.getElementById("festivais").innerHTML +=  show_festivais(element);
            });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);
    http_request.send();
}

function get_parceiros(){
    var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            parceiros=response;
            // response.forEach(element => {
            //     console.log(element);
            //     document.getElementById("partners").innerHTML +=  show_partners(festival[0],element,i);
            //     i++;
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=idFestival&value='+festival[0].id, true);
    http_request.send();
}

function post_mensagem(mensagem) {
    var data_file = "http://localhost/evr/post_mensagem.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            //response = JSON.parse(http_request.responseText);
            //console.log(response);
            
            //M.toast({html: http_request.responseText})
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(mensagem);
}

function get_mensagens(cliente,empresa){
    var data_file = "http://localhost/evr/get_mensagens.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            mensagens_enviadas = response[0];
            mensagens_recebidas = response[1];
            mensagens_enviadas.forEach( mensagem => {
                document.getElementById("showMessages").innerHTML +=  list_mensagens_enviadas(mensagem.mensagem,mensagem.dataTempo);
            })
            mensagens_recebidas.forEach( mensagem => {
                document.getElementById("showMessages").innerHTML +=  list_mensagens_recebidas(mensagem.mensagem,mensagem.dataTempo);
            })
            // mensagens_trocadas = response;
        }
    }

    http_request.open("GET", data_file+'?type=private&user1='+cliente+'&user2='+empresa, true);
    http_request.send();
}

function get_mensagens_publicas(){
    var data_file = "http://localhost/evr/get_mensagens.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            mensagens_enviadas = response[0];
            mensagens_recebidas = response[1];
            mensagens_enviadas.forEach( mensagem => {
                document.getElementById("showMessages").innerHTML +=  list_mensagens_enviadas(mensagem.mensagem,mensagem.dataTempo);
            })
            mensagens_recebidas.forEach( mensagem => {
                document.getElementById("showMessages").innerHTML +=  list_mensagens_recebidas(mensagem.mensagem,mensagem.dataTempo);
            })
            mensagens_trocadas = response;
        }
    }

    http_request.open("GET", data_file+'?type=public', true);
    http_request.send();
}

function post_task(task){
    var data_file = "http://localhost/evr/post_tarefa.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            //response = JSON.parse(http_request.responseText);
            //console.log(response);
            
            // M.toast({html: response.message})
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(task);
}

function get_tasks(){
    var data_file = "http://localhost/evr/get_tarefas.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            tasks = response;
            tasks.forEach(task => {
                document.getElementById("task-card").innerHTML +=  show_task(task,i);
                i++;
            });
        }
    }

    http_request.open("GET", data_file+'?filter1=coordenador&value1='+user.email+'&filter2=estado&value2='+'Incompleta', true);
    http_request.send();
}


function get_empresas() {
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            //console.log(response);
            empresas = response;
            // response.forEach(element => {
            //     document.getElementById("table_body").innerHTML +=  show_row(element);
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=registoAprovado&value=1', true);
    http_request.send();
}

function filter_empresas(filter,value) {
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            empresas_filter=response;
            document.getElementById("list_empresas").innerHTML += '<span>Filtro escolhido:'+ filter+'('+value+')' +'</span>';
            if(empresas_filter.length > 0){
                empresas_filter.forEach(empresa => {
                    document.getElementById("list_empresas").innerHTML +=  show_empresas(empresa,i);
                    i++;
                });
                $('.empresa').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
                    var num = $(this).find('h5').html();
                    //var email = $(this).find('h4').html();
                    console.log(num.substring(8));
                    var aux='modal'+num.substring(8);
                    console.log(aux);
                    var modal = document.getElementById('modal'+num.substring(8));
                    modal.style.display = 'block';
                    //emp=1;
                    $('#closeModal'+num.substring(8)).click(function () {
                        //console.log(emp);
                        var modal = document.getElementById('modal'+num.substring(8));
                        modal.style.display = 'none';
                    });
                    $('#chat'+num.substring(8)).click(function(){ 
                        console.log('chat');
                        $('#profile-page-wall').html(makeMessages());
                        //console.log(emp);
                        document.getElementById("recetores").innerHTML +=  show_row(empresas[num.substring(8)-1]);
                        document.getElementById('recetores').style.display = "block";
                    });
                    $('#convidar'+num.substring(8)).click(function(){ 
                        console.log('convidar');
                        var modal = document.getElementById('modal'+num.substring(8));
                        console.log(modal);
                        modal.style.display = 'none';
                    });
                });
            }
            else{
                document.getElementById("list_empresas").innerHTML += '<h5>Não existem empresas nesta procura</h5>'
            }
        }
    }
    //console.log(data_file+'?filter='+filter+'&value='+value);
    http_request.open("GET", data_file+'?filter='+filter+'&value='+value, true);
    http_request.send();
}

function submeter_VO(VO){
    var data_file = "http://localhost/evr/post_pedido_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            if(response.mensagem=''){
                alert('Pedido submetido. Fique a aguardar resposta');
            }
            else{
                alert(response.mensagem);
            }
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(VO);
}

function get_VO(email){
    var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            VOs=response;
            get_festival(VOs[0].idFestival);
            // response.forEach(element => {
            //     console.log(element);
            //     document.getElementById("recetores").innerHTML +=  show_row(element);
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file+'?filter=emailEmpresa&value='+email, true);
    http_request.send();
}

function get_festival(id) {
    var data_file = "http://localhost/evr/get_festivais.php";
    var http_request = new XMLHttpRequest();
    var i=1;
    http_request.onreadystatechange = function () {
        
        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            festival = JSON.parse(http_request.responseText);
            console.log(festival);
            festival.forEach( element => {
                document.getElementById("vo-card").innerHTML +=  show_VOs(i,element);
                i++;
                console.log('id:'+element.id)
                get_imagem_festival(element.id)
            })
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