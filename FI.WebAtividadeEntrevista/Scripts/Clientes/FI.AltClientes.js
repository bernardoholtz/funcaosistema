
$(document).ready(function () {
    $('#Cpf').mask('000.000.000-00');

    $("#modalBeneficiario").on("click", function () {
        ModalBeneficiarios();
    });

    if (obj) {
        $('#formCadastro #Id').val(obj.Id);
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #Cpf').val(obj.Cpf);
        $('#Cpf').mask('000.000.000-00');

    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (!ValidarCPF($("#Cpf").val())) {
            ModalDialog("Ocorreu um erro", "Cpf do Cliente inválido!");
            return;
        }

        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Cpf": $(this).find("#Cpf").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                 window.location.href = urlRetorno;
            }
        });
    })

      
    
})


function ModalBeneficiarios() {

    var texto = '<div id="benefModal" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">Beneficiários</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                        <form id="formBeneficiario">  '+
        '                                   <input type="hidden" class="form-control" id="IdBenef" name="IdBenef">' +
        '                        <div class="row">                                                                          ' +
        '                           <div class="col-md-4" >                                                                ' +
        '                               <div class="form-group">                                                            ' +
        '                                   <label for="CpfBenef">Cpf:</label>                                                   ' +
        '                                   <input required="required" type="text" class="form-control" id="CpfBenef" name="CpfBenef" placeholder="Ex.: 010.011.111-00" maxlength="14">' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  ' +
        '                           <div class="col-md-4" >                                                                ' +
        '                               <div class="form-group">                                                            ' +
        '                                   <label for="NomeBenef">Nome:</label>                                                   ' +
        '                                   <input required="required" type="text" class="form-control" id="NomeBenef" name="NomeBenef" placeholder="Ex.: Maria" maxlength="50">' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  ' +
        '                           <div class="col-md-2" >                                                                ' +
        '                               <div class="form-group">                                                            ' +
        '                                   <button type="button" id="btnBeneficiario" onclick="SalvarBeneficiario()" class="btn btn-sm btn-success btn-benef">Salvar</button>             ' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  ' +
        '                           <div class="col-md-2" >                                                                ' +
        '                               <div class="form-group">                                                            ' +
        '                                   <button type="button" id="btnCancelar" onclick="Cancelar()" class="btn btn-sm btn-success btn-benef btn-invisible">Cancelar</button>             ' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  ' +

        '                       </div >   <!-- row -->                                                                     ' + 
        '                       </form>                                                                                                           ' +
        '                <table id="gridBeneficiarios" class="table"></table>' +
        '                </div>   <!-- body -->                                                                                           ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#benefModal').modal('show');
    $('#CpfBenef').mask('000.000.000-00');

    GerarGrid();

    $('.jtable-main-container').css('overflow-y', 'auto');
    $('.jtable-main-container').css('height', '250px');
    
}

function GerarGrid() {

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            actions: {
                listAction: '/Cliente/ConsultarBeneficiarios/?IdCliente=' + $('#Id').val(),
            },
            fields: {
                Id: {
                    title: 'Id',
                    width: '10%'
                },
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Cpf: {
                    title: 'Cpf',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="AlterarBeneficiario(' + data.record.Id + ',\'' + data.record.Nome + '\',\'' + data.record.Cpf + '\')" class="btn btn-primary btn-sm">Alterar</button>';

                    }
                },

                Excluir: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="ModalConfirma(\'' + data.record.Cpf + '\',' + data.record.Id + ')" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}

function SalvarBeneficiario() {

        if ($('#CpfBenef').val() == "" || $('#NomeBenef').val() == "") {
            ModalDialog("Ocorreu um erro", "Os campos Cpf e Nome precisam ser preenchidos.");
            return;
        }

        if (!ValidarCPF($("#CpfBenef").val())) {
            ModalDialog("Ocorreu um erro", "Cpf inválido.");
            return;
        }

        if (VerificaExistenciaCpf($("#CpfBenef").val(), $('#IdBenef').val())) {
            ModalDialog("Ocorreu um erro", "Cpf já encontra-se na lista de Beneficiários.");
            return;
        }

        let url;
        let id = 0;
        if ($('#IdBenef').val() == "") {
            url = '/Cliente/IncluirBeneficiario/'
        } else {
            url = '/Cliente/AlterarBeneficiario/'
            id = $('#IdBenef').val();
        }

        $.ajax({
            url: url,
            method: "POST",
            data: {
                "Nome": $("#NomeBenef").val(),
                "Cpf": $("#CpfBenef").val(),
                "IdCliente": $("#Id").val(),
                "Id" : id
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formBeneficiario")[0].reset();
                    $("#IdBenef").val('')
                    $('#gridBeneficiarios').jtable('load');
                    $('#btnCancelar').addClass("btn-invisible");
                }
        });
   
}


function ExcluirBeneficiario(Id) {
    
    $.ajax({
        url: '/Cliente/ExcluirBeneficiario/?id=' + Id,  
        success: function (data) {
            //ModalDialog("Sucesso!", data)
            $('#gridBeneficiarios').jtable('load');

        },
        error: function (r) {
            ModalDialog("Ocorreu um erro", r.responseJSON);
        }
    });
    
}

function ModalConfirma(Cpf, Id) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">Atenção!</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>Deseja mesmo excluir o Beneficiário de Cpf  ' + Cpf + ' ?</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" onclick="ExcluirBeneficiario(' + Id + ')" class="btn btn-default" data-dismiss="modal">Confirmar</button>             ' +
        '                     <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>                                                                                              ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
