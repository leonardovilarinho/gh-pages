/*implementado para não carregar duas vezes o js,
 *pois bagunçaria o controle da ordem das janelas criadas
 */
/*
 if ($("body").hasClass('__ifdialog_')) {
 console.log('ifdialog já carregado...');    
 } else {
 $.getScript('/js/ifDialog_code.js');
 $("body").addClass('__ifdialog_');
 }
 */
var ifDialog_conta_z_index = 100;
var ifDialog_janelas_abertas = [];
var ifDialog_qtd_abertas = 0;
//var ifDialog_conta_dialogos = 5000;
var ifdialog = new ObjIfdialog();

/*
 TopZIndex 1.2 (October 21, 2010) plugin for jQuery
 http://topzindex.googlecode.com/
 Copyright (c) 2009-2011 Todd Northrop
 http://www.speednet.biz/
 Licensed under GPL 3, see  <http://www.gnu.org/licenses/>
 */
(function (a) {
    a.topZIndex = function (b) {
        return Math.max(0, Math.max.apply(null, a.map((b || "*") === "*" ? a.makeArray(document.getElementsByTagName("*")) : a(b), function (b) {
            return parseFloat(a(b).css("z-index")) || null
        })))
    };
    a.fn.topZIndex = function (b) {
        if (this.length === 0)
            return this;
        b = a.extend({increment: 1}, b);
        var c = a.topZIndex(b.selector), d = b.increment;
        return this.each(function () {
            this.style.zIndex = c += d
        })
    }
})(jQuery);


function ObjIfdialog() {

    this.create = function (obj) {

        var janela = new String();
        var titulo = new String();
        var altura = 300;
        var largura = 400;
        var autoOpen = true;
        var destroyAoFechar = true;
        var data = new String;
        var draggable = true;
        var resizable = true;
        var modal = true;
        var zindex = 0;

        // var loadUrl__ = new String();

        if (obj.div == undefined) {
            alert('NOME DA DIV NÃO FOI DEFINIDO!');
            return;
        } else {
            janela = obj.div;
        }

        if (!$('#' + obj.div)[0]) {
            $('body').append("<div id='" + obj.div + "' class='ifDialog'></div>");
            //$('body').prepend("<div id='" + obj.div + "' class='ifDialog'></div>");         
        }

        if (obj.title !== undefined) {
            titulo = obj.title;
        }


        if (obj.height !== undefined) {
            if (!isNaN(obj.height)) {
                altura = obj.height
            } else {
                aux = obj.height.replace(/%/, '');
                if (isNaN(aux)) {
                    alert(obj.div + " não possui HEIGHT válido!");
                } else {
                    altura = Math.round($(window).height() * (aux / 100));
                }
            }

        }

        if (obj.width !== undefined) {
            if (!isNaN(obj.width)) {
                largura = obj.width
            } else {
                aux = obj.width.replace(/%/, '');
                if (isNaN(aux)) {
                    alert(obj.div + " não possui WIDTH válido!");
                } else {
                    largura = Math.round($(window).width() * (aux / 100));
                }
            }
        }

        /*        if (obj.height !== undefined) {
         altura = obj.height;
         } 
         if (obj.width !== undefined) {
         largura = obj.width;
         } */
        if (obj.autoOpen !== undefined) {
            autoOpen = obj.autoOpen;
        }
        if (obj.destroyOnClose !== undefined) {
            destroyAoFechar = obj.destroyOnClose;
        }

        if (obj.data !== undefined) {
            if (obj.loadUrl == undefined) {
                alert('Dados só podem ser setados quando um arquivo é carregado!');
            }
            data = "?" + obj.data;
        }

        if (obj.draggable !== undefined) {
            draggable = obj.draggable;
        }

        if (obj.resizable !== undefined) {
            resizable = obj.resizable;
        }

        if (obj.modal !== undefined) {
            modal = obj.modal;
        }

        if (obj.zindex !== undefined) {
            zindex = obj.zindex;
        }


        /*------------------------------------------------*/
        var id = '#dialog' + janela;

        var conteudo_janela = String();


        //conteudo_janela+="<div id=\"mask"+janela+"\" class=\"mask\">";
        conteudo_janela += "<div id=\"mask" + janela + "\" class=\"mask\"></div>";
        conteudo_janela += "<div id=\"dialog" + janela + "\" class=\"ifDialog\">";
        //conteudo_janela+="<div id=\"mask"+janela+"\" class=\"mask\">backgroound</div>";
        conteudo_janela += "<div id='area_titulo_" + janela + "' class='titulo' ondblclick=\"_ifdialog_maximizar('" + id + "');\">";
        conteudo_janela += "<div class=\"ifDialog_miolo_titulo\" id=\"titulo_" + janela + "\">" + titulo + "</div>";

        //ifDialog_destroy
        if (destroyAoFechar == true) {
            conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"ifDialog_destroy('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
        }
        else {
            conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"ifDialog_fecha('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
        }

        conteudo_janela += "</div>";
        conteudo_janela += "<div class=\"conteudo\" id=\"conteudo_" + janela + "\">";
        conteudo_janela += "</div>";

        conteudo_janela += "</div>";

        $("body").append(conteudo_janela);

        //var id = '#dialog'+janela;
        $(id).attr('_modal', modal);
        $(id).attr('_resizable', resizable);
        $(id).attr('_draggable', draggable);
        $(id).attr('_destroyonclose', destroyAoFechar);

        //controle zindex
        $(id).attr('_zindex', zindex);

        if (resizable) {
            var winH = $(window).height();
            var winW = $(window).width();
            $(id).css('min-width', largura);
            $(id).css('min-height', altura);
            $(id).css('max-width', winW);
            $(id).css('max-height', winH);
            $(id).css('height', 'auto');
            $(id).css('width', 'auto');
        } else {
            $(id).css('width', largura);
            $(id).css('height', altura);
            /*$(id).css('overflow', 'auto');*/
        }

        if (draggable) {
            var id_titulo = "#area_titulo_" + janela;
            $(id).draggable({
                cursor: "move",
                containment: "parent",
                handle: id_titulo
            });
        }

        if (resizable) {
            $(id).resizable({
                minHeight: altura,
                minWidth: largura
            });
        }


        if (obj.loadUrl !== undefined) {
            if (obj.afterLoadUrl !== undefined) {
                $("#conteudo_" + janela).load(obj.loadUrl + data, obj.afterLoadUrl);
            } else {
                $("#conteudo_" + janela).load(obj.loadUrl + data);
            }
        } else {
            $("#conteudo_" + janela).html($("#" + janela).html());
        }

        $("#" + janela).remove();

        if (autoOpen == true) {
            ifDialog_abre(janela);
        }


    };

    this.open = function (div) {
        ifDialog_abre(div);
    };

    this.close = function (div) {
        var id = '#dialog' + div;
        if ($(id).attr("_destroyonclose") == 'false') {
            ifDialog_fecha(div);
        } else {
            ifDialog_destroy(div);
        }
    };

    this.destroy = function (div) {
        ifDialog_destroy(div);
    };

    this.load = function (div, url) {
        ifDialog_carrega_pagina(div, url);
    };

    this.alert = function (texto, icone, func) {
        //ifDialog_janela_mensagem(msg);
        var img = new String;

        if (typeof func == 'undefined') {
            func = '';
        }

        /*
        if (typeof icone == 'undefined') {
            img = '/img/bt_msg_ok.png';
        } else {
            if (icone == 'ERROR') {
                img = '/img/bt_msg_error.png';
            }
            if (icone == 'WARNING') {
                img = '/img/bt_msg_warning.png';
            }
            if (icone == 'INFORMATION') {
                img = '/img/bt_msg_information.png';
            }
        }
        */

        switch (icone)
        {
            case 'undefined':
                img = '/img/bt_msg_sucesso.png';
            break;

            case 'ERROR':
                img = '/img/bt_msg_erro.png';
            break;

            case 'WARNING':
                img = '/img/bt_msg_alerta.png';
            break;

            case 'INFORMATION':
                img = '/img/bt_msg_informacao.png';
            break;

            default:
                img = '/img/bt_msg_sucesso.png';
            break;
        }

        var d = new Date();
        var janela = 'ifdialog_' + d.getTime();

        var conteudo_janela = String();

        conteudo_janela += "<div id=\"mask" + janela + "\" class=\"mask\">";
        conteudo_janela += "<div id=\"dialog" + janela + "\" class=\"ifDialog\" >";
        conteudo_janela += "<div class='titulo' id='area_titulo_" + janela + "'>";
        conteudo_janela += "<div class=\"ifDialog_miolo_titulo\" id=\"titulo_" + janela + "\">" + "VIRTUALIF Alerta" + "</div>";
        conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"" + func + "ifDialog_destroy('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
        conteudo_janela += "</div>";
        conteudo_janela += "<div class=\"conteudo\" id=\"conteudo_" + janela + "\">";
        conteudo_janela += "</div>";
        conteudo_janela += "</div>";
        conteudo_janela += "</div>";
        $("body").append(conteudo_janela);
        var id = '#dialog' + janela;
        $(id).css({
            'width': 400
        });
        $(id).css({
            'min-height': 200,
            'height': 'auto'
        });
        var id_titulo = "#area_titulo_" + janela;
        $(id).draggable({
            cursor: "move",
            containment: "parent",
            handle: id_titulo
        });

        //COLOCANDO ESSE CONTROLE FIXO PARA JANELAS DE CONFIRMACAO
        $(id).attr('_zindex', 'semiauto');


        $(id).attr('_modal', "true");
        $(id).attr('_resizable', "true");
        $(id).attr('_draggable', "true");
        $(id).attr('_destroyonclose', "true");

        //***************
        var _mensagem = new String();
        _mensagem += '<table style="width: 100%;">';
        _mensagem += '<tr>';
        _mensagem += '<td style="text-align: center; vertical-align: middle; width: 70px;">';
        _mensagem += '<img src="' + img + '" style="margin-top: 20px; margin-bottom: 20px;">';
        _mensagem += '</td>';
        _mensagem += '<td class="ifdialog_mensagem">';
        _mensagem += texto;
        _mensagem += '</td>';
        _mensagem += '</tr>';
        _mensagem += '</table>';
        //***********




        $("#conteudo_" + janela).html(_mensagem);
        //ifDialog_adiciona_botao(janela, "Ok", func + "ifDialog_destroy('"+janela+"');") ;
        this.addButton(janela, "Ok", func + "ifDialog_destroy('" + janela + "');", true, 1);
        ifDialog_abre(janela);

    };

    this.confirm = function (texto, funcao, funcao_no) {        //ifDialog_janela_confirmacao(texto, funcao);


        var funcao_nao = new String();

        if (typeof funcao_no == 'undefined') {
            funcao_nao = '';
        } else {
            funcao_nao = funcao_no;
        }

        var d = new Date();
        var janela = 'ifdialog_' + d.getTime();

        var conteudo_janela = String();
        conteudo_janela += "<div id=\"mask" + janela + "\" class=\"mask\">";
        conteudo_janela += "<div id=\"dialog" + janela + "\" class=\"ifDialog\">";
        conteudo_janela += "<div class='titulo' id='area_titulo_" + janela + "'>";
        conteudo_janela += "<div class=\"ifDialog_miolo_titulo\" id=\"titulo_" + janela + "\">" + "VIRTUALIF Confirmação" + "</div>";
        conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"ifDialog_destroy('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
        conteudo_janela += "</div>";
        conteudo_janela += "<div class=\"conteudo\" id=\"conteudo_" + janela + "\">";
        conteudo_janela += "</div>";
        conteudo_janela += "</div>";
        conteudo_janela += "</div>";
        $("body").append(conteudo_janela);
        var id = '#dialog' + janela;
        $(id).css({
            'width': 400
        });
        $(id).css({
            'min-height': 200,
            'height': 'auto'
        });
        var id_titulo = "#area_titulo_" + janela;

        $(id).draggable({
            cursor: "move",
            containment: "parent",
            handle: id_titulo
        });

        $(id).attr('_modal', "true");
        $(id).attr('_resizable', "true");
        $(id).attr('_draggable', "true");
        $(id).attr('_destroyonclose', "true");

        //COLOCANDO ESSE CONTROLE FIXO PARA JANELAS DE CONFIRMACAO
        $(id).attr('_zindex', 'semiauto');


        //***************
        var _mensagem = new String();
        _mensagem += '<table style="width: 100%;">';
        _mensagem += '<tr>';
        _mensagem += '<td style="text-align: center; vertical-align: middle; width: 70px;">';
        _mensagem += '<img src="/img/bt_msg_informacao.png" style="margin-top: 20px; margin-bottom: 20px;">';
        _mensagem += '</td>';
        _mensagem += '<td class="ifdialog_mensagem">';
        _mensagem += texto;
        _mensagem += '</td>';
        _mensagem += '</tr>';
        _mensagem += '</table>';
        //***********



        $("#conteudo_" + janela).html(_mensagem);
        this.addButton(janela, "Sim", "ifDialog_destroy('" + janela + "');" + funcao, true, 'S');
        this.addButton(janela, "Não", "ifDialog_destroy('" + janela + "');" + funcao_nao, false, 'N');
        ifDialog_abre(janela);


    };

    this.addButton = function (janela, botao, funcao, focado, tecla_atalho) {

        var id = "#dialog" + janela;
        var focar = '';

        if (!$(id)[0]) {
            alert("Você ainda não estilizou a div \"" + janela + "\" - addButton!");
            return;
        }

        if (typeof focado == 'undefined') {
            focar = '';
        } else {
            if (focado == true) {
                focar = 'focado';
            }
        }

        if (typeof tecla_atalho == 'undefined') {
            tecla_atalho = 0;
        }


        var conteudo_janela = String();

        if (!$(id + " .botoes").length) {
            conteudo_janela += "<div class=\"botoes\">";
            conteudo_janela += "</div>";
            $(id).append(conteudo_janela);
            conteudo_janela = '';
        }

        if (funcao == "fecha($this));") {
            funcao = "ifDialog_destroy('" + janela + "');";
        }

        //conteudo_janela = "<a href=\"#\" class=\"ifDialog_botao_dialogo\" onclick=\"" + funcao + "\" accesskey=\"1\">" + botao + "</a>";
        conteudo_janela = "<input type=\"button\" class=\"ifDialog_botao_dialogo " + focar + "\" onclick=\"" + funcao + "\" accesskey=\"" + tecla_atalho + "\" value=\"" + botao + "\" />";

        $(id + " .botoes").append(conteudo_janela);


        // $(id+" .botoes").append(
        //     "<a href=\"#\" class=\"ifDialog_botao_dialogo\" onClick=\""+funcao+"\">"+botao+"</a>"
        //     );


    }

    /*    
     this.addButton = function(janela, botao, funcao) {
     ifDialog_adiciona_botao(janela, botao, funcao)
     }
     */

    this.setTitle = function (janela, titulo) {
        $('#titulo_' + janela).html(titulo);
    };

    this.jsonToTable = function (data, skeleton, table) { //obj, modelo, destino

        if (data == null) {
            document.write("jsonToTable - Dados estão nulos");
        }

        if (skeleton == undefined) {
            document.write("jsonToTable - modelo está nulo");
        }

        if (table == null) {
            document.write("jsonToTable - table de destino nulo");
        }


        var __classe = new String();
        var __linha = new String();
        var __tabela = new String();
        //var nome = new String();

        $.each(data, function (i, reg) {
            __classe = i % 2 == 0 ? 'cor_sim' : 'cor_nao';
            __linha = skeleton.html();
            __linha = __linha.replace(/_classe_/g, __classe);
            $.each(reg, function (__y, __campo) {
                var __token = "#" + __y + "#";
                var __er = new RegExp(__token, "ig");
                __linha = __linha.replace(__er, __campo == null ? '' : __campo);
            });
            __tabela += __linha;
        });

        table.html(__tabela);

    };


    this.jsonToHTML = function (data, skeleton, table) { //obj, modelo, destino

        if (data == null) {
            document.write("jsonToHTML - Dados estão nulos");
        }

        if (skeleton == undefined) {
            document.write("jsonToHTML - modelo está nulo");
        }

        if (table == null) {
            document.write("jsonToHTML - table de destino nulo");
        }

        var __classe = new String();
        var __linha = new String();
        //var __tabela = new String();
        //var nome = new String();

        __linha = skeleton.html();
        $.each(data, function (__y, __campo) {
            var __token = "#" + __y + "#";
            var __er = new RegExp(__token, "ig");
            __linha = __linha.replace(__er, __campo == null ? '' : __campo);
        });

        table.html(__linha);

    };


    this.jsonToTableMasterDetail = function (data, skeleton_head, skeleton_detail, head_group, sub_vetor, detail_group, table) { //obj, modelo cabeçalho mestre,modelo detalhe,agrupamento1,agrupamento2 destino

        if (data == null) {
            document.write("jsonToTable - Dados estão nulos");
        }

        if (skeleton_head == undefined) {
            document.write("jsonToTable - modelo está nulo");
        }

        if (skeleton_detail == undefined) {
            document.write("jsonToTable - modelo está nulo");
        }

        if (table == null) {
            document.write("jsonToTable - table de destino nulo");
        }
        var __classe = new String();
        var __linha = new String();
        var __tabela = new String();
        var __linha_2 = new String();
        //var nome = new String();

        $.each(data, function (i, reg) {
            __linha = skeleton_head.html();
            //__linha = __linha.replace(/_classe_/g, __classe);
            i = false
            $.each(reg, function (__y, __campo) {
                if (!i) {
                    i = true;
                    __linha += head_group.html()
                }
                var __token = "#" + __y + "#";
                var __er = new RegExp(__token, "ig");
                __linha = __linha.replace(__er, __campo == null ? '' : __campo);

                //alert(__y+" , "+__campo)
                if (__y == sub_vetor) {
                    if (__campo != null) {
                        cont_class = 0;
                        $.each(__campo, function (__x, __campo_detail_tmp) {
                            __classe = cont_class++ % 2 == 0 ? 'cor_sim' : 'cor_nao';
                            if (__campo_detail_tmp[detail_group] == reg['id']) {
                                __linha_2 = skeleton_detail.html();
                                __linha_2 = __linha_2.replace(/_classe_/g, __classe)
                                if (__campo_detail_tmp !== null) {
                                    $.each(__campo_detail_tmp, function (__z, __campo_detail) {
                                        var __token_2 = "#" + __z + "#";
                                        var __er_2 = new RegExp(__token_2, "ig");
                                        __linha_2 = __linha_2.replace(__er_2, __campo_detail == null ? '' : __campo_detail);

                                    })
                                }
                                __linha += __linha_2;
                            }
                            //alert("X:"+__x+" , campo "+__campo_detail_tmp);
                        })
                    }
                }
            });
            __tabela += __linha;
            //alert("teste-- ");
        });

        table.html(__tabela);

    };
    
    this.jsonToTableGroup = function (registros, destino_conteudo, skeleton_detail, skeleton_column_header, skeleton_group_header, campo_group) { 
        if (registros == undefined || registros == null){
        	console.log("Parâmetro registros indeterminados. [1]");
        	return;
        }
        if (destino_conteudo == undefined || destino_conteudo == null || destino_conteudo.html() == null ){
        	console.log("Parâmetro destino_conteudo indeterminado. [2]");
        	return;
        }        
        if (skeleton_detail == undefined || skeleton_detail == null || skeleton_detail.html() == null || skeleton_detail.html().trim().length == 0){
        	console.log("Parâmetro skeleton_detail indeterminado. [3]");
        	return;
        }
        if ( (campo_group != undefined && campo_group != null ) &&  
        	 (skeleton_group_header == undefined || skeleton_group_header == null || skeleton_group_header.html() == null )){
        	console.log("Parâmetro skeleton_group_header indeterminado. [5]");
        }
        
        var tabela = new String();
        var linha_modelo = skeleton_detail.html();
        var linha_group_modelo = skeleton_group_header.html();
        var campo_group_anterior = "";
    	
    	$.each(registros, function(index, reg) {
    		if (campo_group != undefined && campo_group != null){
    			var linha_group = linha_group_modelo;
    			if (campo_group_anterior != reg[campo_group] && linha_group != null){
    				campo_group_anterior = reg[campo_group];
    				
    				$.each(reg, function(campo, valor) {
    	    			var __token = "#" + campo + "#";
    	                var __er = new RegExp(__token, "ig");
    	                linha_group = linha_group.replace(__er, valor == null ? '' : valor);
    	    		});
    				tabela += linha_group;
    				
        			if (skeleton_column_header != undefined && skeleton_column_header != null){
        				tabela += skeleton_column_header.html();
        			}
    			}
    		}
    		
    		var linha = linha_modelo;
    		$.each(reg, function(campo, valor) {
    			var __token = "#" + campo + "#";
                var __er = new RegExp(__token, "ig");
                linha = linha.replace(__er, valor == null ? '' : valor);
    		});
    		tabela += linha;
		});
		
		destino_conteudo.html(tabela);
    };

    this.loader = function (div) {

        if (div == undefined) {
            alert('NOME DA DIV NÃO FOI DEFINIDO!');
            return;
        } else {
            janela = div;
        }

        if (!$('#' + div)[0]) {
            $('body').append("<div id='" + div + "' class='ifDialog'></div>");
        }

        /*------------------------------------------------*/
        var id = '#dialog' + janela;

        var conteudo_janela = String();


        //conteudo_janela+="<div id=\"mask"+janela+"\" class=\"mask\">";
        conteudo_janela += "<div id=\"mask" + janela + "\" class=\"mask\"></div>";
        conteudo_janela += "<div id=\"dialog" + janela + "\" class=\"ifDialog\">";
        conteudo_janela += "<table style=\"width: 100%; height: 100%\">" +
            "<tr>" +
            "<td style=\"text-align: center; vertical-align: middle; font-size: 12px; color: #666666;\">" +
            "<span>Aguarde, processando...</span><br />" +
            "<img src=\"/ERP/MAC/CRA/visao/img/loader.gif\" />" +
            "</td></tr></table>";
        conteudo_janela += "</div>";

        // conteudo_janela+="</div>";      

        //alert(conteudo_janela);


        $("body").append(conteudo_janela);

        $(id).attr('_modal', true);
        $(id).attr('_resizable', false);
        $(id).attr('_draggable', false);
        $(id).attr('_destroyonclose', true);

        /*
         if (resizable) {
         var winH = $(window).height();
         var winW = $(window).width();
         $(id).css('min-width', largura);
         $(id).css('min-height', altura);
         $(id).css('max-width', winW);
         $(id).css('max-height', winH);
         //$(id).css('width', largura);
         //$(id).css('height', altura);
         $(id).css('height', 'auto');
         $(id).css('width', 'auto');
         } else {
         $(id).css('width', largura);
         $(id).css('height', altura);
         }
         */

        /*
         if (draggable) {
         var id_titulo = "#area_titulo_" + janela;
         $(id).draggable({
         cursor: "move",
         containment: "parent",
         handle: id_titulo            
         });
         }
         */

        /*
         if (resizable) {
         $(id).resizable({
         minHeight: altura, 
         minWidth: largura
         });
         }
         */

        /* 
         if (obj.loadUrl !== undefined) {
         $("#conteudo_"+janela).load(obj.loadUrl + data);
         } else {
         $("#conteudo_"+janela).html($("#"+janela).html());
         }
         */

        $("#" + janela).remove();
        ifDialog_abre(janela);
    };

    this.resize = function () {

        var winH = $(window).height();
        var winW = $(window).width();
        var docH = $(document).height();
        var _top = 0;
        var _left = 0;
        var _position = '';
        var aux = 0;

        $('.mask').css('height', docH);
        $('.mask').css('width', winW);

        $('.ifDialog').each(function (index, value) {
            var divH = $(this).height();
            var divW = $(this).width();

            if ((winH > divH) && (winW > divW)) {
                _position = 'fixed';
            } else {
                _position = 'absolute';
            }

            if (winH > divH) {
                aux = ((winH - divH) / 2);
                _top = ~~aux;
            } else {
                _top = 0;
            }

            if (winW > divW) {
                aux = ((winW - divW) / 2);
                _left = ~~aux;
            } else {
                _left = 0;
            }

            $(this).css('top', _top);
            $(this).css('left', _left);
            $(this).css('position', _position);
        });


    };

    /*------------------------------------------------*/

}

function ifDialog_janela_aberta(janela) {

    for (i = 0; i <= ifDialog_qtd_abertas; i++) {

        alert(ifDialog_janelas_abertas[i]);

        if (ifDialog_janelas_abertas[i] == janela) {
            return true;
        }
    }
    return false;
}

function ifDialog_abre(janela) {

    var id = "#dialog" + janela;

    if (!$(id)[0]) {
        alert(id + " não encontrado!");
    }


    var id_mask = "#mask" + janela;
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    ifDialog_conta_z_index++;
    $(id_mask).css('width', maskWidth);
    $(id_mask).css('height', maskHeight);
    //  $(id_mask).css('z-index', ifDialog_conta_z_index);
    //$(id_mask).topZIndex();

    var winScroll = 0; //      $(window).scrollTop();    
    var winH = $(window).height();
    var winW = $(window).width();
    var divH = $(id).height();
    var divW = $(id).width();
    var _top = 0;
    var _left = 0;
    var aux = 0;


    if (winH > divH) {
        aux = ((winH - divH) / 2);
        if (winScroll > aux) {
            aux = aux + winScroll;
        }
        _top = ~~aux;
    }

    if (divH > winH) {
        _top = 0;
    }

    if (winW > divW) {
        aux = ((winW - divW) / 2);
        _left = ~~aux;
    }

    if (divW > winW) {
        _left = 0;
    }


    ifDialog_conta_z_index++;
    //  $(id).css('z-index', ifDialog_conta_z_index);
    $(id).css('top', _top);
    $(id).css('left', _left);


    var _tmp_zindex = $(id).attr('_zindex');
    if (_tmp_zindex > 0) {
        $(id).css('z-index', _tmp_zindex);
    }
    else if (_tmp_zindex = 'semiauto') {
        $(id).css('z-index', ifDialog_conta_z_index + 1);
        $(id_mask).css('z-index', ifDialog_conta_z_index);
    }

    //$(id).prepend("z-index = " + ifDialog_conta_z_index);

    if ($(id).attr('_modal') == "true") {
        $(id_mask).show();
    }
    //$(id).topZIndex();
    $(id).show();

    $(id + " .botoes .focado").focus();

//$("#botao_teste").focus();
}

function ifDialog_mostra_mascara(janela) {
    var id = "#mask" + janela;

    //armazena a largura e a altura da tela
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Define largura e altura do div#mask iguais ás dimensões da tela

    //BLOCO ABAIXO COMENTADO PARA TESTE
    //SUSPEITA DE PROBLEMAS COM O Z-INDEX
    // INICIO BLOCO
    //19/11-2014***************
    //ifDialog_conta_z_index++;
    //******************
    //---- FIM BLOCO


    $(id).css('width', maskWidth);
    $(id).css('height', maskHeight);
//    $(id).css('z-index', ifDialog_conta_z_index);
    $(id).show();
}

function ifDialog_destroy(janela) {
    //alert('vai destruir'+janela);
    ifDialog_fecha(janela);
    $("#dialog" + janela).remove();
    $("#mask" + janela).remove();

}

function ifDialog_fecha(janela) {
    $("#dialog" + janela).hide();
    $("#mask" + janela).hide();
    ifDialog_qtd_abertas--;
    ifDialog_conta_z_index -= 1;
}

function ifDialog_fecha_ultima_aberta() {
    if (ifDialog_qtd_abertas > 0) {
        ifDialog_fecha(ifDialog_janelas_abertas[ifDialog_qtd_abertas]);
    }
}

function ifDialog_carrega_pagina(div, href) {
    // Carrega(href, "conteudo_"+div);
    $("#conteudo_" + div).load(href);
}

function ifDialog_adiciona_botao(janela, botao, funcao) {
    var id = "#dialog" + janela;

    if ($(id).length) {

        var conteudo_janela = String();

        if (!$(id + " .botoes").length) {
            conteudo_janela += "<div class=\"botoes\">";
            conteudo_janela += "</div>";
            $(id).append(conteudo_janela);
        }

        if (funcao == "fecha($this));") {
            funcao = "ifDialog_destroy('" + janela + "');";
        }

        $(id + " .botoes").append(
            "<a href=\"#\" class=\"ifDialog_botao_dialogo\" onClick=\"" + funcao + "\">" + botao + "</a>"
        );


    }
    else {
        alert("Você ainda não estilizou a div \"" + janela + "\"!");
    }
}

function ifDialog_janela_mensagem(texto) {

    var data = new Date();
    var conteudo_janela = String();
    var id = "ifDialog_" + data.getTime();

    $("#dialog" + id + " .botoes").html("");

    conteudo_janela += "<div id=\"" + id + "\">";
    conteudo_janela += "<div align=\"center\">";
    conteudo_janela += texto;
    conteudo_janela += "</div>";
    conteudo_janela += "</div>";

    $("body").append(conteudo_janela);
    ifDialog_estiliza_janela(id, 'Alerta', 200, 400, false);
    ifDialog_adiciona_botao(id, "Ok", "fecha($this));");
    ifDialog_abre(id);
}

function ifDialog_janela_confirmacao(texto, funcao) {

    var conteudo_janela = String();
    var data = new Date();
    var id = "ifDialog_" + data.getTime();

    conteudo_janela += "<div id=\"" + id + "\">";

    conteudo_janela += '<div>';
    conteudo_janela += '<table style="width: 100%;">';
    conteudo_janela += '<tr>';
    conteudo_janela += '<td style="text-align: center; vertical-align: middle;">';
    conteudo_janela += '<img src="/img/bt_msg_informacao.png" style="margin-top: 20px; margin-bottom: 20px;">';
    conteudo_janela += '</td>';
    conteudo_janela += '<td style="text-align: left; vertical-align: middle;">';
    conteudo_janela += texto;
    conteudo_janela += '</td>';
    conteudo_janela += '</tr>';
    conteudo_janela += '</table>';
    conteudo_janela += '</div>';


    conteudo_janela += "</div>";

    $("#dialog" + id + " .botoes").html("");

    $("body").append(conteudo_janela);

    ifDialog_estiliza_janela(id, 'Confirmação', 200, 400, false);
    ifDialog_adiciona_botao(id, "Sim", funcao + "ifDialog_fecha('" + id + "');");
    ifDialog_adiciona_botao(id, "Não", "fecha($this));");

    //para criar um atributo indicando que é uma janela de confirmacao
    $("#id").attr("_janela_confirmacao", true);

    //ifDialog_conta_z_index


    ifDialog_abre(id);

    $(id).css('z-index', ifDialog_conta_z_index + 1);
    //   $(id_mask).css('z-index', ifDialog_conta_z_index);
}

function ifDialog_estiliza_janela(janela, titulo, altura, largura, autoOpen, destroyAoFechar) {

    var conteudo_janela = String();
    conteudo_janela += "<div id=\"dialog" + janela + "\" class=\"ifDialog\">";
    conteudo_janela += "<div class=\"titulo\">";
    conteudo_janela += "<div class=\"ifDialog_miolo_titulo\">" + titulo + "</div>";

    //ifDialog_destroy
    if (destroyAoFechar == true) {
        conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"ifDialog_destroy('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
    }
    else {
        conteudo_janela += "<div class=\"ifDialog_fecha\" onClick=\"ifDialog_fecha('" + janela + "');\"><img src=\"/img/ifdialog_fechar_icone.png\" title=\"Fechar janela\"/></div>";
    }

    conteudo_janela += "</div>";
    conteudo_janela += "<div class=\"conteudo\" id=\"conteudo_" + janela + "\">";
    conteudo_janela += "</div>";

    conteudo_janela += "</div>";

    conteudo_janela += "<div id=\"mask" + janela + "\" class=\"mask\">";
    conteudo_janela += "</div>";

    $("body").append(conteudo_janela);

    var id = '#dialog' + janela;
    $(id).addClass("ifDialog");

    $(id).css({
        'width': largura
    });
    $(id).css({
        'height': altura
    });

    var winH = $(window).height();
    var winW = $(window).width();

    //alert(winH);

    //centraliza na tela a janela popup
    //$(id).css('top',  (winH/2)-($(id).height()/2));
    //  $(id).css('left', (winW/2)-($(id).width()/2));
    $(id).css('top', Math.round((winH) - $(id).height()) / 2);
    $(id).css('left', Math.round((winW) - $(id).width()) / 2);

    //do jquery ui... se começar a dar pau, 
    //comentar
    $(id).draggable({
        cursor: "move"
    });
    //$(id).resizable();


    if (autoOpen == true) {
        ifDialog_abre(janela);
    }

    $("#conteudo_" + janela).html($("#" + janela).html());
    $("#" + janela).remove();
}

/*  
 $(document).keydown(function (e) {
 if(e.which == 27){
 //ifDialog_fecha_ultima_aberta();
 //alert('teclou esc');
 return false;
 } 
 });
 */

//jQuery.event.add(window, "load", resizeFrame);
//jQuery.event.add(window, "resize", resizeFrame);


function resizeFrame() {
    var id = ".ifDialog";

    var winH = $(window).height();
    var winW = $(window).width();
    //centraliza na tela a janela popup
    /*$(id).css('top',  (winH/2)-($(id).height()/2));
     $(id).css('left', (winW/2)-($(id).width()/2));*/

    $(id).css('top', Math.round((winH) - $(id).height()) / 2);
    $(id).css('left', Math.round((winW) - $(id).width()) / 2);


    var id = ".mask";
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Define largura e altura do div#mask iguais ás dimensões da tela
    $(id).css({
        'width': maskWidth,
        'height': maskHeight
    });
}


$(document).ready(function () {

    //alert('document ready');

    $('.ifDialog').remove();

    /*
     $('.close').click(function (e) {
     e.preventDefault();
     });

     $('.ifDialog_botao_dialogo').click(function (e) {
     e.preventDefault();
     }); 
     */

    /*
     $('.mask').click(function () {
     ifDialog_fecha_ultima_aberta();
     }); 
     */
});


function _ifdialog_maximizar(div) {

    if ($(div).attr('_maximize') == "true") {
        var _topA = $(div).attr('_topA');
        var _leftA = $(div).attr('_leftA');
        var _heightA = $(div).attr('_heightA');
        var _widthA = $(div).attr('_widthA');
        $(div).css('top', _topA);
        $(div).css('left', _leftA);
        $(div).css('height', _heightA);
        $(div).css('width', _widthA);
        $(div).attr('_maximize', "false");
    } else {
        var _topA = $(div).css('top');
        var _leftA = $(div).css('left');
        var _heightA = $(div).css('height');
        var _widthA = $(div).css('width');
        var winH = $(window).height();
        var winW = $(window).width();
        var _top = 0;
        var _left = 0;
        $(div).css('top', _top);
        $(div).css('left', _left);
        $(div).css('height', winH);
        $(div).css('width', winW);
        $(div).attr('_topA', _topA);
        $(div).attr('_leftA', _leftA);
        $(div).attr('_heightA', _heightA);
        $(div).attr('_widthA', _widthA);
        $(div).attr('_maximize', "true");
    }

}
/*
 var _keypress = function (e) {
 switch(e.which){
 case 97:
 alert('apertou a');
 break;
 }
 }

 var _NULL = null;
 */
