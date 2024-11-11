
$(document).ready(function () {

    $('#Cpf').mask('000.000.000-00');

    $("#modalBeneficiario").on("click", function () {
        ModalBeneficiarios();
    });

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
                "Cpf": $(this).find("#Cpf").val(),
                "Beneficiarios": ObterBeneficiarios()
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
            }
        });
    })
    
})


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');

}

function ModalBeneficiarios() {

    var texto = '<div id="benefModal" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">Beneficiários</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                        <form id="formBeneficiario">  ' +
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

        '                                   <button type="button" id="btnBeneficiario" onclick="SalvarBeneficiario()" class="btn btn-sm btn-success btn-benef ">Salvar</button>             ' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  ' +
        '                           <div class="col-md-2" >                                                                ' +
        '                               <div class="form-group">                                                            ' +
        '                                   <button type="button" id="btnCancelar" onclick="Cancelar()" class="btn btn-sm btn-success btn-benef btn-invisible">Cancelar</button>             ' +
        '                               </div>                                                                              ' +
        '                           </div>                                                                                  '+
        '                       </div >   <!-- row -->                                                                                                           ' +
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
        $('#gridBeneficiarios').jtable({
            fields: {
                Id: {
                    title: 'Id',
                    width: '10%',
                    key: true,
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

    if ($('#IdBenef').val() != "") {
        ExcluirBeneficiario($('#CpfBenef').val(), $('#IdBenef').val());
    }
    

    $('#gridBeneficiarios').jtable('addRecord', {
        record: {
            Id: Math.floor(Math.random() * 1000),
            Nome: $('#NomeBenef').val(),
            Cpf: $('#CpfBenef').val(),
        },
        clientOnly: true
    })

    if ($('#IdBenef').val() == "") {
       ModalDialog("Sucesso!", "Beneficiário cadastrado com sucesso.")
    } else {
       ModalDialog("Sucesso!", "Beneficiário atualizado com sucesso.")
    }

   
    $('#NomeBenef').val("")
    $('#CpfBenef').val("")
    $('#IdBenef').val("")
    $('#btnCancelar').addClass("btn-invisible");
}

function ExcluirBeneficiario(cpf,id) {


    $('#gridBeneficiarios').jtable('deleteRecord', {
        key: id,  
        clientOnly: true  
    });

}

function ObterBeneficiarios() {

    let Beneficiarios = [];
    let Nome;
    let Cpf;
    $('#gridBeneficiarios').find("td").each(function () {
      
        if ($(this)[0].cellIndex == 1) {
            Nome = $(this).html();
        } else if ($(this)[0].cellIndex == 2) {
            Cpf = $(this).html();
        } else if ($(this)[0].cellIndex == 3) {
            Beneficiarios.push({
                Nome: Nome,
                Cpf: Cpf
            })
        }
    });
    return Beneficiarios;

}

function ModalConfirma(Cpf,Id) {
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
        '                    <button type="button" onclick="ExcluirBeneficiario(\'' + Cpf + '\',' + Id + ')" class="btn btn-default" data-dismiss="modal">Confirmar</button>             ' +
        '                     <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>                                                                                              ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}


