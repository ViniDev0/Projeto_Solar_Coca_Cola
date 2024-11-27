import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css'

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    console.log('Logout');
    // Implementar logout aqui
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.elementosCima}>
        <header className={styles.sidebarHeader}>
          <div className={styles.logoElemento}>
            <div className={styles.logoSolar}>
              <Image src="/imgs/SOLAR-LOGO.png" alt="Logo Solar" width={150} height={50} />
            </div>
            <div className={styles.line}>
              <Image src="/imgs/Line 7.png" alt="Line" width={200} height={10} />
            </div>
          </div>
        </header>
        <nav className={styles.botaoCima}>
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
        <div className={styles.navBaixa}>
          <nav className={styles.botaoFundo}>
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
  );
};

export default Sidebar;
