'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Styles from "@/app/Styles/Sidebar.module.css";


const Sidebar: React.FC = () => {

   const handleLogout = () => {
    window.location.href = '';
    // Implementar logout aqui
  };

  return (
    <>
    <aside className={Styles.sidebar}>
      <div className={Styles.elementosCima}>
        <header className={Styles.sidebarHeader}>
          <div className={Styles.logoElemento}>
            <div className={Styles.logoSolar}>
              <Image src="/images/icons/SOLAR-LOGO.png" alt="Logo Solar" width={175} height={70} />
            </div>
            <div className={Styles.line}>
              <Image src="/images/icons/Line 7.png" alt="Line" width={200} height={2} />
            </div>
          </div>
        </header>
        <nav className={Styles.botaoCima}>
          <Link href="/" className={Styles.linki}>
            <button className={Styles.naviCima}>
              <span>DASHBOARD</span>
            </button>
          </Link>
          <Link href="/CRUDClientes" className={Styles.linki}>
            <button className={Styles.naviCima}>
              <span>CLIENTES</span>
            </button>
          </Link>
          <Link href="/CRUDProduto" className={Styles.linki}>
            <button className={Styles.naviCima}>
              <span>PRODUTOS</span>
            </button>
          </Link>
          <Link href="/CRUDPromocoes" className={Styles.linki}>
            <button className={Styles.naviCima}>
              <span>PROMOÇÕES</span>
            </button>
          </Link>
          <Link href="/CRUDPrecos" className={Styles.linki}>
            <button className={Styles.naviCima}>
              <span>PREÇOS</span>
            </button>
          </Link>
        </nav>
      </div>
      <div className={Styles.cor}>
        <div className={Styles.navBaixa}>
          <nav className={Styles.botaoFundo}>
            <button className={Styles.botaoBaixo}>
              <span>MEU PERFIL</span>
            </button>
            <button className={Styles.botaoBaixo}>
              SAIR
            </button>
          </nav>
        </div>
      </div>
    </aside>
    </>
      
  );
};

export default Sidebar;
