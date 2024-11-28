'use client';
import Sidebar from "@/app/components/aside";
import cliente from "@/app/Styles/clienteCrud.module.css";
import geral from "@/app/Styles/general.module.css";
import tabelas from "@/app/Styles/tabelas.module.css";
import { useState } from "react";

export default function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFadeOpen, setIsFadeOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsFadeOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsFadeOpen(false);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle form submission logic here
    // ...
    setIsModalOpen(false);
    setIsFadeOpen(false);
  };

  return (
    <>
      <body className={geral.container}>
        <Sidebar />
        <main className={geral.mainPadrao}>
          <div className={tabelas.containerTabela}>
            <div className={tabelas.conteinerBuscarClinte}>
              <h2>Buscar Cliente</h2>
              <div className={tabelas.pesquisa}>
                <input type="text" className={tabelas.pesquisar} placeholder="Pesquisar..." />
              </div>
            </div>

            <div className={tabelas.tabelaConteiner}>
              <h2 className={tabelas.h2Impressao}>Relação de Clientes</h2>
              <table className={tabelas.tableClient}>
                <thead className={tabelas.topoTabela}>
                  <tr className={tabelas.rowTabela}>
                    <th className={tabelas.cabecaTabela}>Nome</th>
                    <th className={tabelas.cabecaTabela}>Contato</th>
                    <th className={tabelas.cabecaTabela}>Endereço</th>
                    <th className={tabelas.cabecaTabela}>Nível</th>
                    <th className={tabelas.cabecaTabela}>Ações</th>
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
            <button className={tabelas.openModal} onClick={handleModalOpen}>
              <img src="/images/icons/adicionar.png" alt="" />
              <span> Adicionar Cliente</span>
            </button>
          </div>

          <button className={tabelas.buttonImprimir}>imprimir</button>

          {/* Modal */}
          <div className={isModalOpen ? cliente.fade : cliente.hide}></div>
          <div className={tabelas.modal}>

          <div className={isModalOpen ? cliente.show : cliente.hide}>
            <div className={tabelas.modalHeader}>
              <img id="logo-cliente" src="/images/icons/Cliente-Solar.png" alt="" />
              <button className={tabelas.closeModal} onClick={handleModalClose}>
                <img src="/images/icons/excluir.png" alt="" />
              </button>
            </div>
            <div className={cliente.modalBodyCliente}>
              <form id="form" className={cliente.modalFormCliente} onSubmit={handleSubmit}>
                <input type="text" id="nome" data-index="new" className={tabelas.modalField} placeholder="Nome do Cliente" required />
                <input type="text" id="contato" className={tabelas.modalField} placeholder="(XX) XXXXX-XXXX" required />
                <input type="text" id="endereco" className={tabelas.modalField} placeholder="Endereço do Cliente" required />
                <select id="nivel" className={tabelas.modalField} required>
                  <option value="" disabled selected>Nível do cliente</option>
                  <option value="ouro">Ouro</option>
                  <option value="prata">Prata</option>
                  <option value="bronze">Bronze</option>
                </select>
              </form>
              <footer className={tabelas.modalFooterCliente}>
                <button id="salvar" className={tabelas.buttonGreen}>Salvar</button>
                <button id="cancelar" className={tabelas.buttonRed} onClick={handleModalClose}>Cancelar</button>
              </footer>
            </div>
          </div>
          </div>
        </main>
      </body>
    </>
  );
}
