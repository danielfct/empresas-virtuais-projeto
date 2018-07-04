function make_Dashboard(){
    return `<div id="card-stats">
    <div class="row">
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content green white-text">
                    <p class="card-stats-title">
                        <i class="large material-icons">group_add</i> Novos Clientes</p>
                    <h4 class="card-stats-number">50</h4>
                    <p class="card-stats-compare">+ 15%
                        <span class="green-text text-lighten-5">desde ontem</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content teal lighten-1 white-text">
                    <p class="card-stats-title">
                        <i class="large material-icons">chat</i> Mensagens</p>
                    <h4 class="card-stats-number">10</h4>
                    <p class="card-stats-compare">+ 10%
                        <span class="purple-text text-lighten-5">desde ontem</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content blue-grey white-text">
                    <p class="card-stats-title">
                        <i class="large material-icons">dvr</i> Pedidos de VOs</p>
                    <h4 id="VOs_number" class="card-stats-number"></h4>
                    <p class="card-stats-compare">+ 10%
                        <span class="blue-grey-text text-lighten-5">ultimo mês</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-content blue lighten-2 white-text">
                    <span class="card-stats-title">
                        <i class="large material-icons">add_alert</i> Pedidos de Empresas</span>
                    <h4 id="Empresas_number" class="card-stats-number"></h4>
                    <p class="card-stats-compare">+ 3%
                        <span class="deep-purple-text text-lighten-5">ultimo mês</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="card-widgets">
    <div class="row">
        <div class="col m12 l5" style="border: 2px solid #aba3a3; margin-top: 8px;margin-left: 60px;">
            <div id="bordered-table">
                <div class="row white-text" style="border-bottom: 2px solid #aba3a3; background-color: #aba3a3">
                    <div class="col s12 m12 l4 offset-l3">
                        <h4 class="">Empresas</h4>
                    </div>
                </div>
                <p></p>
                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="bordered hoverable centered">
                            <thead>
                                <tr>
                                    <th data-field="nome">Nome</th>
                                    <th data-field="service">Serviço</th>
                                    <th data-field="localidade">Localidade</th>
                                    <th data-field="telefone">Telefone</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col m12 l5" style="border:2px solid #dc5858; margin-top: 8px;margin-left: 80px;">
                <div id="bordered-table">
                    <div class="row white-text" style="border-bottom: 2px solid #dc5858; background-color: #dc5858">
                        <div class="col s12 m12 l4 offset-l4">
                            <h4 class="">VOs</h4>
                        </div>
                    </div>
                    <p></p>
                    <div class="row">
                        <div class="col s12 m12 l12">
                            <table class="bordered hoverable centered">
                                <thead>
                                    <tr>
                                        <th data-field="nome">Nome do Festival</th>
                                        <th data-field="service">Localização</th>
                                        <th data-field="email">Email</th>
                                    </tr>
                                </thead>
                                <tbody id="VO_table">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>`;
}

function show_row(empresa){
    return `<tr>
    <td>${empresa.nome}</td>
    <td>${empresa.tipo}</td>
    <td>${empresa.localidade}</td>
    <td>${empresa.telefone}</td>
</tr>`;
}

function show_row_VO(VO,festival){
    return `<tr>
    <td>${festival.nome}</td>
    <td>${festival.localidade}</td>
    <td>${VO.emailCliente}</td>
</tr>`;
}


function make_Message(){
    return `<div id="profile-page-wall-share" class="row">
    <div class="col s12">
       <ul class="tabs tab-profile z-depth-1 light-blue" style="width: 100%;">
          <li id="private" class="tab col s6">
              <a class="white-text waves-effect waves-light active">
                  <i class="material-icons">edit</i> 
                  Mensagens privadas
              </a>
          </li>
          <li id="public" class="tab col s6">
              <a class="white-text waves-effect waves-light">
                  <i class="material-icons">message</i> 
                  Mensagens públicas
              </a>
          </li>
          <div id="indicator" class="indicator" style="right: 440px; left: 0px;"></div>
       </ul>
       <p></p>
       <div class="row">
       </div>
       <div id="optionslist" class="collection">
     </div>
    <div id="showMessages" class="col m12"></div>
       <!-- UpdateStatus-->
       <div id="UpdateStatus" class="tab-content col s12  grey lighten-4">
          <div class="row">
             <div class="col s2">
                <img src="avatar.jpg" alt="" class="circle responsive-img valign profile-image-post">
             </div>
             <div class="input-field col s10">
                <textarea id="textarea" row="1" class="materialize-textarea"></textarea>
                <label for="textarea" class="">Nova mensagem</label>
             </div>
          </div>
          <div class="row">
             <div class="input-field col s4 offset-s3">
                       <i class="material-icons prefix cyan-text">people</i>
                       <select id="recetores" style="position: absolute;width:300px; background-color:transparent; top: -10px; left: 45px; opacity: 1;display:none">
                        
                     </select>
              </div>
              <div class="input-field col s3 offset-s2">
                    <a id="send" class="waves-effect waves-light btn blue"><i class="material-icons left">send</i>Enviar</a>
              </div>
             </div>
          </div>
       </div>
       <!-- AddPhotos -->
    </div>`;
}

function list_mensagens_enviadas(conteudo,data){
    return `<div class="row">    
    <div class="col s6 offset-s6">          
        <div class="container1 darker">
            <img src="avatar.jpg" alt="Avatar" class="right">
            <p class="right">${conteudo}</p>
            <span class="time-left">${data}</span>
        </div>
    </div>            
</div>`;
}

function list_mensagens_recebidas(conteudo,data){
    return `<div class="row">
    <div class="col s6">
        <div class="container1">
            <img src="avatar.jpg" alt="Avatar">
            <p>${conteudo}?</p>
            <span class="time-right">${data}</span>
        </div>
    </div>
</div>`;
}


function show_options(empresa){
    return `<option value="${empresa.nome+' - '+empresa.email}" class="cyan-text">${empresa.nome+' - '+empresa.email}</option>`;
}

function show_row_1(empresa){
    return `<option value="${empresa.nome+' - '+empresa.email}" class="cyan-text">${empresa.nome+' - '+empresa.email}</option>`;
}

function list_options(nome,email){
    return `<a id=${nome} class="collection-item blue-text op"><span class="new badge blue">1</span><h6>${nome+' - '+email}</h6></a>`;
}

function make_VOs(){
    return `<div id="pedidos" class="row">
</div>`;
}

function make_VOs_1(){
    return ` <h5 class="header">Não existem pedidos pendentes</h5>`;
}

function show_VOs(VO,i,festival){
    return `<div class="row">
    <div class="col s12 m12">
        <h5 class="header">Pedido ${i}</h5>
        <div class="card horizontal">
            <div class="row">
                <div class="card-content col-m12">
                    <div class="col m6">
                      <h5>${festival.nome}</h5>
                    </div>
                    <div class="col m6">
                        <br>
                        <a class="card-action modal-trigger" id="ped${i}" href="#modal${i}">Ver mais informações</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="modal${i}" class="modal" style="top:5%; max-height: 90%!important;">
    <div class="modal-content">
        <div class="row">
            <i id='closeModal' class="small col m1 offset-m11 material-icons">clear</i>
        </div>
        <div class="card">
            <div class="row">
                <div class="card-image waves-effect waves-block waves-light">
                    <img id="imagem" class="activator" src="server/db/images/imagem1.jpg">
                </div>
            </div>
            <div class="row">
                <div class="card-content">
                    <div class="row">
                        <span class="card-title activator grey-text text-darken-4">Email do cliente:${VO.emailCliente}</span>
                    </div>
                    <p></p>
                    <br>
                    <div class="row">
                        <button id="aceitar" class="btn blue darken-2 col m2 offset-m3">Aceitar</button>
                        <button id="rejeitar" class="btn red darken-2 col m2 offset-m2">Rejeitar</button>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${VO.emailCliente}
                    <i class="material-icons right">close</i>
                </span>
                <p></p>
                <br>
                <div class="row">
                    <ul>
                        <li>
                            <span class="black-text">Email:${VO.emailCliente}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Nome do festival:${festival.nome}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Localização:${festival.localidade}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Data Inicio:${festival.dataInicio}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Data Fim:${festival.dataFim}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;  
}

function show_modal(VO,i,festival){
    return `<div id="modal${i}" class="modal" style="top:5%; max-height: 90%!important;">
    <div class="modal-content">
        <div class="row">
            <i id='closeModal' class="small col m1 offset-m11 material-icons">clear</i>
        </div>
        <div class="card">
            <div class="row">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="server/db/images/imagem1.jpg">
                </div>
            </div>
            <div class="row">
                <div class="card-content">
                    <div class="row">
                        <span class="card-title activator grey-text text-darken-4">${VO.emailCliente}</span>
                    </div>
                    <p></p>
                    <br>
                    <div class="row">
                        <button id="button1" class="btn blue darken-2 col m2 offset-m3">Aceitar</button>
                        <button id="button2" class="btn red darken-2 col m2 offset-m2">Rejeitar</button>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${VO.emailCliente}
                    <i class="material-icons right">close</i>
                </span>
                <p></p>
                <br>
                <div class="row">
                    <ul>
                        <li>
                            <span class="black-text">Email:${VO.emailCliente}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Nome:${festival.nome}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Localização:${festival.localidade}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Data Inicio:${festival.DataInicio}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Data Fim:${festival.DataFim}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function make_Empresas(){
    return `<div id="pedidos_empresas" class="row">
    </div>`;
}

function make_Empresas_1(){
    return ` <h5 class="header">Não existem pedidos pendentes</h5>`;
}

function show_empresas(empresa,k){
    return `<div class="row">
    <div class="col s12 m12">
        <h5 class="header">Pedido ${k}</h5>
        <div class="card horizontal">
            <div class="row">
                <div class="card-content col-m12">
                    <div class="col m6">
                      <h5>${empresa.nome}</h5>
                    </div>
                    <div class="col m6">
                        <br>
                        <a class="card-action modal-trigger" id="ped${k}" href="#modal${k}">Ver mais informações</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="modal${k}" class="modal" style="top:5%; max-height: 90%!important;">
    <div class="modal-content">
        <div class="row">
            <i id='closeModal' class="small col m1 offset-m11 material-icons">clear</i>
        </div>
        <div class="card">
            <div class="row">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="server/db/images/imagem1.jpg">
                </div>
            </div>
            <div class="row">
                <div class="card-content">
                    <div class="row">
                        <span class="card-title activator grey-text text-darken-4">Nome da empresa:${empresa.nome}</span>
                    </div>
                    <p></p>
                    <br>
                    <div class="row">
                        <button id="aceitar" class="btn blue darken-2 col m2 offset-m3">Aceitar</button>
                        <button id="rejeitar" class="btn red darken-2 col m2 offset-m2">Rejeitar</button>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${empresa.nome}
                    <i class="material-icons right">close</i>
                </span>
                <div class="row">
                    <ul>
                        <li>
                            <span class="black-text">Email da empresa: ${empresa.email}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Tipo de Serviço: ${empresa.tipo}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Telefone: ${empresa.telefone}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Numero de Trabalhadores: ${empresa.numTrabalhadores}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Localização: ${empresa.localidade}</span>
                        </li>
                        <p></p>
                        <li>
                            <span class="black-text">Zona de Operação: ${empresa.zonaOperacao} km</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
}
