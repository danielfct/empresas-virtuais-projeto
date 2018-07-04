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

function Empresa(nome, email, password, number, pais, cidade, localidade, range, workers, type, imagem) {
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.telefone = number;
    this.pais = pais;
    this.cidade = cidade;
    this.localidade = localidade;
    this.zonaOperacao = range;
    this.numTrabalhadores = workers;
    this.tipo = type;
    this.avatar = imagem;
}

function myFunction(ele) {
    console.log(ele);
    if (ele.checked == true) {
        document.getElementById('button' + ele.id).style.display = 'block';//quando carrega apagar VO da base de dados
    } else {
        document.getElementById('button' + ele.id).style.display = "none";
    }

}

function otherFunction(ele) {
    console.log(ele);
    if (ele.checked == true) {
        document.getElementById('option' + ele.id).style.display = 'block';//quando carrega marcar tarefa como completa,e avalia a empresa
        $('.task').click(function () {
            console.log(ele);
            var num = document.getElementById('option' + ele.id);
            console.log(num);
            updateTask(ele.id.substring(ele.id.length - 1));
        })
    } else {
        document.getElementById('option' + ele.id).style.display = "none";
    }
}

var mensagens_trocadas = [];
var mensagens_enviadas = [];
var mensagens_recebidas = [];
var tasks = [];
var VOs = [];
var Vos_aux = [];
var clientes = [];
var empresa;
var empresas = [];
var convites = [];
var i = 0;
var festival;
var empresas_filter = [];
var imagens = [];
var parceiros = [];

console.log(localStorage);
var user = JSON.parse(localStorage.getItem('User-Logged'));
console.log(user);

var check = false;

$(document).ready(function () {
    $('.waves-effect.waves-block.waves-light.toogle-fullscreen').click(function () {
        toggleFullScreen();
    });

    get_VO(user.email);
    get_VOs();
    get_empresas();
    get_clientes();
    get_convites();
    get_tasks();////////////empresa é que pode dar tarefa como concluida e depois o cliente so da o feedback

    $('#logout').click(function () {
        console.log('logout');///fazer o logout
        localStorage.removeItem('User-Logged');
        location.href = "Homepage.html";
    });

    $('#myProfile').click(function () {
        console.log('click');
        var image = "data:image/jpeg;base64," + user.avatar;
        $('#profile-page-wall').html(make_Profile(image, user.nome, user.email, user.telefone, user.localidade, user.numTrabalhadores, user.zonaOperacao));
        $('#editar').click(function () {
            var nome = document.getElementById('nome').value;
            var email = document.getElementById('email').value;
            var telefone = document.getElementById('number').value;
            var localidade = document.getElementById('location').value;
            var num = document.getElementById('trab_disp').value;
            var zona = document.getElementById('zona').value;
            //updateEmpresa()
        })
    });

    $('#messages').click(function () {
        console.log('clickMessages');
        var type;
        $('#profile-page-wall').html(make_Message());
        $('#private').click(function () {
            document.getElementById('indicator').style = 'right:440px; left:0px;';
            console.log('private');
            document.getElementById("showMessages").innerHTML = "";
            type = 'private';
            console.log(empresas);
            empresas.forEach(empresa => {
                if (empresa.nome !== user.nome) {
                    document.getElementById('optionslist').innerHTML += list_options(empresa.nome, empresa.email);
                }
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
        empresas.forEach(element => {
            //console.log(element);
            if (element.nome !== user.nome) {
                document.getElementById("recetores").innerHTML += show_row(element);
            }
        });
        clientes.forEach(cliente => {
            if (cliente.nome !== 'admin') {
                document.getElementById("recetores").innerHTML += show_row(cliente);
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

    $('#convites').click(function () {
        var i = 1;
        console.log('clickConvites');
        $('#profile-page-wall').html(make_Convites());
        console.log(convites);
        console.log(festival[0]);
        convites.forEach(element => {
            document.getElementById("convites1").innerHTML += list_Convites(element, i, festival[0]);
        })
        $('#E1').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
            $('#aceitar1').click(function () {
                console.log('aceitou');
                var modal = document.getElementById('modal1');
                console.log(modal);
                modal.style.display = 'none';
                VO = JSON.stringify({ 'idFestival': festival[0].id, 'emailCliente': convites[0].emailCliente, 'emailEmpresa': user.email, 'pedidoEmpresa': '1' });
                console.log(VO);
                post_VO(VO);
            });
            $('#rejeitar1').click(function () {
                console.log('rejeitou');
                var modal = document.getElementById('modal1');
                console.log(modal);
                modal.style.display = 'none';
            });
        });
        $('#E2').click(function () {
            var modal = document.getElementById('modal2');
            modal.style.display = 'block';
        });
        $('#closeModal').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'none';
        });
    });

    $('#calendar').click(function () {
        console.log('clickCalen');
        $('#profile-page-wall').html(make_Calendar());
    });

    $('#opportunities').click(function () {
        console.log('clickOPP');
        var i=1;
        $('#profile-page-wall').html(make_Opportunities());
        VOs_aux.forEach( VO => {
            document.getElementById('VOs_aux').innerHTML += list_Opportunities(festival[0],i);
            i++;
        })
        $('#VO1').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#VO2').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#VO3').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
        });
        $('#closeModal').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'none';
        });
    });
});

function updateTask(id) {
    var data_file = "http://localhost/evr/update_tarefa.php";
    var http_request = new XMLHttpRequest();
    var i = 0;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(JSON.stringify({ "id": id, "estado": "Completa" }));
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
                document.getElementById("festivais").innerHTML += show_festivais(element);
            });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file, true);
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

function get_mensagens(cliente, empresa) {
    var data_file = "http://localhost/evr/get_mensagens.php";
    var http_request = new XMLHttpRequest();
    var i = 1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
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
            // mensagens_trocadas = response;
        }
    }

    http_request.open("GET", data_file + '?type=private&user1=' + empresa + '&user2=' + cliente, true);
    http_request.send();
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

function post_task(task) {
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

function get_tasks() {
    var data_file = "http://localhost/evr/get_tarefas.php";
    var http_request = new XMLHttpRequest();
    var i = 1;
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            tasks = response;
            tasks.forEach(task => {
                document.getElementById("task-card").innerHTML += show_task(task, i);
                i++;
            });
        }
    }

    http_request.open("GET", data_file + '?filter1=responsavel&value1=' + user.email + '&filter2=estado&value2=' + 'Incompleta', true);
    http_request.send();
}

function get_convites() {
    var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);

            // VOs=response;
            // get_festival(VOs[0].idFestival);
            response.forEach(element => {
                console.log(element);
                if (element.pedidoEmpresa === '0') {
                    convites.push(element);
                }
            });
            // M.toast({html: response.message})
        }
    }

    http_request.open("GET", data_file + '?filter=emailEmpresa&value=' + user.email, true);
    http_request.send();
}

function post_VO(VO) {
    var data_file = "http://localhost/evr/update_organizacao_virtual.php";
    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            // response = JSON.parse(http_request.responseText);
            // console.log(response);
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(VO);
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

function get_VOs() {
    var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response);
            VOs_aux = response;
            //get_festival(VOs_aux[0].idFestival);
            // response.forEach(element => {
            //     console.log(element);
            //     document.getElementById("recetores").innerHTML +=  show_row(element);
            // });
            // M.toast({html: response.message})
        }
    }
    http_request.open("GET", data_file, true);
    http_request.send();
}

    function get_VO(email) {
        var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
        var http_request = new XMLHttpRequest();

        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                console.log(response);
                VOs = response;
                get_festival(VOs[0].idFestival);
                // response.forEach(element => {
                //     console.log(element);
                //     document.getElementById("recetores").innerHTML +=  show_row(element);
                // });
                // M.toast({html: response.message})
            }
        }

        http_request.open("GET", data_file + '?filter=emailEmpresa&value=' + email, true);
        http_request.send();
    }

    function get_festival(id) {
        var data_file = "http://localhost/evr/get_festivais.php";
        var http_request = new XMLHttpRequest();
        var i = 1;
        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                festival = JSON.parse(http_request.responseText);
                console.log(festival);
                festival.forEach(element => {
                    document.getElementById("vo-card").innerHTML += show_VOs(i, element);
                    i++;
                    console.log('id:' + element.id)
                    get_imagem_festival(element.id)
                })
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