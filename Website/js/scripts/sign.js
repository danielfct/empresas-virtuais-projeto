function Enterprise(nome, email, password, number, pais, cidade, localidade, range, workers, type, imagem) {
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

function Client(first_name, last_name, username, email, password, number, m_number, morada) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.nome = first_name + ' ' + last_name;
    this.telefone = number;
    this.telemovel = m_number;
    this.morada = morada;
}

var type;
var imagem;

$('#button1').click(function () {
    $('#main').html(makeSignPageEnterprise());
    $('#register').click(function () {
        var nome = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var pass = document.getElementById('password').value;
        var number = document.getElementById('phoneNumber').value;
        var pais = document.getElementById('country').value; //TODO
        var cidade = document.getElementById('city').value; //TODO
        var localidade = document.getElementById('location').value;
        var range = document.getElementById('range').value;
        var workers = document.getElementById('workersNumber').value;
        var type = checkOptions();
        var imagem = document.getElementById('blah').src.substring(23);
        //console.log(imagem);  
        var enterprise = new Enterprise(nome, email, pass, number, pais, cidade, localidade, range, workers, type, imagem);
        var enterprise_JSON = JSON.stringify(enterprise);
        //console.log(enterprise_JSON);
        insertEnterprise(enterprise_JSON);
        signIn(1);
    })
});

$('#button2').click(function () {
    $('#main').html(makeSignPageClient());
    $('#register').click(function () {
        var first_name = document.getElementById('first_name').value;
        var last_name = document.getElementById('last_name').value;
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var pass = document.getElementById('password').value;
        var number = document.getElementById('PhoneNumber').value;
        var m_number = document.getElementById('MobileNumber').value;
        var morada = document.getElementById('Address').value;
        var cliente = new Client(first_name, last_name, username, email, pass, number, m_number, morada);
        var cliente_JSON = JSON.stringify(cliente);
        console.log(cliente_JSON);
        insertClient(cliente_JSON);
        signIn(0);
    })
});

function checkOptions() {
    //var type='batata';
    if ($('#Catering').is(':checked')) { type = "Catering"; }
    else if ($('#Segurança').is(':checked')) { type = "Segurança"; }
    else if ($('#Animaçao').is(':checked')) { type = "Animaçao"; }
    else if ($('#Limpeza').is(':checked')) { type = "Limpeza"; }
    else if ($('#Serviços').is(':checked')) { type = "Serviços"; }
    return type;
}

function insertClient(client) {
    var data_file = "http://localhost/evr/registar_cliente.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            //console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response.message);
            //M.toast({html: response.message})
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(client);
}

function insertEnterprise(enterprise) {
    var data_file = "http://localhost/evr/registar_empresa.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            console.log(http_request.responseText);
            response = JSON.parse(http_request.responseText);
            console.log(response.message);
            // M.toast({html: response.message})
        }
    }

    http_request.open("POST", data_file, true);
    http_request.send(enterprise);
}

function signIn(tipo) {

    var modal = document.getElementById('modal1');
    console.log(modal);
    modal.style.display = 'block';

    $('#logIn').click(function () {
        var email = document.getElementById('emailModal').value;
        var pass = document.getElementById('passwordModal').value;
        console.log('email:' + email + ' pass:' + pass);
        checkUser(email, pass, tipo);
        //location.href = "www.yoursite.com";
    })
}

function get_user(email) {
    var data_file = "http://localhost/evr/get_clientes.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // Javascript function JSON.parse to parse JSON data
            response = JSON.parse(http_request.responseText);
            console.log(response[0]);
            localStorage.setItem('User-Logged', JSON.stringify(response[0]));
            location.href = "Userpage.html";
        }
    }

    http_request.open("GET", data_file + '?filter=email&value=' + email, true);
    //console.log('{"email":"'+email+'", "password":"'+pass+'"}');
    http_request.send();
}

function get_enterprise(email) {
    var data_file = "http://localhost/evr/get_empresas.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // Javascript function JSON.parse to parse JSON data
            response = JSON.parse(http_request.responseText);
            console.log(response[0]);
            localStorage.setItem('User-Logged', JSON.stringify(response[0]));
            location.href = "Enterprise.html";
        }
    }

    http_request.open("GET", data_file + '?filter=email&value=' + email, true);
    //console.log('{"email":"'+email+'", "password":"'+pass+'"}');
    http_request.send();
}


function checkUser(email, pass, tipo) {
    var data_file = "http://localhost/evr/autenticacao.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // Javascript function JSON.parse to parse JSON data
            response = JSON.parse(http_request.responseText);
            console.log(response);
            if (tipo === 0) {
                if (response.message === '') {
                    get_user(email);
                }
                else {
                    M.toast({ html: response.message });
                }
            }
            else {
                if (response.message === '') {
                    get_enterprise(email);
                }
                else {
                    M.toast({ html: response.message });
                }
            }
        }
    }

    http_request.open("POST", data_file, true);
    //console.log('{"email":"'+email+'", "password":"'+pass+'"}');
    http_request.send('{"tipo":' + tipo + ',"email":"' + email + '", "password":"' + pass + '"}');
}

function loadJSONCountries() {
    var data_file = "http://localhost/evr/get_paises.php";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function () {

        if (http_request.readyState == 4) {
            // TODO Javascript function JSON.parse to parse JSON data
            var jsonObj = JSON.parse(http_request.responseText);

            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
            document.getElementById("Name").innerHTML = jsonObj.name;
            document.getElementById("Country").innerHTML = jsonObj.country;
        }
    }

    http_request.open("GET", data_file, true);
    http_request.send();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        imagem = input.files[0].name;
        reader.onload = function (e) {
            //console.log(e.target.result);
            $('#blah')
                .attr('src', e.target.result)
                .width(250)
                .height(150);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
