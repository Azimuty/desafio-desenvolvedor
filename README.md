### Requisitos atendidos do desafio:

O desafio foi desenvolvido em duas versões: nodeJs e PHP.

Ambas as soluções atenderam os requisitos mínimos, incluindo cadastro e autenticação de usuário, e histórico de cotações.

Foi implementada também todas as opções de conversões de moeda disponível na aplicação de terceiros sugerida.
Essa implementação foi feita de forma dinâmica, com dados sendo atualizados a cada inicialização da api.
No caso da versão PHP, os dados estão sendo atualizados a cada solicitação do usuário.

Na aplicação em nodeJS foi implementada possibilitando a alteração das taxas de conversão de dos métodos de pagamento via banco de dados.
Existe a possibilidade de implementear um endpoint e tela específicos para essa função também.

O banco de dados utilizado foi o PostgreSql.

Ambas as soluções estão compiladas e disponíveis para teste no dokcer hub, bastando apenas fazer um "docker-compose up" no arquivo yml.
Cada solução possui o seu docker-compose e imagem associada disponível em repositório público.

Durante o processo foi desenvolvido também uma unica imagem docker utilizada como ambiente de desenvolvimento PHP e também como base para a criação da imagem disponibilizada.

Uma vez que esteja rodando, a aplicação pode ser acessada no navegador através do endereço "http://localhost:8080".

#### Particularidades da implementação nodeJS

- Documentação de endpoints disponível no endereço "http://localhost:8080/api/doc".
- Código com tipografia ds variáveis facilitando o entendimento do código.
- Utilização do recurso de dados não relacionais do PostgreSql.
- Configuração através de variáveis, através do docker ou arquivo ".env" local.

#### Estrutura do Backend

- Arquivos "api.php" (PHP) ou "server.ts" (NodeJS) - arquivos de ponto de entrada na aplicação.
- Pasta "routes" - Rotas para os endpoints.
- Pasta "controller" - Ponto de entrada para implemetnação dos endpoints.
- Pasta "model" - Modelagem da tabela no banco de dados e retorno de instanciamento do repositório associado.
- Pasta "service" - Recursos avançados necessários para a execução das tarefas.
- Pasta "util" - Bibliotecas desenvolvidas ou encapsulamento de bibliotecas externas.

#### Desenvolvido po:

Renato de Almeida Faria.
renato@azimuty.com.br