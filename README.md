# Streamming Interface - AGile Content

Aplicação desenvolvida utilizando Express ( NodeJS ) para o processo de seleção da Agile Content

# Instalação

OBS: Para rodar esse projeto é necessário ter instalado na máquina o [NodeJS](https://nodejs.org/en/)

- 1 - Navegar via linha de comando para a pasta desse projeto
- 2 - Rodar o comando "npm install" para fazer a instalação dos aquivos requeridos listados no package.json
- 3 - Após feita a instalação dos arquivos requeridos acionar o comando "npm start" que irá inicializar a aplicação3
- 4 - Com a aplicação já em funcionamento, acessar o link através do Browser [http:////localhost:8080/](http://localhost:8080/)
- 4.1 - Acessando a aplicação em outros dispositivos
- 4.1.1 - Abrir outra janela de comando
- 4.1.2 - No prompt do Windows digitar ipconfig, procurar pelo Endereço IPv4
- 4.1.2 - Digitar endereço no navegador do dispositivo com a porta 8080 (Ex: 192.168.0.103:8080)

OBS2: Para acessar em outros dispositivos é necessário estarem na mesma rede do dispositivo que estará rondando o código npm

## Diretórios

- /bin -  Diretório com arquivo de configuração do Express  
- /public - Diretório publicos do App (CSS, JS, Fontes...) 
- /routes - Diretório com as rotas do Express 
- /views - Diretório de arquivos de marcação da estrutura 


## Arquivo Principais

### Express

- /app.js - Configurações principais da aplicação
- /package.json - pacotes do node que serão requisitados e configurações básicas do App
- /routes/index.js - Renderiza a página e faz as requisições para as API's externas


### Estruturação

- /routes/index.hbs - Arquivo da página da aplicação
- /public/stylesheets/style.scss - Arquivos SASS com o estilo da página
- /public/stylesheets/animations.scss - Arquivo de estilo com algumas animações do site
- /public/javascripts/main.js - Códigos javascripts usados para fazer a inserção do conteúdo e as interações da página