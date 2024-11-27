import "@/app/Styles/loginPage.css";
import Image from 'next/image';
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login Solar CocaCola",
}


export default function Login() {
  return (
    <>
    <body id="backgroundBody">
      <footer>
        <h1 id="sloganPrincipal">
        <span className="detalhesSlogan" id="detalhamentoHash">#</span> 
        OrgulhoDeSer<span className="detalhesSlogan">SOLAR</span>
        </h1>
      </footer>
      <main>
      <div className="logoDisplayer">
        <Image src="/images/icons/LogoCoca.jpg" width={300} height={225} alt="logococa.jpg"/>
      </div>
        <form action="/pages/clientesCRUD" method="post" className="formsBlock" id="loginForm" name="validationForms" >

          <input type="email" id="emailField" className="inputers" placeholder="Digite Seu Email" />

          <input type="password" id="passwordField" className="inputers" placeholder="Digite Sua Senha" />
          
          <input type="submit" id="postInput" value="Acessar" />
        </form>
      </main>
    </body>
    </>
  );
}
