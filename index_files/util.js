/**
 *Funções uteis
 *Versão 1.0 kj
 *Data  29/10/2010
 */
var PATH_MODULO = new String();
var PATH_MENSAGEM = new String();

function montarPathModulo(modulo) {
    $.ajax({
        dataType: 'json',
        type: 'get',
        url: "/controlador/ctrl_menu/consultarModulo.php?modulo=" + modulo,
        async: false,
        beforeSend: function () {
            $('#vif_titulo_sistema').html('<div align=\"center\"> <img src=\"/img/ajax_preloader.gif\" /></div>');
        },
        success: function (data) {

            switch (data.status) {
                case "ok":
                    PATH_MODULO = data.obj[0].ds_caminho_modulo;


                    break;

                case "erro":
                    Mensagem(data.msg, 'ERROR');
                    break;

                case "redir":
                    var url = trim(data.url);
                    location.href = url;
                    break;
            }
        },
        error: function () {
            Mensagem('Não foi possível chamar a função solicitada.', 'ERROR');
        },
        complete: function () {
            return PATH_MODULO;
        }
    });
}

function get(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function CarregaMenuInterno(href, target) {
    $('.ifDialog').remove();
    Carrega(href, target)
}

function Carrega(href, target) {

//    var params = 'href=' + href;
//    $.ajax({
//        dataType: 'json',
//        type: 'get',
//        url: "/ADM/controlador/ctrl_acesso_menu/cadastrarAdmLogAcessoMenu.php",
//        data: params,
//        beforeSend: function () {
//
//        },
//        success: function (data) {
//            switch (data.status) {
//                case "ok":
//                    break;
//                case "erro":
//                    ifdialog.alert(data.msg, 'ERROR');
//                    break;
//                case "redir":
//                    var url = trim(data.url);
//                    location.href = url;
//                    break;
//            }
//        },
//        error: function () {
//            Mensagem('Não foi possível chamar a função solicitada!');
//        },
//        complete: function () {
//
//        }
//
//    });


    $('#' + target).html("'<div align=\"center\"> <img src=\"/img/barra-loader.gif\" /></div>'");
    $("#" + target).load(href, function (response, status, xhr) {
        if (status == "success") {
            var params = 'href=' + href;
            $.ajax({
                dataType: 'json',
                type: 'get',
                url: "/ADM/controlador/ctrl_acesso_menu/cadastrarAdmLogAcessoMenu.php",
                data: params,
                beforeSend: function () {
                },
                success: function (data) {
                    switch (data.status) {
                        case "ok":
                            break;
                        case "erro":
                            ifdialog.alert(data.msg, 'ERROR');
                            break;
                        case "redir":
                            var url = trim(data.url);
                            location.href = url;
                            break;
                    }
                },
                error: function () {
                    Mensagem('Não foi possível chamar a função solicitada!');
                },
                complete: function () {
                }
            });
            $('#chamar_menu').val(href);
//            $('#cm_modulo_id').val($("#cm_modulo_help").val());
        }
        if (status == "error") {
            var msg = "Falha ao carregar: ";
            alert(msg + xhr.status + " " + xhr.statusText);
        }
    });


//    $("#" + target).load(href, function (responseTxt, statusTxt, xhr) {
//        if (statusTxt == "success") {
//            $('#chamar_menu').val(href);
//           $('#cm_modulo_id').val($("#cm_modulo_help").val());
//        }
//        if (statusTxt == "error") {
//            Mensagem('Erro ao carregar a página.Contate o administrador do sistema', 'ERROR');
//        }
//    });
}

function Mensagem(msg, tipo) {
    var img = new String;
    if (typeof tipo == 'undefined') {
        img = '/img/bt_msg_ok.png';
    } else {
        if (tipo == 'ERROR') {
            img = '/img/bt_msg_error.png';
        }
        if (tipo == 'WARNING') {
            img = '/img/bt_msg_warning.png';
        }
        if (tipo == 'INFORMATION') {
            img = '/img/bt_msg_information.png';
        }
    }

    $('#resposta').html('<div id="msg" align="center"><p><img src="' + img + '" align="left"/>' + msg + '</p></div>');
    $('#msg').dialog({
        title: 'VIRTUAL-IF',
        modal: true,
        resizable: false,
        height: 170,
        width: 300,
        buttons: {
            "Ok": function () {
                $('#resposta').html("");
                $(this).dialog("destroy");
            }
        }

    });
}

function Confirma(titulo, msg) {

    var img = '/img/bt_msg_information.png';

    $('#resposta').html('<div id="msg" align="center"><p><img src="' + img + '" align="left"/>' + msg + '</p></div>');
    $('#msg').dialog({
        title: titulo,
        modal: true,
        resizable: false,
        height: 150,
        buttons: {
            "Sim": function () {
                $(this).dialog("close");
                return false;
            },
            "Não": function () {
                $(this).dialog("close");
                return true
            }
        }
    });
}

function MensagemMaior(msg) {

    $('#resposta').html('<div id="msg" align="center">' + msg + '</div>');
    $('#msg').dialog({
        title: 'VIRTUAL-IF',
        modal: true,
        resizable: false,
        height: 220,
        buttons: {
            "Ok": function () {
                $('#resposta').html("");
                $(this).dialog("destroy");
            }
        }
    });
}

function MensagemConfirma(msg, urlControladorDeletar, titulo) {

    var img = '/img/bt_msg_information.png';
    var id_vazio = document.getElementById('id').value;

    if (id_vazio == '') {
        Mensagem('Formulário em Branco!', 'ERROR');
    } else {
        $('#resposta').html('<div  id=msg-deletar align=\"center\"><p><img src="' + img + '" align="left"/>' + msg + '</p></div>');
        $("#msg-deletar").dialog({
            title: titulo,
            resizable: false,
            height: 150,
            modal: true,
            buttons: {
                "Sim": function () {
                    DeletarRegistro(urlControladorDeletar);
                    $(this).dialog("close");
                    return true;
                },
                "Não": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    return false;
}

// Função criada para deletar sem utilizar o params
function MensagemConfirma2(msg, id_deletar, urlControladorDeletar, titulo, funcao) {

    var img = '/img/bt_msg_information.png';
    $('#resposta').html('<div  id=\"msg-deletar\" align=\"center\"><p><img src="' + img + '" align="left"/>' + msg + '</p></div>');

    $("#msg-deletar").dialog({
        title: titulo,
        resizable: false,
        height: 150,
        modal: true,
        buttons: {
            "Sim": function () {
                var arquivo = '?id_deletar=' + id_deletar;
                var xurl = urlControladorDeletar;
                var params = $('form').serialize();
                var div_alvo = 'loader';

                $.ajax({
                    dataType: 'json',
                    type: 'get',
                    url: xurl + arquivo,
                    data: params,
                    beforeSend: function () {
                        $('#' + div_alvo).html('<div align=\"center\"> <img src=\"/img/ajax_preloader.gif\" /></div>');
                    },
                    success: function (data) {

                        $('#' + div_alvo).html('');

                        switch (data.status) {

                            case "ok":
                                Mensagem("Excluido com sucesso!");
                                break;

                            case "erro":
                                Mensagem(data.msg, 'ERROR');
                                break;

                            case "redir":
                                var url = trim(data.url);
                                location.href = url;
                                break;
                        }
                    },
                    error: function () {
                        Mensagem('Não foi possível carregar a função solicitada!', 'ERROR');
                    },
                    complete: function () {
                        eval(funcao);
                    }
                });

                $(this).dialog("close");
                return 'YES';
            },
            "Não": function () {
                $(this).dialog("close");
                return 'NO';
            }
        }
    });
}

function DeletarRegistro(urlControladorDeletar) {

    var params = $('form').serialize();
    var div_alvo = $('#form1').attr('target');

    $.ajax({
        dataType: 'json',
        type: 'get',
        url: urlControladorDeletar,
        data: {
            id: $('#id').val()
        },
        beforeSend: function () {
            $('#' + div_alvo).html('<div align=\"center\"> <img src=\"/img/ajax_preloader.gif\" /></div>');
        },
        success: function (data) {

            switch (data.status) {

                case "ok":
                    Mensagem('Excluido com sucesso!');
                    clearForm();
                    break;

                case "erro":
                    Mensagem(data.msg, 'ERROR');
                    break;

                case "redir":
                    var url = trim(data.url);
                    location.href = url;
                    break;
            }
        },
        error: function () {
            Mensagem('Não foi possivel deletar o registro!', 'ERROR');
        }
    });
}

function salvarRegistro(urlControladorSalvar, funcao) {

    var params = $('form').serialize();
    var div_alvo = $('#form1').attr('target');

    $.ajax({
        dataType: 'json',
        type: 'post',
        url: urlControladorSalvar,
        data: params,
        beforeSend: function () {
            $('#' + div_alvo).html('<div align=\"center\"> <img src=\"/img/ajax_preloader.gif\" /></div>');
        },
        success: function (data) {

            switch (data.status) {

                case "ok":
                {
                    ifdialog.alert('Inserido com sucesso!');
                    return data;
                    clearForm();
                    break;
                }
                case "erro":
                {
                    ifdialog.alert(data.msg, 'ERROR');
                    clearForm();
                    break;
                }

                case "redir":
                {
                    var url = trim(data.url);
                    location.href = url;
                    break;
                }
            }
        },
        error: function () {
            ifdialog.alert('Não foi possível carregar a função solicitada!', 'ERROR');
        },
        complete: function () {
            eval(funcao);
        }
    });
}

function salvarRegistro(urlControladorSalvar) {

    var params = $('#form1').serialize();
    var div_alvo = $('#form1').attr('target');

    $.ajax({
        dataType: 'json',
        type: 'post',
        url: urlControladorSalvar,
        data: params,
        beforeSend: function () {
            $('#' + div_alvo).html('<div align=\"center\"> <img src=\"/img/ajax_preloader.gif\" /></div>');
        },
        success: function (data) {

            switch (data.status) {

                case "ok":
                {
                    ifdialog.alert('Inserido com sucesso!');
                    clearForm();
                    break;
                }

                case "erro":
                {
                    ifdialog.alert(data.msg, 'ERROR');
                    clearForm();
                    break;
                }

                case "redir":
                {
                    var url = trim(data.url);
                    location.href = url;
                    break;
                }
            }
        },
        error: function () {
            Mensagem('Não foi possível salvar  os dados informados', 'ERROR');
        }

    });
}

function print_r(arr, text, tab) {
    var text = (text ? text : "Array \n("), tab = (tab ? tab : "\t");

    for (key in arr)
        if (typeof arr[key] == "object")
            text = print_r(arr[key], text + "\n" + tab + "[" + key + "] => Array \n" + tab + "(", "\t" + tab);
        else
            text += "\n" + tab + "[" + key + "] => " + arr[key];

    text += "\n" + (tab.substr(0, tab.length - 1)) + ")\n";

    return text

}


function formatar_processo(value) {
    var aux = new String(value);

    if (value == null) {
        return "";
    } else {
        if (aux.length > 0) {

            return aux.substring(4, 10) + "/" + aux.substring(0, 4) + "-" + aux.substring(10, aux.length);
        } else {
            return "";
        }
    }
}

function DDMMAAAA(value) {

//    var aux = new String(value);
//    if (value == null) {
//        return null
//    } else {
//        if (aux.length > 0) {
//            return aux.substring(0, 10);
//        } else {
//            return "";
//        }
//    }


//    alert(value);

    var aux = new String(value);
    if (value == null) {
        return null
    } else {
        if (aux.length > 0) {
            return aux.substring(8, 10) + "/" + aux.substring(5, 7) + "/" + aux.substring(0, 4);
        } else {
            return "";
        }
    }
}

function DDMMAAAAStamp(value) {
    var aux = new String(value);
    if (value == null) {
        return null
    } else {
        if (aux.length > 0) {
            return aux.substring(6, 8) + "/" + aux.substring(4, 6) + "/" + aux.substring(0, 4);
        } else {
            return "";
        }
    }
}

function DDMMAAAAHHMMSS(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        var dt = aux.substring(8, 10) + "/" + aux.substring(5, 7) + "/" + aux.substring(0, 4);
        var hr = aux.substr(11, 2) + ':' + aux.substr(14, 2) + ':' + aux.substr(17, 2);
        return dt + ' ' + hr;
    } else {
        return "";
    }
}


function HHMM(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        var hr = aux.substr(0, 2) + ':' + aux.substr(3, 2);
        return hr;
    } else {
        return "";
    }
}

function Dia(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        return aux.substring(8, 10);
    } else {
        return "";
    }
}

function Mes(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        return aux.substring(5, 7);
    } else {
        return "";
    }
}

function Ano(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        return aux.substring(0, 4);
    } else {
        return "";
    }
}

function RetornarMes(value) {
    var mes = new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez");
    return mes[parseFloat(value) - 1];
}

function RetornarCampusAbrev(value) {
    var campus = "";
    campus = value.split(" ");

    if (campus.length > 1) {
        if (campus[0] == 'CÂMPUS') {
            campus[0] = 'C.';
        }

        if (campus[1] == 'AVANÇADO') {
            campus[1] = 'AV.';
        }
        for (i = 1; i < campus.length; i++) {
            campus[0] += ' ' + campus[i];
        }
    }

    return campus[0];

}

//Primeiro e 2 nome
function RetornarNome(value) {
    var nome = "";
    var palavras = new Array("DAS", "DA", "DE", "DI", "DOS", "DO", "DUS", "DU");
    nome = value.split(" ");

    if (palavras.toString().indexOf(nome[1]) > -1) {
        //existe a palavra no array
        nome[0] += ' ' + nome[1] + '<br/>' + nome[2];
    } else {
        //não existe a palavra no array
        nome[0] += '<br/>' + nome[1];
    }
    ;
    return nome[0];
}

//função  primeiro nome
function changeCase(frmObj) {


    var index;
    var tmpStr;
    var tmpChar;
    var preString;
    var postString;
    var strLen = 0;
    tmpStr = frmObj.toLowerCase();

    strLen = tmpStr.length;

    if (strLen > 0) {
        for (index = 0; index < strLen; index++) {
            if (index == 0) {
                tmpChar = tmpStr.substring(0, 1).toUpperCase();
                postString = tmpStr.substring(1, strLen);
                tmpStr = tmpChar + postString;
            }
            else {
                tmpChar = tmpStr.substring(index, index + 1);
                if (tmpChar == " " && index < (strLen - 1)) {
                    tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                    preString = tmpStr.substring(0, index + 1);
                    postString = tmpStr.substring(index + 2, strLen);
                    tmpStr = preString + tmpChar + postString;
                }
            }
        }
    }
    return tmpStr;
}

function primeiroNome(value) {
    var nome = "";
    nome = value.split(" ");
    return changeCase(nome[0]);
}

function clearFormId(form) {
    $("#" + form + " input, #" + form + " textarea, #" + form + " select").each(function () {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'hidden' || t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
        // this.selectedIndex = -1; ANTIGO
            this.selectedIndex = 0;
        $(this).parent('td').removeClass('atencao');
        $(this).parent('td').removeClass('atencao_erro');
    });
}

function clearForm() {
    $("form input, form textarea, form select").each(function () {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'hidden' || t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
        // this.selectedIndex = -1; ANTIGO
            this.selectedIndex = 0;
        $(this).parent('td').removeClass('atencao');
        $(this).parent('td').removeClass('atencao_erro');
    });
}

function Hora(value) {
    var aux = new String(value);
    if (aux.length > 0) {
        return aux.substring(11, 16);
    } else {
        return "";
    }
}

function validarCampos(nome_form) {

    var retorno = true;

    $('.obrigatorio').each(function () {

        if ($(this).parents().is("#" + nome_form)) {

            if (retorno && ($(this).attr('tagName').toString().toLowerCase() == 'div')) {
                $('#tabs').tabs('select', '#' + $(this).attr('id').toString().toLowerCase());
            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'input') {
                if (($(this).val().toString().length == 0) || ($(this).val() == '')) {

                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }
            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'select') {
                if ((this.selectedIndex < 0) || (($(this).val().toString().length == 0) || ($(this).val() == ''))) {


                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }

            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'textarea') {
                if (($(this).val().toString().length == 0) || (trim($(this).val()) == '')) {

                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }
            }

        }
    });
    return retorno;
}

function validarCamposDiv(nome_form) {

    var retorno = true;

    $('.obrigatorio').each(function () {

        if ($(this).parents().is("#" + nome_form)) {

            if (retorno && ($(this).attr('tagName').toString().toLowerCase() == 'div')) {
                $('#tabs').tabs('select', '#' + $(this).attr('id').toString().toLowerCase());
            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'input') {
                if (($(this).val().toString().length == 0) || ($(this).val() == '')) {

                    $(this).parent().addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent().removeClass('atencao');
                }
            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'select') {
                if ((this.selectedIndex < 0) || (($(this).val().toString().length == 0) || ($(this).val() == ''))) {


                    $(this).parent().addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent().removeClass('atencao');
                }

            }

            if ($(this).attr('tagName').toString().toLowerCase() == 'textarea') {
                if (($(this).val().toString().length == 0) || (trim($(this).val()) == '')) {

                    $(this).parent().addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent().removeClass('atencao');
                }
            }

        }
    });
    return retorno;
}

function validarCamposjQuery11(nome_form) {

    var retorno = true;

    $('.obrigatorio').each(function () {

        if ($(this).parents().is("#" + nome_form)) {

            if (retorno && ($(this).prop('tagName').toString().toLowerCase() == 'div')) {
                $('#tabs').tabs('select', '#' + $(this).prop('id').toString().toLowerCase());
            }

            if ($(this).prop('tagName').toString().toLowerCase() == 'input') {
                if (($(this).val().toString().length == 0) || ($(this).val() == '')) {

                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }
            }

            if ($(this).prop('tagName').toString().toLowerCase() == 'select') {
                if ((this.selectedIndex < 0) || (($(this).val().toString().length == 0) || ($(this).val() == ''))) {


                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }

            }

            if ($(this).prop('tagName').toString().toLowerCase() == 'textarea') {
                if (($(this).val().toString().length == 0) || (trim($(this).val()) == '')) {

                    $(this).parent('td').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('td').removeClass('atencao');
                }
            }

        }
    });
    return retorno;
}

function validarCamposjQuery11Div(nome_form) {

    var retorno = true;

    $('.obrigatorio').each(function () {

        if ($(this).parents().is("#" + nome_form)) {

            if (retorno && ($(this).prop('tagName').toString().toLowerCase() == 'div')) {
                $('#tabs').tabs('select', '#' + $(this).prop('id').toString().toLowerCase());
            }

            if ($(this).prop('tagName').toString().toLowerCase() == 'input') {
                if (($(this).val().toString().length == 0) || ($(this).val() == '')) {

                    $(this).parent('div').addClass('atencao');
                    
                    retorno = false;
                } else {
                    $(this).parent('div').removeClass('atencao');
                }
            }
                     

            if ($(this).prop('tagName').toString().toLowerCase() == 'select') {
                if ((this.selectedIndex < 0) || (($(this).val().toString().length == 0) || ($(this).val() == ''))) {


                    $(this).parent('div').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('div').removeClass('atencao');
                }

            }

            if ($(this).prop('tagName').toString().toLowerCase() == 'textarea') {
                if (($(this).val().toString().length == 0) || (trim($(this).val()) == '')) {

                    $(this).parent('div').addClass('atencao');
                    retorno = false;
                } else {
                    $(this).parent('div').removeClass('atencao');
                }
            }

        }
    });
    return retorno;
}


function validarCampoUnico(nome_campo) {

    var retorno = true;


    if (retorno && ($('#' + nome_campo).attr('tagName').toString().toLowerCase() == 'div')) {
        $('#tabs').tabs('select', '#' + $('#' + nome_campo).attr('id').toString().toLowerCase());
    }

    if ($('#' + nome_campo).attr('tagName').toString().toLowerCase() == 'input') {

        if (($('#' + nome_campo).val().toString().length == 0) || ($('#' + nome_campo).val() == '')) {
            $('#' + nome_campo).parent('td').addClass('atencao');
            retorno = false;
        } else {
            $('#' + nome_campo).parent('td').removeClass('atencao');
        }
    }

    if ($('#' + nome_campo).attr('tagName').toString().toLowerCase() == 'select') {

        if (($('#' + nome_campo).selectedIndex < 0) || (($('#' + nome_campo).val().toString().length == 0) || ($('#' + nome_campo).val() == ''))) {
            $('#' + nome_campo).parent('td').addClass('atencao');
            retorno = false;
        } else {
            $(this).parent('td').removeClass('atencao');
        }

    }

    if ($('#' + nome_campo).attr('tagName').toString().toLowerCase() == 'textarea') {

        if (($('#' + nome_campo).val().toString().length == 0) || ($('#' + nome_campo).val() == '')) {
            $(this).parent('td').addClass('atencao');
            retorno = false;
        } else {
            $(this).parent('td').removeClass('atencao');
        }
    }


    return retorno;
}

//Função para verificar se a data é válida
function Verifica_Data(data_postagem) {
    //Se o parâmetro obrigatório for igual à zero, significa que elepode estar vazio, caso contrário, não
    var data = document.getElementById(data_postagem);
    var strdata = data.value;

    //Verifica a quantidade de digitos informada esta correta.
    if (strdata.length != 10) {
        Mensagem("Formato da data não é válido. Formato correto: - dd/mm/aaaa.", 'ERROR');
        data.focus();
        return false
    }
    //Verifica o formato da data
    if ("/" != strdata.substr(2, 1) || "/" != strdata.substr(5, 1)) {
        Mensagem("Formato da data não é válido. Formato correto: - dd/mm/aaaa.", 'ERROR');
        data.focus();
        return false
    }
    var dia = strdata.substr(0, 2)
    var mes = strdata.substr(3, 2);
    var ano = strdata.substr(6, 4);
    //Verifica o dia
    if (isNaN(dia) || dia > 31 || dia < 1) {
        Mensagem("Formato do dia não é válido.", 'ERROR');
        data.focus();
        return false
    }
    if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
        if (dia == "31") {
            Mensagem("O mês informado não possui 31 dias.", 'ERROR');
            data.focus();
            return false
        }
    }
    if (mes == "02") {
        var bissexto = ano % 4;
        if (bissexto == 0) {
            if (dia > 29) {
                Mensagem("O mês informado possui somente 29 dias.", 'ERROR');
                data.focus();
                return false
            }
        } else {
            if (dia > 28) {
                Mensagem("O mês informado possui somente 28 dias.", 'ERROR');
                data.focus();
                return false
            }
        }
    }
    //Verifica o mês
    if (isNaN(mes) || mes > 12 || mes < 1) {
        Mensagem("Formato do mês não é válido.", 'ERROR');
        data.focus();
        return false
    }
    //Verifica o ano
    if (isNaN(ano)) {
        Mensagem("Formato do ano não é válido.", 'ERROR');
        data.focus();
        return false
    }

    return true;
}

function VerificaData(digData) {
    var bissexto = 0;
    var data = digData;
    var tam = data.length;
    if (tam == 10) {
        var dia = data.substr(0, 2)
        var mes = data.substr(3, 2)
        var ano = data.substr(6, 4)
        if ((ano > 1900) || (ano < 2100)) {
            switch (mes) {
                case '01':
                case '03':
                case '05':
                case '07':
                case '08':
                case '10':
                case '12':
                    if (dia <= 31) {
                        return true;
                    }
                    break

                case '04':
                case '06':
                case '09':
                case '11':
                    if (dia <= 30) {
                        return true;
                    }
                    break
                case '02':
                    /* Validando ano Bissexto / fevereiro / dia */
                    if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0)) {
                        bissexto = 1;
                    }
                    if ((bissexto == 1) && (dia <= 29)) {
                        return true;
                    }
                    if ((bissexto != 1) && (dia <= 28)) {
                        return true;
                    }
                    break
            }
        }
    }
    return false;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function formatarTelefone( ddd, numero ) {

    var str = "";

    if ( ddd != null && ddd != 0 ) {
        str += '(' + ddd + ') ';
    } else {
        str += '';
    }

    if ( numero != null && numero != 0 ) {
        var s = numero + '';
        //996667857
        //96667857
        if (s.length == 9) {
            str += s.substr(0, 5) + '-' + s.substr(5, 7);
        } else {
            str += s.substr(0, 4) + '-' + s.substr(4, 7);
        }
    } else {
        str += 'não possui';
    }

    return str;
}

function formatarCPFCNPJ(value) {

    var str = "";

    if (value == null || value == "") {
        str += 'não informado';
    } else {
        var s = value + '';
        switch (s.length) {
            case 11:
                str += s.substr(0, 3) + '.' + s.substr(3, 3) + '.' + s.substr(6, 3) + '-' + s.substr(9, 2);
                break;
            case 14:
                str += s.substr(0, 2) + '.' + s.substr(2, 3) + '.' + s.substr(5, 3) + '/' + s.substr(8, 4) + '-' + s.substr(12, 2);
                break;
        }
    }

    return str;
}

function formatarCEP(value) {

    var str = "";

    if (value == null || value == "") {
        str += 'não possui';
    } else {
        var s = value + '';
        switch (s.length) {
            case 8:
                str += s.substr(0, 2) + '.' + s.substr(2, 3) + '-' + s.substr(5, 3);
                break;
            default:
                str += value;
                break;
        }
    }

    return str;
}

function campoVazio(value) {

    switch (value) {
        case 0:
        case '0':
        case undefined:
        case 'undefined':
        case 'UNDEFINED':
        case null:
        case 'null':
        case 'NULL':
            return true;
            break;
        default:
            return false;
    }
}

// Função para  aguarde  do usuário
function mensagemAguarde() {
    var img = "/img/bt_ampulheta.gif";
    $('#resposta').html('<div id="aguarde" align="center"><p><img src="' + img + '"align="left"/>Aguarde, processando dados ...</p></div>');
    $('#aguarde').dialog({
        modal: true,
        resizable: false,
        height: 100,
        width: 300,
        close: function () {
            $('#aguarde').dialog("destroy");
            $('#aguarde').remove();
        }


    });
    $('.ui-dialog-titlebar').css('display', 'none');
}

function Informativo(msg) {
    var img = "/img/logo_campanha.png";
    $('#resposta').html('<div id="informativo" align="left" style="line-height:2;><p style="line-height:2;">' + msg + '</p></div>');
    $('#informativo').dialog({
        modal: true,
        resizable: false,
        height: 450,
        width: 600


    });
    $('.ui-dialog-titlebar').css('display', 'none');
}

function fecharInformativo() {
    $('#informativo').dialog('close');

}

function rawurlencode(str) {
    // URL-encodes string  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/rawurlencode
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Michael Grier
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: rawurlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin%20van%20Zonneveld%21'
    // *     example 2: rawurlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: rawurlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

//Função para decodificação de codigos HTML usado no framework ckeditor
function rawurldecode(str) {
    // Decodes URL-encodes string
    //Descriptografia do conteudo
    // version: 901.1411
    // discuss at: http://phpjs.org/functions/rawurldecode
    // +   original by: Brett Zamir
    // *     example 1: rawurldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin+van+Zonneveld!'
    // *     example 2: rawurldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: rawurldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    var histogram = {};
    var ret = str.toString();

    var replacer = function (search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };

    // The histogram is identical to the one in urlencode.
    histogram["'"] = '%27';
    histogram['('] = '%28';
    histogram[')'] = '%29';
    histogram['*'] = '%2A';
    histogram['~'] = '%7E';
    histogram['!'] = '%21';

    for (replace in histogram) {
        search = histogram[replace]; // Switch order when decoding
        ret = replacer(search, replace, ret) // Custom replace. No regexing
    }

    // End with decodeURIComponent, which most resembles PHP's encoding functions //
    ret = decodeURIComponent(ret);

    return ret;
}

function calcular_idade(data) {

    var array_data = data.split("/");

    //se o array nao tem tres partes, a data eh incorreta
    if (array_data.length != 3)
        return false;

    //comprovo que o ano, mes, dia são corretos
    var ano = parseInt(array_data[2]);
    if (isNaN(ano))
        return false;

    var mes = parseInt(array_data[1]);
    if (isNaN(mes))
        return false;

    var dia = parseInt(array_data[0]);
    if (isNaN(dia))
        return false;

    // ajuste para 4 dígitos
    if (ano <= 99)
        ano += 1900;

    var hoje = new Date();

    //subtraio os anos das duas datas
    var idade = hoje.getFullYear() - ano - 1; //-1 porque ainda nao fez anos durante este ano

    //se subtraio os meses e for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu
    if (hoje.getMonth() + 1 - mes < 0) //+ 1 porque os meses comecam em 0
        return idade;

    if (hoje.getMonth() + 1 - mes > 0)
        return idade + 1;

    //entao eh porque sao iguais. Vejo os dias
    //se subtraio os dias e der menor que 0 entao nao cumpriu anos. Se der maior ou igual sim que já cumpriu
    if (hoje.getUTCDate() - dia >= 0)
        return idade + 1;

    return idade;
}

function romanizar(number) {

    var ones_numerals = new Array();
    ones_numerals[0] = "";
    ones_numerals[1] = "I";
    ones_numerals[2] = "II";
    ones_numerals[3] = "III";
    ones_numerals[4] = "IV";
    ones_numerals[5] = "V";
    ones_numerals[6] = "VI";
    ones_numerals[7] = "VII";
    ones_numerals[8] = "VIII";
    ones_numerals[9] = "IX";

    var tens_numerals = new Array();
    tens_numerals[0] = "";
    tens_numerals[1] = "X";
    tens_numerals[2] = "XX";
    tens_numerals[3] = "XXX";
    tens_numerals[4] = "XL";
    tens_numerals[5] = "L";
    tens_numerals[6] = "LX";
    tens_numerals[7] = "LXX";
    tens_numerals[8] = "LXXX";
    tens_numerals[9] = "XC";

    var hundreds_numerals = new Array();
    hundreds_numerals[0] = "";
    hundreds_numerals[1] = "C";
    hundreds_numerals[2] = "CC";
    hundreds_numerals[3] = "CCC";
    hundreds_numerals[4] = "CD";
    hundreds_numerals[5] = "D";
    hundreds_numerals[6] = "DC";
    hundreds_numerals[7] = "DCC";
    hundreds_numerals[8] = "DCCC";
    hundreds_numerals[9] = "CM";

    var thousands_numerals = new Array();
    thousands_numerals[0] = "";
    thousands_numerals[1] = "M";
    thousands_numerals[2] = "MM";
    thousands_numerals[3] = "MMM";

    if ((parseInt(number) < 0) || (parseInt(number) > 4000)) {
        // parametro invalido
        return number;
    }

    var new_num = parseInt(number);
    var thousands = Math.floor(new_num / 1000);
    new_num -= thousands * 1000;
    var hundreds = Math.floor(new_num / 100);
    new_num -= hundreds * 100;
    var tens = Math.floor(new_num / 10);
    new_num -= tens * 10;
    var ones = Math.floor(new_num / 1);
    if ((thousands == NaN) || (hundreds == NaN) || (tens == NaN) || (ones == NaN)) {
        // número inválido
        return number;
    }

    var place_values = new Array(thousands, hundreds, tens, ones);
    var numeral = "";
    numeral += thousands_numerals[place_values[0]];
    numeral += hundreds_numerals[place_values[1]];
    numeral += tens_numerals[place_values[2]];
    numeral += ones_numerals[place_values[3]];

    if (numeral.indexOf('undefined') == -1) {
        // conversão bem sucedida
        return numeral;
    }

    // falha da conversão
    return number;
}

//limpa inputs do formulário
function limpaFormulario(id) {

    $('#' + id + ' :input')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');

}

function formataDecimal(valor) {
    var txt = new String();
    txt = valor.toString();
    txt = txt.replace(",", ".");
    var val = 0.0;
    val = parseFloat(txt);
    var aux = val.toFixed(2);
    return aux.toString().replace(".", ",");
}

function isNumeric(str) {
    var er = /^[0-9]+$/;
    return (er.test(str));
}