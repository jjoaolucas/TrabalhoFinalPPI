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

function processarCadastroUsuario(requisicao, resposta){
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.sobrenome && dados.nomeUsuario && dados.cidade && dados.uf && dados.cep && dados.contribuicao))
    {
        conteudoResposta=`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>label{ font-weight: 600};</style>
        </head>
        <body>
            <div class="container col-6" style="padding: 30px;">
                <form action='/cadastrarUsuario' method="POST"  class="row col-12 needs-validation mx-auto my-auto" novalidate>
                <fieldset class="border border-secondary rounded-2 p-2 mt-2">
                    <legend class="mb-3 text-success text-center" style="font-weight: 700;">Cadastro de Voluntarios ONG <span style="color: orange;">AuMigos</span></legend>
                    <div class="col-md-6 ">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                      
                    </div>
        `;
        if (!dados.nome){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe o nome!</p>
                             </div>`;
        }
        conteudoResposta+=`
            <div class="col-md-6 mt-2">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
            
        </div>
        `;
        if (!dados.sobrenome){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe o sobrenome!</p>
                             </div>`;
        }
        conteudoResposta+=`
            <div class="col-md-6 mt-2">
                <label for="nomeUsuario" class="form-label">Nome de usuário</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="nomeUsuario">@</span>
                    <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" value="${dados.nomeUsuario}" required>
                </div>
                </div>
        `;
        if (!dados.nomeUsuario){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe o nome do usuario!</p>
                             </div>`;
        }
        conteudoResposta +=`
                <div class="col-md-6 mt-2">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" value="${dados.cidade}" required>
            </div>
        `;
        if(!dados.cidade){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe a cidade!</p>
                             </div>`;
        }
        conteudoResposta +=`
                <div class="col-md-5 mt-2">
                <label for="uf" class="form-label">Estado</label>
                <select class="form-select" id="uf" name="uf" value="${dados.uf}" required>
                <option selected disabled value="">Escolha um estado...</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
                </select>
            
            </div>
        `;
        if (!dados.uf){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe o Estado!</p>
                            </div>`;
        }
        conteudoResposta+=`
            <div class="col-md-3 mt-2">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" value="${dados.cep}" required>
        
        </div>
        `;
        if (!dados.cep){
            conteudoResposta+=`<div>
                                <p class="text-danger">Por favor, informe o CEP!</p>
                            </div>`;
        }
        conteudoResposta+=`
            <div class="col-md-5 mt-2">
            <label for="contribuicao" class="form-label">Contribuição: </label>
            <select class="form-select" id="contribuicao" name="contribuicao" value="${dados.contribuicao}" required>
            <option selected disabled value="">Escolha uma contribuição...</option>
            <option value="Alimentação e Hidratação">Alimentação e Hidratação</option>
            <option value="Passeios e Exercícios">Passeios e Exercícios</option>
            <option value="Limpeza e Higiene">Limpeza e Higiene</option>
            <option value="Cuidados Médicos Básicos">Cuidados Médicos Básicos</option>
            <option value="Treinamento Básico">Treinamento Básico</option>
            <option value="Apoio Emocional">Apoio Emocional</option>
            </select>
        
        </div>
        `;
        if(!dados.contribuicao){
            conteudoResposta+=`<div>
                                    <p class="text-danger">Por favor, informe a Contribuição!</p>
                               </div>`;
        }
        conteudoResposta +=`
                                <div class="col-12 mt-4">
                                    <button class="btn btn-success" type="submit">Cadastrar</button>
                                </div>
                            </fieldset>
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
        cidade: dados.cidade,
        uf: dados.uf,
        cep: dados.cep,
        contribuicao: dados.contribuicao
    } 
    listaUsuarios.push(usuario);

    conteudoResposta =`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
            <h1 class="text-success text-center" style="font-weight: 700; text-decoration: underline">Lista de voluntários cadastrados</h1>
            <table class="table table-striped table-hover mt-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome de Usuário</th>
                        <th>Cidade/UF</th>
                        <th>CEP</th>
                        <th>Contribuição</th>
                    </tr>
                </thead>
                <tbody>
                </tbody> `;

                for (const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.nomeUsuario}</td>
                            <td>${usuario.cidade}/${usuario.uf}</td>
                            <td>${usuario.cep}</td>
                            <td>${usuario.contribuicao}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        <a class="btn btn-danger" href="/" role"button"> Voltar </a>
                        <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Cadastrar mais voluntarios </a>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                resposta.end(conteudoResposta);
                }
}

//pseudo middleware
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
        maxAge: 1000 * 60 * 15 //15 minutos
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
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
            <style>
                *{font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;}
                a {font-size: 20px;
                    text-decoration: none;
                    color: blue;
                    font-weight: 700;}
            </style>
        </head>
        <body>
            <h1>ACESSE AQUI A TELA DE CADASTRO DE VOLUNTARIOS DA ONG AUMIGOS</h1>
            <ul>
                <li><a href="/cadastroUsuario.html">Formulario de cadastro de voluntarios</a></li>
            </ul>
        </body>
        <footer>
            <p style="font-size: 16px;">Seu último acesso foi em <strong>${dataUltimoAcesso}</strong></p>
        </footer>
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

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});