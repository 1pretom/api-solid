# App

Apps to save data.

## RFs (requisitos funcionais)

- [x] Deve ser possível se cadastrar no app;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o numero de pagamentos realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de pagamentos;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar pagamento em uma academia;
- [ ] Deve ser possível validar o pagamento de um usuário;
- [x] Deve ser possível cadastrar uma academia.

## RNs (regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 pagamentos no mesmo dia;
- [ ] O usuário não pode fazer pagamento se não estiver perto (100m) da academia;
- [ ] O pagamento só pode ser validado até 20 minutos após criado;
- [ ] O pagamento só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores.

## RNF (requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
