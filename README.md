# Cadastro de Carro

**RF - Requisitos Funcionais**

- Deve ser possível cadastrar um novo carro

**RN - Regra de negócio**

- Não deve ser possível cadastrar um carro com uma placa já existente
- O carro deve ser cadastrado, por padrão, com disponibilidade
- O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Listagem de Carros

**RF - Requisitos Funcionais**

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN - Regra de negócio**

- O usuário não precisa estar logado no sistema

# Cadastro de Especificação no carro

**RF - Requisitos Funcionais**

- Deve ser possível cadastrar uma especificação para um carro

**RN - Regra de negócio**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Deve ser possível cadastrar mais de uma especificação já existente para o mesmo carro
- O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Cadastro de imagens do carro

**RF - Requisitos Funcionais**

- Deve ser possível cadastrar a imagem do carro

**RNF - Requisitos Não Funcionais**

- Utilizar o multer para upload de arquivos

**RN - Regra de negócio**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Aluguel de carro

**RF - Requisitos Funcionais**

- Deve ser possível cadastrar um aluguel

**RN - Regra de negócio**

- O aluguel deve ter duração mínima de 24hrs
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deverá ser atualizado para indisponível

# Devolução do carro

**RF - Requisitos Funcionais**

- Deve ser possível realizar a devolução de um carro

**RN - Regra de negócio**

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
- Ao realizar a devolução, deverá ser calculado o total do aluguel
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa proporcional aos dias de atraso
- Caso haja multa, deverá ser somado ao total do aluguel
- O usuário deve estar logado na aplicação

# Lista de Aluguéis

**RF - Requisitos Funcionais**

- Deve ser possível listar todos os aluguéis de um usuário

**RN - Regra de negócio**

- O usuário deve estar logado na aplicação

# Recuperar a Senha

**RF - Requisitos Funcionais**

- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN - Requisitos Não Funcionais**

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

