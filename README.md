# Cadastro de Carro

**RF - Requisitos Funcionais**
[x] Deve ser possível cadastrar um novo carro

**RN - Regra de negócio**
[x] Não deve ser possível cadastrar um carro com uma placa já existente
[x] O carro deve ser cadastrado, por padrão, com disponibilidade
[x] O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Listagem de Carros

**RF - Requisitos Funcionais**
[x] Deve ser possível listar todos os carros disponíveis
[x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
[x] Deve ser possível listar todos os carros disponíveis pelo nome da marca
[x] Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN - Regra de negócio**
[x] O usuário não precisa estar logado no sistema

# Cadastro de Especificação no carro

**RF - Requisitos Funcionais**
[x] Deve ser possível cadastrar uma especificação para um carro

**RN - Regra de negócio**
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
[x] Deve ser possível cadastrar mais de uma especificação já existente para o mesmo carro
[x] O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Cadastro de imagens do carro

**RF - Requisitos Funcionais**
[x] Deve ser possível cadastrar a imagem do carro
[] Deve ser possível listar todos os carros

**RNF - Requisitos Não Funcionais**
[x] Utilizar o multer para upload de arquivos

**RN - Regra de negócio**
[x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
[x] O usuário responsável pelo cadastrado deve ser um administrador do sistema

# Aluguel de carro

**RF - Requisitos Funcionais**
[x] Deve ser possível cadastrar um aluguel

**RN - Regra de negócio**
[x] O aluguel deve ter duração mínima de 24hrs
[x] Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário
[x] Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro
[x] O usuário deve estar logado na aplicação
[x] Ao realizar um aluguel, o status do carro deverá ser atualizado para indisponível

# Devolução do carro

**RF - Requisitos Funcionais**
[x] Deve ser possível realizar a devolução de um carro

**RN - Regra de negócio**
[x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa
[x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
[x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
[x] Ao realizar a devolução, deverá ser calculado o total do aluguel
[x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa proporcional aos dias de atraso
[x] Caso haja multa, deverá ser somado ao total do aluguel
[x] O usuário deve estar logado na aplicação

# Lista de Aluguéis

**RF - Requisitos Funcionais**
[x] Deve ser possível listar todos os aluguéis de um usuário

**RN - Regra de negócio**
