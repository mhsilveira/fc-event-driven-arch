# EDA - Event Driven Architecture

# Criação de Microservice

Agora que você entendeu os principais conceitos sobre microsserviços e da arquitetura baseada em eventos. Desenvolva um microsserviço em sua linguagem de preferência que seja capaz de receber via Kafka os eventos gerados pelo microsserviço "Wallet" e persistir no banco de dados os balances atualizados para cada conta.


Requisitos para entrega:
- Tudo deve rodar via Docker.
- Com um único docker-compose up -d todos os microsserviços, incluindo o da wallet core precisam estar disponíveis para que possamos fazer a correção.
- Crie um endpoint: "/balances/{account_id}" que exiba o balance atualizado.
- Não esqueça de rodar migrations e popular dados fictícios em ambos bancos de dados (wallet core e o microsserviço de balances) de forma automática quando os serviços subirem.
- Gere o arquivo ".http" para realizarmos as chamadas em seu microsserviço da mesma forma que fizemos no microsserviço "wallet core"
- Disponibilize o microsserviço na porta: 3003.

## PARA ACESSAR O MYSQL
Entre via shell no container MySQL desejado (usarei o wallet de exemplo) e utilize o comando abaixo, passando a senha cadastrada no Compose.
`mysql -u root -p wallet`

Se quiser algo mais simples pra ser executado fora do container, utilize o exemplo abaixo para montar sua query e não precisar entrar na shell diretamente:
`docker exec -it mysql mysql -u root -p -e "SHOW DATABASES;"`

## PARA ACESSAR O COMMAND CENTER
Vá para http://localhost:9021/clusters