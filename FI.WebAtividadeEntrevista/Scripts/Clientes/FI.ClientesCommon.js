function RemoverMascara(cpf) {
    cpf = cpf.replace(/\./g, "");
    return cpf.replace(/\-/g, "");
}
function ValidarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); 

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * peso--;
    }
    let digito1 = 11 - (soma % 11);
    if (digito1 === 10 || digito1 === 11) digito1 = 0;

    soma = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * peso--;
    }
    let digito2 = 11 - (soma % 11);
    if (digito2 === 10 || digito2 === 11) digito2 = 0;

    return cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2;
}

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


function VerificaExistenciaCpf(cpf,id) {
    let result = false;
    let idGrid;
    $('#gridBeneficiarios').find("td").each(function () {
        if ($(this)[0].cellIndex == 0) {
            idGrid = $(this).html();
        }
        else if ($(this)[0].cellIndex == 2) {
            if (idGrid != id && $(this).html() == cpf) result = true
        }
    });
    return result;
}

function Cancelar() {
    $('#IdBenef').val("");
    $('#NomeBenef').val("");
    $('#CpfBenef').val("");
    $('#btnCancelar').addClass("btn-invisible");
}

function AlterarBeneficiario(Id, Nome, Cpf) {
    $('#IdBenef').val(Id);
    $('#NomeBenef').val(Nome);
    $('#CpfBenef').val(Cpf);
    $('#btnCancelar').removeClass("btn-invisible");
}

