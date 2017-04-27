$(document).ready(function () {

    $('#login').focus();

    $('#login').keyup(function (e) {
        if ((e.keyCode == 13)) {
            $('#senha').focus();
        }
    });

    $('#login').change(function () {
        var cpf = $("#login").val();
        if (!vercpf(cpf)) {
            $("#vif_erro_login").html("O CPF digitado não é válido!");
            $("#login").val('');
        }
    });

    //Função para funcionar com enter $("#div_loader_1").show();
    $('#senha').keyup(function (e) {
        if ((e.keyCode == 13)) {
            $('#bt_logar').click();
        }
    });

    $('#bt_logar').click(function () {
        logar();
    });


    $('#bt_esqueci_senha').click(function () {
        if ($("#login").val() == "") {
            $("#vif_erro_login").html("Para recuperar sua senha, informe seu usuário (CPF).");
        } else {
            recuperarSenha();
        }
    });

    $('#bt_redefinir_senha').click(function () {

        if ($("#senha").val() == "") {
            $("#vif_erro_login").html("Digite a nova senha!");
            $("#senha").focus();
            return;
        }

        if ($("#senha").val() != $("#senha2").val()) {
            $("#vif_erro_login").html("As senhas digitadas são diferentes!");
            $("#senha").focus();
            return;
        }

        trocarSenha();

    });

    ifdialog.create({
        div: 'retorno_mensagem',
        title: 'Recuperação de senha',
        width: 300,
        height: 250,
        destroyOnClose: false,
        autoOpen: false
    });

});

function logar() {
    //alert('123');
    var params = $('#form1').serialize();
    $.ajax({
        dataType: 'json',
        type: 'post',
        url: "/controlador/ctrl_login/autenticar.php",
        data: params,
        beforeSend: function () {
            $("#div_loader_1").show();
        },
        success: function (data) {
            //alert(print_r(data));
            switch (data.status) {
                case "ok":
                    break;

                case "erro":
                    $("#vif_erro_login").html(data.msg);
                    break;

                case "redir":
                    var url = data.url;
                    location.href = url;
                    break;
            }
        },
        error: function () {
            $("#vif_erro_login").html('Desculpe,estamos com problemas técnicos!Tente novamente mais tarde');
        },
        complete: function () {
            $("#div_loader_1").hide();
        }
    });
}

function vercpf(cpf) {

    cpf = trim(cpf);

    if (isNaN(cpf)) return false;

    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") return false;

    add = 0;

    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);

    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(cpf.charAt(9))) return false;

    add = 0;

    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(cpf.charAt(10))) return false;

    return true;
}

function recuperarSenha() {


//    alert("Serviço em manutenção, a previsão de normalização: 12h do dia 22/09/2014.");
//    return;

    var params = $('#form1').serialize();

    $.ajax({
        dataType: 'json',
        type: 'post',
        url: "/controlador/phpmailer/enviarEmailRecuperacaoSenha.php",
        data: params,
        beforeSend: function () {
            $("#div_loader_1").show();
        },
        success: function (data) {
            switch (data.status) {
                case "ok":
                    $('#texto_mensagem').html(data.obj);
                    ifdialog.open('retorno_mensagem');
                    break;

                case "erro":
                    $("#vif_erro_login").html(data.msg);
                    break;

                case "redir":
                    var url = data.url;
                    location.href = url;
                    break;
            }
        },
        error: function () {
            $("#vif_erro_login").html('Desculpe,estamos com problemas técnicos!Tente novamente mais tarde');
        },
        complete: function () {
            $("#div_loader_1").hide();
            // $('#vif_erro_login').html('');
        }
    });
    return false;
}

function trocarSenha() {
    var params = $('#form_login').serialize();

    $.ajax({
        dataType: 'json',
        type: 'post',
        url: "/controlador/ctrl_login/trocarSenha.php",
        data: params,
        beforeSend: function () {
            $("#div_loader_1").show();
        },
        success: function (data) {
            //alert(print_r(data));
            switch (data.status) {
                case "ok":
                    break;
                case "erro":
                    $("#vif_erro_login").html(data.msg);
                    break;
                case "redir":
                    $('#vif_erro_login').html("A senha foi alterada com sucesso!");
                    var url = data.url;
                    location.href = url;
                    break;
            }
        },
        error: function () {
            $('#vif_erro_login').html('Desculpe, estamos com problemas técnicos!Tente novamente mais tarde');
        },
        complete: function () {
            $("#div_loader_1").hide();
        }
    });
}