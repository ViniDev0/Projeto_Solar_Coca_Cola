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
        <img src="../imgs/Solar-Coca-Cola-1-1024x640 2.jpg" alt="solarLogo.png"/>
      </div>
        <form action="post" className="formsBlock" id="loginForm" name="validationForms">

          <input type="text" id="emailField" className="inputers" placeholder="Digite Seu Email" />

          <input type="password" id="passwordField" className="inputers" placeholder="Digite Sua Senha" />
          
          <input type="submit" id="submitInput" value="Acessar" />
        </form>
      </main>
    </body>
    </>
  );
}