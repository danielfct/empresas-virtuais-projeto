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

function Task(nome, tipo, dataTempoInicio, dataTempoFim, festival, coordenador, responsavel, estado) {
    this.nome = nome,
        this.tipo = tipo,
        this.dataTempoInicio = dataTempoInicio,
        this.dataTempoFim = dataTempoFim,
        this.festival = festival,
        this.coordenador = coordenador,
        this.responsavel = responsavel,
        this.estado = estado
}

function pedidoVO(IdFestival, cliente) {
    this.idFestival = IdFestival,
        this.emailCliente = cliente
}

function Feedback(id, emailAvaliador, emailAvaliado, classificacao) {
    this.tarefa = id,
        this.emailAvaliador = emailAvaliador,
        this.emailAvaliado = emailAvaliado,
        this.classificacao = classificacao
}

function Feedback_VO(id, emailAvaliador, emailAvaliado, classificacao) {
    this.festival = id,
    this.emailAvaliador = emailAvaliador,
    this.emailAvaliado = emailAvaliado,
    this.classificacao = classificacao
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
var feedbacks_tarefas = [];
var feedbacks_VO = [];

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
        // $('.task').click(function () {
        //     console.log(ele);
        //    var num = document.getElementById('option'+ele.id);
        //    console.log(num);
        //    update_task(ele.id);
        //})
    } else {
        document.getElementById('option' + ele.id).style.display = "none";
    }
}

function buttonCheck(ele) {
    //console.log(ele);
    console.log(ele.id.substring(ele.id.length - 1));
    feedback_task(ele.id.substring(ele.id.length - 1));
}

function feedback_task(id) {
    console.log(tasks);
    var tarefa;
    tasks.forEach(task => {
        if (id === task.id) {
            $('#profile-page-wall').html(make_feedback(task));
            tarefa = task;
        }
    })
    $('.fa-star').click(function () {
        var num = $(this)[0].id.substring(4);
        console.log(num);
        for (var k = 1; k <= parseInt(num); k++) {
            document.getElementById('star' + k).classList.add("checked");
        }
        //updateTask(id);
        var feedback = new Feedback(id, tarefa.coordenador, tarefa.responsavel, num);
        post_feedback_tarefa(JSON.stringify(feedback));
    })
    //element.classList.add("checked");
}

function post_feedback_tarefa(feedback) {
    var data_file = "http://localhost/evr/post_feedback_tarefa.php";
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
    http_request.send(feedback);
}


var user = JSON.parse(localStorage.getItem('User-Logged'));
console.log(user);

$(document).ready(function () {
    $('.waves-effect.waves-block.waves-light.toogle-fullscreen').click(function () {
        toggleFullScreen();
    });

    get_VO(user.email);//user.email
    get_empresas();
    get_tasks();

    $('#logout').click(function () {
        console.log('logout');///fazer o logout
        localStorage.removeItem('User-Logged');
        location.href = "Homepage.html";
    });

    $('#newVO').click(function () {
        console.log('click');
        get_festivais();
        $('#profile-page-wall').html(make_newVO());
        $('#register').click(function () {
            var festival = document.getElementById("festivais").value;
            console.log(festival);
            var cliente = user.email;//nome do cliente
            var new_VO = new pedidoVO(festival, cliente);
            new_VO = JSON.stringify(new_VO);
            console.log(new_VO);
            submeter_VO(new_VO);
            // VOs.push(new_VO);
            // VOs.forEach( VO => {
            //     document.getElementById("vo-card").innerHTML +=  show_VO(VO,i);
            //     i++;
            // });
        });
    });

    $('#myTasks').click(function () {
        console.log('clickTasks');
        check_aux = false;
    });

    $('#myVO').click(function () {
        console.log('clickVO');
        check_aux = false;
    });

    var check = false;

    $('#myMessages').click(function () {
        console.log('clickMessages');
        var type;
        $('#profile-page-wall').html(makeMessages());
        $('#private').click(function () {
            document.getElementById('indicator').style = 'right:440px; left:0px;';
            console.log('private');
            document.getElementById("showMessages").innerHTML = "";
            type = 'private';
            empresas.forEach(empresa => {
                document.getElementById('optionslist').innerHTML += list_options(empresa.nome, empresa.email);
            })
            $('.op').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
                var num = $(this).find('h6').html();
                //console.log(num);
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
            document.getElementById("recetores").innerHTML += show_row(element);
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
                tipoEmissor = 0; //0-cliente,1-empresa
                tipoRecetor = 1;
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

    $('#newTask').click(function () {
        console.log('clickTask');
        var i = 1;
        $('#profile-page-wall').html(make_newTask());
        festival.forEach(element => {
            console.log(element);
            document.getElementById("idVO").innerHTML += show_festivais(element);
        });
        $('#register').click(function () {
            var nome = document.getElementById('nome').value;
            var tipo = document.getElementById('tipo').value;
            var dataTempoInicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var dataTempoFim = document.getElementById('Data').value;
            var nome_festival = document.getElementById("idVO").value;
            var id_festival = festival[0].id;
            var coordenador = user.email;
            var responsavel = document.getElementById('responsavel').value;
            var estado = 'incompleta';
            var task = new Task(nome, tipo, dataTempoInicio, dataTempoFim, id_festival, coordenador, responsavel, estado);
            console.log(task);
            post_task(JSON.stringify(task));
            tasks.push(task);
            tasks.forEach(task => {
                document.getElementById("task-card").innerHTML += show_task(task, i, nome_festival);
                i++;
            });
        });
    });

    $('#checkEnterprises').click(function () {
        console.log('clickEnterprises');
        var i = 1;
        var emp = 0;
        var cidade;
        $('#profile-page-wall').html(make_listEnterprises('none', 'none', 'none', 'none'));
        console.log(feedbacks_tarefas);
        empresas.forEach(empresa => {
            for(var k=0; k < feedbacks_tarefas.length; k++){
                console.log(JSON.parse(feedbacks_tarefas[k]).nome);
                var aux = JSON.parse(feedbacks_tarefas[k]).nome;
                //console.log(aux.indexOf('='));
                var index=aux.indexOf('=');
                var nome = aux.substring(0,index);
                console.log(nome);
                if(nome === empresa.nome){
                    var classificacao = aux.substring(index+1);                  
                }
            }
            for(var k=0; k < feedbacks_VO.length; k++){
                console.log(JSON.parse(feedbacks_VO[k]).nome);
                var aux1 = JSON.parse(feedbacks_VO[k]).nome;
                //console.log(aux.indexOf('='));
                var index=aux1.indexOf('=');
                var nome = aux1.substring(0,index);
                console.log(nome);
                if(nome === empresa.nome){
                    var classificacao_VO = aux1.substring(index+1);                  
                }
            }
            //console.log(empresa.avatar);
            
            var image="data:image/jpeg;base64,"+empresa.avatar;
            document.getElementById("list_empresas").innerHTML += show_empresas(empresa,image, i, classificacao,classificacao_VO);
            i++;
        });
        $('#loc').click(function () {
            var div = document.getElementById('Localizações');
            console.log(div);
            if (div.style.display === 'none') {
                div.style.display = 'block';
            }
            else {
                div.style.display = 'none';
            }
        });
        $('#Localizações li').click(function () {
            //console.log($(this).attr('data-input'));
            cidade = $(this).attr('data-input');	// this will alert data-input value.
            console.log(cidade);
            document.getElementById("list_empresas").innerHTML = "";
            filter_empresas('cidade', cidade);
        });
        $('#serv').click(function () {
            var div = document.getElementById('Serviços');
            console.log(div);
            if (div.style.display === 'none') {
                div.style.display = 'block';
            }
            else {
                div.style.display = 'none';
            }
        });
        $('#Serviços li').click(function () {
            //console.log($(this).attr('data-input'));
            tipo = $(this).attr('data-input');	// this will alert data-input value.
            console.log(tipo);
            document.getElementById("list_empresas").innerHTML = "";
            filter_empresas('tipo', tipo);
        });
        $('#zona').click(function () {
            var div = document.getElementById('Zona');
            console.log(div);
            if (div.style.display === 'none') {
                div.style.display = 'block';
            }
            else {
                div.style.display = 'none';
            }
        });
        $('#Zona li').click(function () {
            //console.log($(this).attr('data-input'));
            zonaOperacao = $(this).attr('data-input');	// this will alert data-input value.
            console.log(zonaOperacao);
            document.getElementById("list_empresas").innerHTML = "";
            filter_empresas('zonaOperacao', zonaOperacao);
        });
        $('#trab').click(function () {
            var div = document.getElementById('Trabalhadores');
            console.log(div);
            if (div.style.display === 'none') {
                div.style.display = 'block';
            }
            else {
                div.style.display = 'none';
            }
        });
        $('#Trabalhadores li').click(function () {
            //console.log($(this).attr('data-input'));
            num = $(this).attr('data-input');	// this will alert data-input value.
            console.log(num);
            document.getElementById("list_empresas").innerHTML = "";
            filter_empresas('numTrabalhadores', num);
        });
        $('.empresa').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
            var num = $(this).find('h5').html();
            //var email = $(this).find('h4').html();
            console.log(num.substring(8));
            var aux = 'modal' + num.substring(8);
            console.log(aux);
            var modal = document.getElementById('modal' + num.substring(8));
            modal.style.display = 'block';
            //emp=1;
            $('#closeModal' + num.substring(8)).click(function () {
                //console.log(emp);
                var modal = document.getElementById('modal' + num.substring(8));
                modal.style.display = 'none';
            });
            $('#chat' + num.substring(8)).click(function () {
                console.log('chat');
                $('#profile-page-wall').html(makeMessages());
                //console.log(emp);
                document.getElementById("recetores").innerHTML += show_row(empresas[num.substring(8) - 1]);
                document.getElementById('recetores').style.display = "block";
            });
            $('#convidar' + num.substring(8)).click(function () {
                console.log('convidar');
                var modal = document.getElementById('modal' + num.substring(8));
                console.log(modal);
                modal.style.display = 'none';
            });
        });
    });

    $('#checkPartners').click(function () {
        console.log('clickPartners');
        var i = 1;
        get_parceiros();
        $('#profile-page-wall').html(make_listPartners());
        parceiros.forEach(element => {
            console.log(element);
            document.getElementById("partners").innerHTML += show_partners(festival[0], element, i);
            i++;
        });
        $('.parceiro').click(function () {
            var num = $(this).find('h5').html();
            //var email = $(this).find('h4').html();
            //console.log(num);
            console.log(num.substring(9));
            var aux = 'modal' + num.substring(9);
            console.log(aux);
            var modal = document.getElementById('modal' + num.substring(9));
            modal.style.display = 'block';
            //emp=1;
            $('#closeModal' + num.substring(9)).click(function () {
                //console.log(emp);
                var modal = document.getElementById('modal' + num.substring(9));
                modal.style.display = 'none';
            });
            $('#chat' + num.substring(9)).click(function () {
                console.log('chat');
                for (var i = 0; i < empresas.length; i++) {
                    if (parceiros[num.substring(9) - 1].emailEmpresa === empresas[i].email) {
                        console.log(empresas[i]);
                        //return myArray[i];
                        $('#profile-page-wall').html(makeMessages());
                        document.getElementById("recetores").innerHTML += show_row(empresas[i]);
                        document.getElementById('recetores').style.display = "block";
                    }
                }
            });
            $('#feedback' + num.substring(9)).click(function () {
                console.log('feedback');
                var emp;
                var modal = document.getElementById('modal' + num.substring(9));
                console.log(modal);
                modal.style.display = 'none';
                for (var i = 0; i < empresas.length; i++) {
                    if (parceiros[num.substring(9) - 1].emailEmpresa === empresas[i].email) {
                        //console.log(festival[0]);
                        $('#profile-page-wall').html(make_feedback_VO(empresas[i],festival[0]));
                        emp = empresas[i];
                    }
                }    
                $('.fa-star').click(function () {
                    var num = $(this)[0].id.substring(4);
                    console.log(num);
                    for (var k = 1; k <= parseInt(num); k++) {
                        document.getElementById('star' + k).classList.add("checked");
                    }
                    var feedback = new Feedback_VO(festival[0].id, user.email, emp.email, num);
                    post_feedback_VO(JSON.stringify(feedback));
                })
            });
        });
    });

    $('#checkFestivals').click(function () {
        console.log('clickFestivals');
        var i = 1;
        $('#profile-page-wall').html(make_listFestivals());
        festival.forEach(element => {
            document.getElementById("festivals").innerHTML += show_fest(element, i, imagens[0]);
            i++;
        })
        console.log(imagens);
        document.getElementById("imagem").src = imagens[0];
        $('#E1').click(function () {
            var modal = document.getElementById('modal1');
            modal.style.display = 'block';
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

    function get_parceiros() {
        var data_file = "http://localhost/evr/get_organizacoes_virtuais.php";
        var http_request = new XMLHttpRequest();
        var i = 1;
        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                console.log(response);
                parceiros = response;
                // response.forEach(element => {
                //     console.log(element);
                //     document.getElementById("partners").innerHTML +=  show_partners(festival[0],element,i);
                //     i++;
                // });
                // M.toast({html: response.message})
            }
        }

        http_request.open("GET", data_file + '?filter=idFestival&value=' + festival[0].id, true);
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

        http_request.open("GET", data_file + '?type=private&user1=' + cliente + '&user2=' + empresa, true);
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

    function post_feedback_VO(feedback) {
        var data_file = "http://localhost/evr/post_feedback_organizacao_virtual.php";
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
        http_request.send(feedback);
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

        http_request.open("GET", data_file + '?filter1=coordenador&value1=' + user.email, true);
        http_request.send();
    }

    function get_feedback_empresa(empresa) {
        var data_file = "http://localhost/evr/get_feedback_tarefa.php";
        var http_request = new XMLHttpRequest();
        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                if (response.length > 0) {
                    feedbacks_tarefas.push(JSON.stringify({'nome':empresa.nome+'='+response[0].classificacao}));
                }
            }
        }

        http_request.open("GET", data_file + '?filter=emailAvaliado&value=' + empresa.email, true);
        http_request.send();
    }

    function get_feedback_empresa_VO(empresa) {
        var data_file = "http://localhost/evr/get_feedback_organizacao_virtual.php";
        var http_request = new XMLHttpRequest();
        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                if (response.length > 0) {
                    feedbacks_VO.push(JSON.stringify({'nome':empresa.nome+'='+response[0].classificacao}));
                }
            }
        }

        http_request.open("GET", data_file + '?filter=emailAvaliado&value=' + empresa.email, true);
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
                response.forEach(empresa => {
                    get_feedback_empresa(empresa);
                    get_feedback_empresa_VO(empresa);
                });
                // M.toast({html: response.message})
            }
        }

        http_request.open("GET", data_file + '?filter=registoAprovado&value=1', true);
        http_request.send();
    }

    function filter_empresas(filter, value) {
        var data_file = "http://localhost/evr/get_empresas.php";
        var http_request = new XMLHttpRequest();
        var i = 1;
        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                console.log(response);
                empresas_filter = response;
                document.getElementById("list_empresas").innerHTML += '<span>Filtro escolhido:' + filter + '(' + value + ')' + '</span>';
                if (empresas_filter.length > 0) {
                    empresas_filter.forEach(empresa => {
                        for(var k=0; k < feedbacks_tarefas.length; k++){
                            console.log(JSON.parse(feedbacks_tarefas[k]).nome);
                            var aux = JSON.parse(feedbacks_tarefas[k]).nome;
                            //console.log(aux.indexOf('='));
                            var index=aux.indexOf('=');
                            var nome = aux.substring(0,index);
                            console.log(nome);
                            if(nome === empresa.nome){
                                var classificacao = aux.substring(index+1);                  
                            }
                        }
                        for(var k=0; k < feedbacks_VO.length; k++){
                            console.log(JSON.parse(feedbacks_VO[k]).nome);
                            var aux1 = JSON.parse(feedbacks_VO[k]).nome;
                            //console.log(aux.indexOf('='));
                            var index=aux1.indexOf('=');
                            var nome = aux1.substring(0,index);
                            console.log(nome);
                            if(nome === empresa.nome){
                                var classificacao_VO = aux1.substring(index+1);                  
                            }
                        }
                        //console.log(empresa.avatar);
                        
                        var image="data:image/jpeg;base64,"+empresa.avatar;
                        document.getElementById("list_empresas").innerHTML += show_empresas(empresa,image, i, classificacao,classificacao_VO);
                        i++;
                    });
                    $('.empresa').click(function () {///resolver problema de descobrir em que empresa carrego,ver exemplo mailchimp
                        var num = $(this).find('h5').html();
                        //var email = $(this).find('h4').html();
                        console.log(num.substring(8));
                        var aux = 'modal' + num.substring(8);
                        console.log(aux);
                        var modal = document.getElementById('modal' + num.substring(8));
                        modal.style.display = 'block';
                        //emp=1;
                        $('#closeModal' + num.substring(8)).click(function () {
                            //console.log(emp);
                            var modal = document.getElementById('modal' + num.substring(8));
                            modal.style.display = 'none';
                        });
                        $('#chat' + num.substring(8)).click(function () {
                            console.log('chat');
                            $('#profile-page-wall').html(makeMessages());
                            //console.log(emp);
                            document.getElementById("recetores").innerHTML += show_row(empresas[num.substring(8) - 1]);
                            document.getElementById('recetores').style.display = "block";
                        });
                        $('#convidar' + num.substring(8)).click(function () {
                            console.log('convidar');
                            var modal = document.getElementById('modal' + num.substring(8));
                            console.log(modal);
                            modal.style.display = 'none';
                        });
                    });
                }
                else {
                    document.getElementById("list_empresas").innerHTML += '<h5>Não existem empresas nesta procura</h5>'
                }
            }
        }
        //console.log(data_file+'?filter='+filter+'&value='+value);
        http_request.open("GET", data_file + '?filter=' + filter + '&value=' + value, true);
        http_request.send();
    }

    function submeter_VO(VO) {
        var data_file = "http://localhost/evr/post_pedido_organizacao_virtual.php";
        var http_request = new XMLHttpRequest();

        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // TODO Javascript function JSON.parse to parse JSON data
                //console.log(http_request.responseText);
                response = JSON.parse(http_request.responseText);
                console.log(response);
                if (response.mensagem = '') {
                    alert('Pedido submetido. Fique a aguardar resposta');
                }
                else {
                    alert(response.mensagem);
                }
            }
        }

        http_request.open("POST", data_file, true);
        http_request.send(VO);
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

        http_request.open("GET", data_file + '?filter=emailCliente&value=' + email, true);
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

});
