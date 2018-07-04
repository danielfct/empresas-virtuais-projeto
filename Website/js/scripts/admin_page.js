function isFullScreen() {
    return (document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen
        || document.webkitIsFullScreen;
}


function requestFullScreen(element) {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}

function exitFullScreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
}

function toggleFullScreen(element) {
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element || document.documentElement);
}

function MensagemPrivada(tipoEmissor, tipoRecetor, origem, destino, conteudo, data, idOrganizacao) {
    this.tipoEmissor = tipoEmissor,
        this.tipoRecetor = tipoRecetor,
        this.emissor = origem,
        this.recetor = destino,
        this.dataTempo = data,
        this.mensagem = conteudo,
        this.idOrganizacao = idOrganizacao
}

function MensagemPublica(tipoEmissor, origem, conteudo, data, idOrganizacao) {
    this.tipoEmissor = tipoEmissor,
        this.emissor = origem,
        this.dataTempo = data,
        this.mensagem = conteudo,
        this.idOrganizacao = idOrganizacao
}

var i = 1;
var festival = [];
var festivais = [];
var pedidos_VOs = [];
var pedidos_empresas = [];
var VOs = [];
var empresas = [];
var imagens = [];
var clientes = [];

var user = JSON.parse(localStorage.getItem('User-Logged'));
console.log(user);

var check = false;

$(document).ready(function () {
    $('.waves-effect.waves-block.waves-light.toogle-fullscreen').click(function () {
        toggleFullScreen();
    });

    get_empresas();
    get_VOs();
    get_clientes();
    get_festivais();
    get_pedidos_VOs();
    get_pedidos_empresas();

    $('#logout').click(function () {
        console.log('logout');///fazer o logout
        localStorage.removeItem('User-Logged');
        location.href = "Homepage.html";
    });

    $('#dashboard').click(function () {
        console.log('click');
        $('#profile-page-wall').html(make_Dashboard());
        empresas.forEach(element => {
            document.getElementById("table_body").innerHTML += show_row(element);
        });
        VOs.forEach(element => {
            document.getElementById("VO_table").innerHTML += show_row_VO(element, festivais[(element.idFestival) - 1]);
        });
        document.getElementById("VOs_number").innerHTML = pedidos_VOs.length;
        document.getElementById("Empresas_number").innerHTML = pedidos_empresas.length;
    });

    $('#messages').click(function () {
        console.log(empresas);
        $('#profile-page-wall').html(make_Message());
        $('#private').click(function () {
            document.getElementById('indicator').style = 'right:440px; left:0px;';
            console.log('private');
            document.getElementById("showMessages").innerHTML = "";
            type = 'private';
            console.log(empresas);
            empresas.forEach(empresa => {
                document.getElementById('optionslist').innerHTML += list_options(empresa.nome, empresa.email);
            })
            clientes.forEach(cliente => {
                if (cliente.nome !== 'admin') {
                    document.getElementById('optionslist').innerHTML += list_options(cliente.nome, cliente.email);
                }
            })
            $('.op').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
                var num = $(this).find('h6').html();
                console.log(num);
                if (check) {
                    document.getElementById("showMessages").innerHTML = "";
                    check = false;
                }
                else {
                    var ind = num.indexOf('-');
                    console.log(num.substring(0, ind - 1));
                    for (var i = 0; i < empresas.length; i++) {
                        if (num.substring(0, ind - 1) === empresas[i].nome) {
                            get_mensagens(user.email, empresas[i].email);
                        }
                    }
                    for (var k = 0; k < clientes.length; k++) {
                        if (num.substring(0, ind - 1) === clientes[k].nome) {
                            get_mensagens(user.email, clientes[k].email);
                        }
                    }
                    check = true;
                }
            })
        });
        $('#public').click(function () {
            console.log('public');
            type = 'public';
            document.getElementById('indicator').style = 'right:0px; left:440px;';
            document.getElementById("showMessages").innerHTML = "";
            document.getElementById('optionslist').innerHTML = "";
            get_mensagens_publicas();
        });
        console.log(empresas,clientes);
        
        empresas.forEach(element => {
            //console.log(element);
            document.getElementById("recetores").innerHTML += show_row_1(element);
        });
        clientes.forEach(cliente => {
            if (cliente.nome !== 'admin') {
                document.getElementById("recetores").innerHTML += show_row_1(cliente);
            }
        })
        document.getElementById('recetores').style.display = "block";
        $('#send').click(function () {
            console.log('click');
            destino_aux = document.getElementById("recetores").value;
            var dest = destino_aux.split(' - ');
            console.log(dest);
            var destino = dest[1];
            tipoRecetor = 1;
            clientes.forEach(cliente => {
                if (cliente.email === destino) {
                    tipoRecetor = 0;
                }
            })
            if ($.trim($("#textarea").val()) !== "") {
                //console.log($.trim($("#textarea").val()));
                conteudo = $.trim($("#textarea").val());
                tipoEmissor = 1; //0-cliente,1-empresa
                origem = user.email;
                document.getElementById('textarea').value = "";
                data = new Date().toISOString().slice(0, 19).replace('T', ' ');
                idOrganizacao = 2;
                if (type === 'private') {
                    mensagem = new MensagemPrivada(tipoEmissor, tipoRecetor, origem, destino, conteudo, data, idOrganizacao);
                }
                else {
                    mensagem = new MensagemPublica(tipoEmissor, origem, conteudo, data, idOrganizacao);
                }
                console.log(mensagem);
                post_mensagem(JSON.stringify(mensagem));
            }
        });
    });
});

$('#VOs').click(function () {
    get_imagem_festival(pedidos_VOs[0].idFestival);
    console.log(pedidos_VOs);
    if (pedidos_VOs.length === 0) {
        $('#profile-page-wall').html(make_VOs_1());
    }
    else {
        $('#profile-page-wall').html(make_VOs());
        get_festival(pedidos_VOs, pedidos_VOs[0].idFestival);
        console.log('voltei');
        $('#ped1').click(function () {
            console.log('clicked');
            var modal = document.getElementById('modal1');
            console.log(modal);
            modal.style.display = 'block';
        });
        $('#ped2').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#ped3').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#closeModal').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'none';
        });
    }
});

$('#empresas').click(function () {
    console.log(pedidos_empresas);
    var k = 1;
    var ped = 0;
    if (pedidos_empresas.length === 0) {
        $('#profile-page-wall').html(make_Empresas_1());
    }
    else {
        $('#profile-page-wall').html(make_Empresas());
        pedidos_empresas.forEach(empresa => {
            document.getElementById("pedidos_empresas").innerHTML += show_empresas(empresa, k);
            k++;
        });
        $('#ped1').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
            ped = 1;
        });
        $('#ped2').click(function () {
            var modal = document.getElementById('modal2');
            modal.style.display = 'block';
            ped = 2;
        });
        $('#ped3').click(function () {
            var modal = document.getElementById('modal3');
            modal.style.display = 'block';
            ped = 3;
        });
        $('#closeModal').click(function () {
            var modal = document.getElementById('modal' + ped);
            modal.style.display = 'none';
        });
        $('#aceitar').click(function () {
            console.log('aceitou');
            var modal = document.getElementById('modal' + ped);
            console.log(modal);
            modal.style.display = 'none';
            // pedido[0].emailEmpresa="outraempresa@gmail.com";
            //empresa=JSON.stringify(pedidos_empresas[ped-1]);
            // console.log(empresa);
            update_empresa(pedidos_empresas[ped - 1]);
        });
        $('#rejeitar').click(function () {
            console.log('rejeitou');
            var modal = document.getElementsByClassName('modal');
            console.log(modal);
            modal[0].style.display = 'none';
        });
    }
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
                document.getElementById("table_body").innerHTML += show_row(element);
            });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file + '?filter=registoAprovado&value=1', true);
    http_request.send();
}

function get_clientes() {
    var data_file = "http://localhost/evr/get_clientes.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            clientes = response;
            // response.forEach(element => {
            //     document.getElementById("table_body").innerHTML +=  show_row(element);
            // });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);
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
                document.getElementById("VO_table").innerHTML += show_row_VO(element, festivais[(element.idFestival) - 1]);
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
            VOs = response;
            console.log(response);
            //console.log(festivais);
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);//+'?filter=pedidoAprovado&value=1'
    http_request.send();
}

function get_pedidos_VOs() {
    var data_file = "http://localhost/evr/get_pedidos_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            pedidos_VOs = response;
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

    http_request.open("GET", data_file + '?filter=pedidoAprovado&value=0', true);
    http_request.send();
}

function get_pedidos_empresas() {
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            pedidos_empresas = response;
            document.getElementById("Empresas_number").innerHTML = pedidos_empresas.length;
            //M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file + '?filter=registoAprovado&value=0', true);
    http_request.send();
}

function get_festival(pedido, id) {
    var data_file = "http://localhost/evr/get_festivais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            festival = JSON.parse(http_request.responseText);
            console.log(festival);
            document.getElementById("pedidos").innerHTML += show_VOs(pedido[0], 1, festival[0]);
            //     i++;
            var a = document.getElementById('ped1');
            console.log(a);
            $('#ped1').click(function () {
                console.log('clicked');
                document.getElementById("imagem").src = imagens[0];
                var modal = document.getElementById('modal1');
                console.log(modal);
                modal.style.display = 'block';
                $('#aceitar').click(function () {
                    console.log('aceitou');
                    var modal = document.getElementById('modal1');
                    console.log(modal);
                    modal.style.display = 'none';
                    pedido[0].emailEmpresa = "outraempresa@gmail.com";
                    update_pedido_VO(pedido[0]);
                    VO = JSON.stringify(pedido[0]);
                    console.log(VO);
                    post_VO(VO);
                });
                $('#rejeitar').click(function () {
                    console.log('rejeitou');
                    var modal = document.getElementById('modal1');
                    console.log(modal);
                    modal.style.display = 'none';
                });
            });
            $('#closeModal').click(function () {
                var modal = document.getElementById('modal1');
                modal.style.display = 'none';
            });
            //document.getElementById("pedidos").innerHTML += show_modal(pedido,i,response[0]);
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file + '?filter=ID&value=' + id, true);
    http_request.send();
}

function get_imagem_festival(id) {
    var data_file = "http://localhost/evr/get_imagem_festival.php";
    var http_request = new XMLHttpRequest();
    var i = 1;

    function response(e) {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        console.log(imageUrl);
        imagens.push(imageUrl);
    }

    http_request.open("GET", data_file + '?id=' + id, true);
    http_request.responseType = "blob";
    http_request.onload = response;
    http_request.send();
}

function post_VO(VO) {
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

function update_empresa(empresa) {
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
    http_request.send('{"email":"' + empresa.email + '","registoAprovado":"1"}');
}

function get_mensagens_publicas() {
    var data_file = "http://localhost/evr/get_mensagens.php";
    var http_request = new XMLHttpRequest();
    var i = 1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            mensagens_enviadas = response[0];
            mensagens_recebidas = response[1];
            mensagens_enviadas.forEach(mensagem => {
                document.getElementById("showMessages").innerHTML += list_mensagens_enviadas(mensagem.mensagem, mensagem.dataTempo);
            })
            mensagens_recebidas.forEach(mensagem => {
                document.getElementById("showMessages").innerHTML += list_mensagens_recebidas(mensagem.mensagem, mensagem.dataTempo);
            })
            mensagens_trocadas = response;
        }
    }

    http_request.open("GET", data_file + '?type=public', true);
    http_request.send();
}


function update_pedido_VO(VO) {
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
    http_request.send('{"email":"' + VO.email + '","pedidoAprovado":"1"}');//preciso por email e id
}