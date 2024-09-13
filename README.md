# App

Apps to save data.

## RFs (requisitos funcionais)

- [x] Deve ser possível se cadastrar no app;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de pagamentos realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de pagamentos;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar pagamento em um grupo;
- [ ] Deve ser possível validar o pagamento de um usuário;
- [x] Deve ser possível cadastrar um grupo.

## RNs (regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode registrar 2 presenças no mesmo dia;
- [x] O usuário não pode registrar presença se não estiver perto (100m) do grupo;
- [ ] O pagamento só pode ser validado até 20 minutos após criado;
- [ ] O pagamento só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores.

## RNF (requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
