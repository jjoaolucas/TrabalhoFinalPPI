// Módulo 4 deverá acrscentar duas novas funcionalidades ao nosso projeto
// Exibir a data do último acesso do usuário (cookies) cookies = biscoitos
// Autenticar o usuário para controlar o acesso aos recursos da aplicação (sessão)

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host =  '0.0.0.0';

var listaUsuarios = [];
var listaBatePapo = [];

function processarCadastroUsuario(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.sobrenome && dados.nomeUsuario && dados.DataNasc && dados.email && dados.senha))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
            body {
                background-color: #adaeaf;
                background-image: url(background-batepapo.png);
                display: flex;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
        
            .container {
                background-color: #585d63fa;
                border-radius: 8px;
                border: 2px solid black;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
        
            label { 
                font-weight: 800; 
                color: rgb(0, 0, 0);
            }
        
            .btn-success {
                padding: 10px;
                font-size: 16px;
            }
            </style>
        </head> 
        <body>
            <div class="container col-md-4" style="padding: 30px;">
                <form action='/cadastrarUsuario' method="POST"  class="row col-12 needs-validation mx-auto my-auto" novalidate>
                
                    <legend class="mb-3 text-center" style="font-weight: 800;">Cadastro de Usuários<br><span style="color: rgba(39, 196, 39, 0.856);">Bate-papo WEB</span> </legend>
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                        ${!dados.nome ? `<p class="text-danger">Por favor, informe o nome!</p>` : ''}
                        </div>
                    </div>
        `;
        
        conteudoResposta+=`
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label for="sobrenome" class="form-label">Sobrenome</label>
                        <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
                        ${!dados.sobrenome ? `<p class="text-danger">Por favor, informe o sobrenome!</p>` : ''}
                        </div>
                    </div>
        `;
        
        conteudoResposta+=`
                <div class="col-md-6">
                        <div class="mb-3">
                        <label for="nomeUsuario" class="form-label">Nome de usuário</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="nomeUsuario">@</span>
                            <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" required>
                        </div>
                        ${!dados.nomeUsuario ? `<p class="text-danger">Por favor, informe o nome do usuário!</p>` : ''}
                    </div>
                </div>
        `;

        conteudoResposta+=`
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="DataNasc" style="margin-top: 8px;">Data de nascimento</label>
                    <input type="date" name="DataNasc" id="DataNasc" class="form-control" required>
                    ${!dados.DataNasc ? `<p class="text-danger">Por favor, informe a Data de Nascimento!</p>` : ''}
                </div>
            </div>
        `;
        
        conteudoResposta+=`
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="email" class="form-label">E-Mail</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@gmail.com" required>
                    ${!dados.email ? `<p class="text-danger">Por favor, informe o email!</p>` : ''}
                </div>
            </div>
        `;


        conteudoResposta+=`
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                        ${!dados.senha ? `<p class="text-danger">Por favor, informe uma senha!</p>` : ''}
                    </div>
                </div>
        `;
        
        conteudoResposta +=`
                                <div class="col-12 mt-4">
                                    <button class="btn btn-success" type="submit">Cadastrar</button>
                                </div>
                            
                        </form>
                    </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                </body>
            </html>
        `;
        resposta.end(conteudoResposta)
    }
    else {
    const usuario = {
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        nomeUsuario: dados.nomeUsuario,
        DataNasc: dados.DataNasc,
        email: dados.email,
        senha: dados.senha,
    } 
    listaUsuarios.push(usuario);

    conteudoResposta =`
            <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Voluntários</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
                body {
                    background-color: #adaeaf;
                    background-image: url(background-batepapo.png);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }

                label {
                    font-weight: 800;
                    color: rgb(0, 0, 0);
                }

                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }

                .btn-danger {
                    margin-top: 10px;
                    float: left;
                }

                .btn-success {
                    margin-top: 20px;
                    float: right;
                }

                th,
                td {
                    color: white;
                }

                th {
                    background-color: #28a745;
                }

                tbody tr:nth-child(odd) {
                    background-color: #e0e0e0;
                }

                tbody tr:nth-child(even) {
                    background-color: #f0f0f0;
                }

                @media (max-width: 767px) {
                    .btn-success,
                    .btn-danger {
                        width: 100%;
                        float: none;
                    }
                }

            </style>
        </head>

<body>
    <div class="container col-md-8" style="padding: 20px;">
        <h1 class="text-center" style="font-weight: 700;color: black;">Lista de <span style="color: rgba(39, 196, 39, 0.856);">usuários cadastrados</span></h1>
        <div style="border-radius: 5px;"> 
        <table class="table table-striped table-hover mt-2 mx-auto my-auto">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Nome de Usuário</th>
                    <th>Data de Nascimento</th>
                    <th>Email</th>
                </tr>
            </thead>
                <tbody> `;

                for (const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.nomeUsuario}</td>
                            <td>${usuario.DataNasc}</td>
                            <td>${usuario.email}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        </div>
                        <a class="btn btn-danger" href="/" role"button"> Voltar </a>
                        <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Cadastrar usuários </a>
                    </body>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                resposta.end(conteudoResposta);
                }
}

function processarMensagem(requisicao, resposta){
    const users = requisicao.body;
    let conteudoResposta = '';

    if(!(users.mensagem && users.name))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login - Bate-papo WEB</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-color: #adaeaf;
                    background-image: url(background-batepapo.png);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
        
                .container {
                    width: 70%; /* Ajuste a largura conforme necessário */
                    margin: auto; /* Para centralizar a div na tela */
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
        
                label { 
                    font-weight: 800; 
                    color: black;
                }
                
                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }
    
                .btn-danger {
                    margin-top: 10px;
                    float: right;
                }
    
                .btn-success {
                    margin-top: 20px;
                    float: left;
                }

            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="" style="font-weight: 700;color: black;">Enviar <span style="color: rgba(39, 196, 39, 0.856);">Mensagem:</span></h1>
                <form action='/postarMensagem' method="POST" class="row g-3 needs-validation mx-auto my-auto" novalidate>
                <div class="col-md-4">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome</label>
                    <select class="form-select" id="name" name="name" required>
                        <option selected disabled value="Escolha um usuario...">Escolha um usuario...</option>
            
        `;
        
        for (const usuario of listaUsuarios) {
            conteudoResposta += `<option value="${usuario.nome}">${usuario.nome}</option>`;
        }

        conteudoResposta += `
                    </select>
                    ${!users.name ? `<p class="text-danger">Por favor, informe um nome</p>` : ''}
                </div>
            </div>
        `;

        conteudoResposta +=`
                <div class="col-md-4">
                        <div class="mb-3">
                            <label for="mensagem" class="form-label">Mensagem:</label>
                            <input type="text" class="form-control" id="mensagem" name="mensagem" style="width: 100%;" required>
                            ${!users.mensagem ? `<p class="text-danger">Por favor, informe uma mensagem!</p>` : ''}
                        </div>
                </div>

                <div class="col-12 mt-3">
                            <button class="btn btn-success" type="submit">Enviar</button>
                            <a class="btn btn-danger" href="/" role="button">Voltar</a>
                </div>
                    
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
            </body>
            </html>
        `;

        resposta.end(conteudoResposta)
    }
    else {
        const usuarios = {
            nome: users.name,
            mensagem: users.mensagem,
            dataHora: new Date(), // Adiciona a data e hora atual
        };
        listaBatePapo.push(usuarios);
    
       

        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Voluntários</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
                body {
                    background-color: #adaeaf;
                    background-image: url(background-batepapo.png);
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
    
                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
    
                label {
                    font-weight: 800;
                    color: rgb(0, 0, 0);
                }
    
                .btn-success,
                .btn-danger {
                    padding: 10px;
                    font-size: 16px;
                    width: 20%;
                }
    
                .btn-danger {
                    margin-top: 10px;
                    float: left;
                }
    
                .btn-success {
                    margin-top: 20px;
                    float: right;
                }
    
                th,
                td {
                    color: white;
                }
    
                th {
                    background-color: #2868a7;
                }
    
                @media (max-width: 767px) {
                    .btn-success,
                    .btn-danger {
                        width: 100%;
                        float: none;
                    }
                }
    
            </style>
        </head>
    
        <body>
            <div class="container col-md-8" style="padding: 20px;">
                <h1 class="text-center" style="font-weight: 700;color: black;">Mensagens do <span style="color: #1000e9;">Usuário Postadas</span></h1>
                <div style="border-radius: 5px;"> 
                    <table class="table table-striped table-hover mt-2 mx-auto my-auto">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Mensagem</th>
                                <th>Postado Em:</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    for (const usuario of listaBatePapo) {
        const dataHoraFormatada = usuario.dataHora.toLocaleString(); // Formata a data e hora
        conteudoResposta += `
            <tr style="background-color: #585d63fa">
                <td>${usuario.nome}</td>
                <td>${usuario.mensagem}</td>
                <td>${dataHoraFormatada}</td> <!-- Adiciona a coluna de data e hora -->
            </tr>
        `;
    }
    
    conteudoResposta += `
                        </tbody>
                    </table>
                </div>
                <a class="btn btn-success" style="background-color: #2868a7; border: blue;" href="/postarMensagem.html" role="button">Postar Mensagens</a>
                <a class="btn btn-danger" href="/login.html" role="button">Logout</a>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
    
        </html>
    `;
    
    resposta.end(conteudoResposta);
    }
}

function autenticar(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}


const app = express();
// ativando a funcionalidade de manipular cookies
app.use(cookieParser());

//adicionar uma nova capacidade para essa aplicação: Memorizar com quem o servidor está falando
//durante o uso do sistem, a apliacação saberá, dentro de uma sessão valida com quem ela se comunica
app.use(session({
    secret: "M1nH4Ch4v3S3cR3t4",
    resave: true, //atualiza a sessão mesmo que não há alterações a cada requisição
    saveUninitialized: true,
    cookie: {
        //tempo de vida da sessão
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
}));

//ativar a extensão que manipula requisições
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/',autenticar, (requisicao, resposta) =>{
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });

    resposta.end (`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MENU - Bate-papo WEB</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-color: #adaeaf;
                    background-image: url(background-batepapo.png);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    background-color: #585d63fa;
                    border-radius: 8px;
                    border: 2px solid black;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    max-width: 700px; /* Defina um valor máximo para o tamanho do container */
                    width: 100%; /* Garante que o container se ajuste à largura disponível */
                }
                label { 
                    font-weight: 800; 
                }
                .btn-success {
                    padding: 10px;
                    font-size: 16px;
                }
                .custom-button {
                    font-size: 1.5em; /* Utilizando uma unidade relativa (em) para o tamanho do texto */
                    padding: 3% 32%; /* Utilizando porcentagens para o padding */
                    text-decoration: none;
                    border: 2px solid #28a745;
                    border-radius: 8px;
                    color: #28a745;
                    background-color: #ffffff;
                    display: inline-block; /* Garante que o botão não ocupe toda a largura disponível */
                    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
                }
                .custom-button:hover {
                    background-color: #28a745;
                    color: #ffffff;
                    border-color: #ffffff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row g-3 needs-validation mx-auto my-auto">
                    <legend class="mb-3 text-center" style="font-weight: 800;">MENU <br><span style="color: rgba(39, 196, 39, 0.856);">Bate-papo WEB</span> </legend>
                    <div class="col-md-12">
                        <p><a href="/cadastroUsuario.html" class="custom-button">Cadastro de Usuários</a></p>
                    </div>
                    <div class="col-md-12">
                        <p><a href="/postarMensagem.html" class="custom-button">=== Bate-papo ===</a></p>
                    </div>
                    <footer>
                        <p style="font-size: 16px;">Seu último acesso foi em <strong>${dataUltimoAcesso}</strong></p>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>

        `);
});
//endopoint login que irá processar o login da aplicação
app.post('/login' , (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

        if(usuario && senha && (usuario === 'joao') && (senha === '123')){
            requisicao.session.usuarioAutenticado = true;
            resposta.redirect('/');
        }
        else{
            resposta.end(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Falha na autenticação</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; margin: 100px;">
            
                <h3 style="color: #e74c3c;">Usuário ou senha inválidos!</h3>
            
                <a href="/login.html" class="btn btn-primary" style="text-decoration: none;">Voltar ao login</a>
            
            </body>
            </html>
            `);
        }
}); 

app.post('/cadastrarUsuario',autenticar, processarCadastroUsuario);

app.post('/postarMensagem', processarMensagem);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});