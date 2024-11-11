using FI.AtividadeEntrevista.DAL.Beneficiarios;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public void Incluir(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        public void Excluir(long Id)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.Excluir(Id);
        }

        public List<DML.Beneficiario> Consultar(long IdCliente)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            return benef.Consultar(IdCliente);
        }



    }
}
