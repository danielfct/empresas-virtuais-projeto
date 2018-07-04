function makeMessages(){
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

function show_row(empresa){
    return `<option value="${empresa.nome+' - '+empresa.email}" class="cyan-text">${empresa.nome+' - '+empresa.email}</option>`;
}

function list_options(nome,email){
    return `<a id=${nome} class="collection-item blue-text op"><span class="new badge blue">1</span><h6>${nome+' - '+email}</h6></a>`;
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

function make_newVO(){
    return `<div id="profile-page-wall-share">
    <div class="row">                 
      <div class="col s12">
          <ul class="tabs tab-profile z-depth-1 light-blue" style="width: 100%;">
              <li class="tab col s3 offset-m4" style="width: 33.3333%;">
                  <a class="white-text waves-effect waves-light active">
                      <i class="material-icons">edit</i> 
                      Criar nova VO
                  </a>
              </li>
              <div class="indicator" style="right: 576px; left: 0px;"></div>
          </ul>
      </div>
    </div>
    <p></p>
    <br>
    <div class="row">
      <div class="input-field col m8 offset-m2">
          <i class="material-icons prefix">account_circle</i>
          <select id="festivais" style="position: absolute; width:250px; top:-10px; left:55px; background-color:transparent; opacity: 1;display:block">
                        
          </select>                    
      </div>
    </div>
    <p></p>
    <br>
    <div class="row" style="margin-top:20px;">
        <div class="col m2 offset-m5">
            <button id="register" class="btn blue lighten-2">Submeter VO</button>
        </div>
    </div>
</div>`;
}

function show_festivais(festival){
    return `<option value="${festival.id}" class="black-text">${festival.nome}</option>`;
}

function make_newTask(){
    return `<div id="profile-page-wall-share">
    <div class="row">                 
      <div class="col s12">
          <ul class="tabs tab-profile z-depth-1 light-blue" style="width: 100%;">
              <li class="tab col s3 offset-m4" style="width: 33.3333%;">
                  <a class="white-text waves-effect waves-light active">
                      <i class="material-icons">edit</i> 
                      Criar nova Tarefa
                  </a>
              </li>
              <div class="indicator" style="right: 576px; left: 0px;"></div>
          </ul>
      </div>
    </div>
    <p></p>
    <br>
    <div class="row">
      <div class="input-field col m8 offset-m2">
          <i class="material-icons prefix">account_circle</i>
          <input id="nome" type="text" class="autocomplete validate">    
          <label for="nome">Nome da Tarefa</label>                    
      </div>
      <div class="input-field col m8 offset-m2">
        <i class="material-icons prefix">build</i>
        <input id="tipo" type="text" class="autocomplete validate">    
        <label for="tipo">Tipo</label>                    
        </div>
      <div class="input-field col m8 offset-m2" style="margin-top:20px; margin-bottom:20px;">
        VO associada
        <select id="idVO" style="position: absolute;width:300px; background-color:transparent; top: -10px; left: 150px; opacity: 1;display:block">                   
        </select>   
          <!--label for="idVO">VO associada</label-->                    
      </div>
      <div class="input-field col m8 offset-m2">
          <i class="material-icons prefix">calendar_today</i>
          <input id="Data" type="date" class="autocomplete validate">    
          <!--label for="Data">Data</label-->                    
      </div>
      <div class="input-field col m8 offset-m2">
          <i class="material-icons prefix">assignment_ind</i>
          <input id="responsavel" type="text" class="autocomplete validate">    
          <label for="responsavel">Responsavel</label>                    
      </div>
    </div>
    <p></p>
    <div class="row">
        <div class="col m2 offset-m5">
            <button id="register" class="btn blue lighten-2">Submeter Tarefa</button>
        </div>
    </div>
</div>`;
}

function make_feedback(task){
    return `<div class="row">
    <div id="rate" class="col-m6">
      <h5>${task.responsavel}</h5>
      <span>na tarefa <span class="blue-text">${task.nome}</span> teve um desempenho:</span>
      <span id="star1" class="fa fa-star"></span>
      <span id="star2" class="fa fa-star"></span>
      <span id="star3" class="fa fa-star"></span>
      <span id="star4" class="fa fa-star"></span>
      <span id="star5" class="fa fa-star"></span>
    </div>
  </div>`;
}

function make_feedback_VO(empresa, VO){
    return `<div class="row">
    <div id="rate" class="col-m6">
      <h5>${empresa.email}</h5>
      <span>na VO <span class="blue-text">${VO.nome}</span> teve um desempenho:</span>
      <span id="star1" class="fa fa-star"></span>
      <span id="star2" class="fa fa-star"></span>
      <span id="star3" class="fa fa-star"></span>
      <span id="star4" class="fa fa-star"></span>
      <span id="star5" class="fa fa-star"></span>
    </div>
  </div>`;
}

function show_task(task,number){
 return `<li class="collection-item dismissable" style="height:100px;  touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
 <input type="checkbox" id=${number} onclick="otherFunction(this)">
 <label for=${number} style="text-decoration: none;">${task.nome}
   <a class="secondary-content">
     <span class="ultra-small black-text">${task.dataTempoFim}</span>
   </a>
 </label>
 <span class="task-cat blue darken-1">${task.tipo}</span><span class="task-cat teal">${task.responsavel}</span><span class="task-cat grey darken-1">${task.estado}</span>
 <span id="myTasks" class="ultra-small task"><button onclick="buttonCheck(this)" id="option${number}" style="display:none;" class="btn green darken-2 col m5 offset-m7">Dar Feedback</button></span>
</li>`;
}

function show_VOs(number,festival){
    return `<li class="collection-item dismissable" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
    <input type="checkbox" id="V${number}" onclick="myFunction(this)">
    <label for="V${number}" style="text-decoration: none;"><span class="task-cat teal">${festival.nome}</span>
      <a class="secondary-content">
        <span class="ultra-small black-text">De ${festival.dataInicio}</span><span class="ultra-small black-text"> a ${festival.dataFim}</span>
      </a>
    </label>
    <span id="myVOs" class="ultra-small"><button id="buttonV${number}" style="display:none" class="btn red darken-2 col m3 offset-m8">Apagar</button></span>
   </li>`;
}

function make_listEnterprises(display1,display2,display3,display4){
    return `<div class="row">
    <div class="col m1"><p></p>Filtro</div>
    <ul class="col m11 light-blue">
        <li class="col m3" id="loc">
            <a class="white-text waves-effect waves-light active dropdown-menu" data-activates="Localizações">
                <span>Localização<i class="material-icons right">arrow_drop_down</i></span>          
            </a>

            <ul id="Localizações" class="dropdown-content dropdown-horizontal-list" style="position: absolute; top: 178px; left: 530px; opacity: 1; display: ${display1};">
                <li data-input="lisboa" id='lisboa'><a  class="cyan-text">Lisboa</a></li>
                <li data-input="almada" id='almada'><a  class="cyan-text">Almada</a></li>
                <li data-input="aveiro" id='aveiro'><a  class="cyan-text">Aveiro</a></li>
                <li data-input="barreiro" id='barreiro'><a  class="cyan-text">Barreiro</a></li>
                <li data-input="braga" id='braga'><a  class="cyan-text">Braga</a></li>
                <li data-input="coimbra" id='coimbra'><a  class="cyan-text">Coimbra</a></li>
                <li data-input="funchal" id='funchal'><a  class="cyan-text">Funchal</a></li>
                <li data-input="odemira" id='odemira'><a  class="cyan-text">Odemira</a></li>
                <li data-input="oeiras" id='oeiras'><a  class="cyan-text">Oeiras</a></li>
                <li data-input="porto" id='porto'><a  class="cyan-text">Porto</a></li>
                <li data-input="setubal" id='setubal'><a  class="cyan-text">Setubal</a></li>
                <li data-input="gaia" id='gaia'><a  class="cyan-text">Gaia</a></li>
            </ul>
        </li>
       
        
        <li class="col m3" id="serv">
            <a class="white-text waves-effect waves-light active dropdown-menu" data-activates="Serviços">
                <span>Serviços<i class="material-icons right">arrow_drop_down</i></span>              
            </a>
        </li>

        <ul id="Serviços" class="dropdown-content dropdown-horizontal-list" style="position: absolute; top: 178px; left: 720px; opacity: 1; display: ${display2};">
            <li data-input="Catering" id='Catering'><a  class="cyan-text">Catering</a></li>
            <li data-input="Logistico" id='Catering'><a  class="cyan-text">Logistico</a></li>
            <li data-input="Animações" id='myTasks'><a  class="cyan-text">Animação</a></li>
            <li data-input="Limpeza" id='myVO'><a  class="cyan-text">Limpeza</a></li>
            <li data-input="Técnico" id='myVO'><a  class="cyan-text">Serviços Técnicos</a></li>
            <li data-input="Segurança" id='myMessages'><a  class="cyan-text">Segurança</a></li>
         </ul>

        <li class="col m3" id="zona">
            <a class="white-text waves-effect waves-light active dropdown-menu" data-activates="Zona">
                <span>Zona Operação<i class="material-icons right">arrow_drop_down</i></span>                         
            </a>
        </li>

        <ul id="Zona" class="dropdown-content dropdown-horizontal-list" style="position: absolute; top: 178px; left: 940px; opacity: 1; display: ${display3};">
            <li data-input="10" id='myTasks'><a  class="cyan-text">+10 km</a></li>
            <li data-input="50" id='myVO'><a  class="cyan-text">+50 km</a></li>
            <li data-input="100" id='myMessages'><a  class="cyan-text">+100 km</a></li>
         </ul>

        <li class="col m3" id="trab">
            <a class="white-text waves-effect waves-light active dropdown-menu" data-activates="Trabalhadores">
                <span>Trabalhadores<i class="material-icons right">arrow_drop_down</i></span>                     
            </a>
        </li>

        <ul id="Trabalhadores" class="dropdown-content dropdown-horizontal-list" style="position: absolute; top: 178px; left: 1130px; opacity: 1; display: ${display4};">
            <li data-input="5" id='myTasks'><a  class="cyan-text">+5</a></li>
            <li data-input="10" id='myVO'><a  class="cyan-text">+10</a></li>
            <li data-input="20" id='myMessages'><a  class="cyan-text">+20</a></li>
            <li data-input="30" id='myTasks'><a  class="cyan-text">+30</a></li>
            <li data-input="40" id='myVO'><a  class="cyan-text">+40</a></li>
            <li data-input="50" id='myMessages'><a  class="cyan-text">+50</a></li>
         </ul>

        <div class="indicator" style="right: 576px; left: 0px;"></div>
    </ul>
 </div>
 <div id="list_empresas" class="row col s12 m12">
 </div>`;
}


function show_empresas(empresa,imagem,i,classificacao, classificacao_VO){
    return `<div id="empresa" class="row empresa">
    <h5 class="header">Empresa ${i}</h5>
  <div class="card horizontal">
    <div class="row">
        <div class="col m6 card-image">
            <img src="${imagem}" />
        </div>
        <div class="col m6">
            <div style="margin-top:80px;" class="row">
                <h5>${empresa.nome}</h5>
            </div>
            <div class="row">
             <div style="margin-top:60px;" class="col m8 offset-m4">
                <a class="modal-trigger" data-input="${i}" id="E${i}" href="#modal${i}">Ver mais info da empresa</a>
             </div>    
             </div>  
        </div>
    </div>
  </div>
</div>
<div id="modal${i}" class="modal" style="top:5%; max-height: 90%!important;">
    <div class="modal-content">
        <div class="row">
            <i id='closeModal${i}' class="small col m1 offset-m11 material-icons">clear</i>
        </div>
        <div class="card">
            <div class="row">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${imagem}">
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
                        <button id="chat${i}" class="btn blue darken-2 col m2 offset-m3">Chat</button>
                        <button id="convidar${i}" class="btn green darken-2 col m2 offset-m2">COnvidar para VO</button>
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
                        <p></p>
                        <li>
                            <span id="rating" class="black-text">Feedback tarefas: ${classificacao} <span id="star1" class="fa fa-star checked"></span>
                        </li>
                        <p></p>
                        <li>
                            <span id="rating" class="black-text">Feedback nas VOs: ${classificacao_VO} <span id="star1" class="fa fa-star checked"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function make_listPartners(){
    return ` <div id="partners" class="col s12 m12">
  </div>`;
}

function show_partners(festival,empresa,i){
    return `<div id="parceiro" class="row parceiro">
    <h5 class="header">Parceiro ${i}</h5>
  <div class="card horizontal">
    <div class="row">
        <div class="col m6 offset-m1">
            <div class="row">
                <h5>${empresa.emailEmpresa}</h5>
            </div>
            <div class="row">
             <div class="col m6 offset-m12">
                <a class="modal-trigger" data-input="${i}" id="P${i}" href="#modal${i}">Ver mais info da empresa</a>
             </div>    
             </div>  
        </div>
    </div>
  </div>
</div>
<div id="modal${i}" class="modal" style="top:5%; max-height: 90%!important;">
    <div class="modal-content">
        <div class="row">
            <i id='closeModal${i}' class="small col m1 offset-m11 material-icons">clear</i>
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
                        <span class="card-title activator grey-text text-darken-4">Nome da empresa:${empresa.emailEmpresa}</span>
                    </div>
                    <p></p>
                    <br>
                    <div class="row">
                        <button id="chat${i}" class="btn blue darken-2 col m2 offset-m3">Chat</button>
                        <button id="feedback${i}" class="btn green darken-2 col m2 offset-m2">Feedback</button>
                    </div>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${empresa.emailEmpresa}
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
                        <p></p>
                        <li>
                            <span class="black-text">Feedback: xxx </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function make_listFestivals(){
    return `<div id="festivals" class="row">
    </div>`;
    
}

function show_fest(festival,i,imagem){
    return `<div id="festival" class="row festival">
    <h5 class="header">Festival ${i}</h5>
    <div class="card horizontal">
      <div class="row">
          <div class="col m6 card-image">
              <img id="imagem" />
          </div>
          <div style="margin-top:80px;" class="col m6">
              <div class="row">
                  <h5>${festival.nome}</h5>
              </div>
              <div style="margin-top:60px;" class="row">
               <div class="col m8 offset-m6">
                  <a class="modal-trigger" data-input="${i}" id="E${i}" href="#modal${i}">Ver mais info do festival</a>
               </div>    
               </div>  
          </div>
      </div>
    </div>
  </div>
  </div>
        <div id="modal${i}" class="modal" style="display:none; top:5%; max-height: 90%!important; ">
        <div class="modal-content ">
            <div class="row ">
                <i id='closeModal' class="small col m1 offset-m11 material-icons ">clear</i>
            </div>
            <div class="card ">
                <div class="row ">
                    <div class="card-image waves-effect waves-block waves-light ">
                        <img class="activator" src="${imagem}">
                    </div>
                </div>
                <div class="row ">
                    <div class="card-content ">
                        <div class="row ">
                            <span class="card-title activator grey-text text-darken-4 ">Nome do Festival: ${festival.nome}</span>
                        </div>
                    </div>
                </div>
                <div class="card-reveal ">
                    <span class="card-title grey-text text-darken-4 ">${festival.nome}
                        <i class="material-icons right ">close</i>
                    </span>
                    <p></p>
                    <br>
                    <div class="row ">
                        <ul>
                        <p></p>
                            <li>
                                <span class="black-text ">Localização:${festival.localidade}</span>
                            </li>
                            <p></p>
                            <li>
                                <span class="black-text ">Data Inicio: ${festival.dataInicio}</span>
                            </li>
                            <p></p>
                            <li>
                                <span class="black-text ">Data Fim: ${festival.dataFim}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}