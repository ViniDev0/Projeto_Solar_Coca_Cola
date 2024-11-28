import Sidebar from "@/app/components/aside";
import cliente from "@/app/Styles/clienteCrud.module.css";
import geral from "@/app/Styles/general.module.css";
import tabelas from "@/app/Styles/tabelas.module.css";
export default function clientes() {}
  return (
    <>
    <body className={geral.container}>
      <Sidebar />
      <main className={geral.mainPadrao}>
      <div className={tabelas.conteinerTabela}>
           
           <div className={tabelas.conteinerBuscarClinte}>
               <h2>Buscar Produtos</h2>
                <div className={tabelas.pesquisa}>
                   <input type="text" className={tabelas.pesquisar} placeholder="Pesquisar..."/>
               </div>
           </div>
           
       <div className={tabelas.tabelaConteiner}>
           <h2 className={tabelas.h2Impressao}>Relação de Clientes</h2>

           <table className={tabelas.tableClient}>
               <thead className={tabelas.topoTabela}>
                   <tr className={tabelas.rowTabela}>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                   </tr>

               </tbody>
           </table>        
       </div>
       </div>
   <div className={tabelas.botaoCabecalho}>     
       <button className={tabelas.openModal}> <img src="/images/icons/adicionar.png" alt=""/><span> Adicionar Cliente</span></button> 
       

   </div>

       <button className={tabelas.buttonImprimir}>imprimir</button>

       <div id="fade" className={tabelas.hide}></div>
       <div id="modal" className={tabelas.hide}>
           <div className={tabelas.modalHeader}>
               <img  id="logo-cliente" src="/images/icons/Cliente-Solar.png" alt=""/>
               <button className={tabelas.closeModal}> <img src="/images/icons/excluir.png" alt=""/></button>
           </div>
              <div className={tabelas.modalBodyCliente}>
               <form id="form" className={tabelas.modalFormCliente}>
                    <input type="text" id="nome" data-index="new" class="modal-field" placeholder="Nome do Produto" required>
                        <input type="text" id="descricao" class="modal-field" placeholder="Descrição do Produto" required>
                        <select id="categoria" class="modal-field" required>
                            <option value="" disabled selected>Categoria do Produto</option>
                            <option value="Refrigerante">Refrigerante</option>
                            <option value="Suco">Suco</option>
                            <option value="Chá">Chá</option>
                        </select>
               </form>
               <footer className={tabelas.modalFooter}>
                   <button id="salvar" className={tabelas.buttonGreen}>Salvar</button>
                   <button id="cancelar" className={tabelas.buttonRed}>Cancelar</button>
               </footer>
           </div>
       </div>
      </main>
    </body>
      </>
  );
}