# EDA - Event Driven Architecture

# Criação de Microservice

Olá Dev!

Agora que você entendeu os principais conceitos sobre microsserviços e da arquitetura baseada em eventos. Desenvolva um microsserviço em sua linguagem de preferência que seja capaz de receber via Kafka os eventos gerados pelo microsserviço "Wallet Core" e persistir no banco de dados os balances atualizados para cada conta.

Crie um endpoint: "/balances/{account_id}" que exibe o balance atualizado.

Requisitos para entrega:
- Tudo deve rodar via Docker / Docker-compose
- Com um único docker-compose up -d todos os microsserviços, incluindo o da wallet core precisam estar disponíveis para que possamos fazer a correção.
- Não esqueça de rodar migrations e popular dados fictícios em ambos bancos de dados (wallet core e o microsserviço de balances) de forma automática quando os serviços subirem.
- Gere o arquivo ".http" para realizarmos as chamadas em seu microsserviço da mesma forma que fizemos no microsserviço "wallet core"
- Disponibilize o microsserviço na porta: 3003.

Observações:
- Nosso objetivo com esse desafio não é corrigir seu código ou verificar a qualidade da sua aplicação, mas sim garantir que você teve o entendendimento da importância da produção e consumo de eventos.

- Nosso suporte nesse desafio vai até o escopo conceitual sobre o entendimento dos eventos e não entrará no mérito da análise de seu código, e é exatamente por isso que estamos permitindo que você utilize a linguagem de programação que você ache mais conveniente.