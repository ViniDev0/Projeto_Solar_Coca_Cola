'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Styles from '@/app/Styles/Sidebar.module.css';
import { useState } from 'react';
const Sidebar: React.FC = () => {
   const handleLogout = () => {
    useState();
    // Implementar logout aqui
  };

  return (
    <body className={Styles.bodySets}>
      
    <aside className={Styles.sidebar}>
      <div className={Styles.elementosCima}>
        <header className={Styles.sidebarHeader}>
          <div className={Styles.logoElemento}>
            <div className={Styles.logoSolar}>
              <Image src="/images/icons/SOLAR-LOGO.png" alt="Logo Solar" width={150} height={50} />
            </div>
            <div className={Styles.line}>
              <Image src="/images/icons/Line 7.png" alt="Line" width={200} height={10} />
            </div>
          </div>
        </header>
        <nav className={Styles.botaoCima}>
          <Link href="/">
            <button>
              <span>DASHBOARD</span>
            </button>
          </Link>
          <Link href="/CRUDClientes">
            <button>
              <span>CLIENTES</span>
            </button>
          </Link>
          <Link href="/CRUDProduto">
            <button>
              <span>PRODUTOS</span>
            </button>
          </Link>
          <Link href="/CRUDPromocoes">
            <button>
              <span>PROMOÇÕES</span>
            </button>
          </Link>
          <Link href="/CRUDPrecos">
            <button>
              <span>PREÇOS</span>
            </button>
          </Link>
        </nav>
      </div>
      <div id="cor">
        <div className={Styles.navBaixa}>
          <nav className={Styles.botaoFundo}>
            <button>
              <span>MEU PERFIL</span>
            </button>
            <button id="logoutButton" onClick={handleLogout}>
              SAIR
            </button>
          </nav>
        </div>
      </div>
    </aside>
    </body>
  );
};

export default Sidebar;
