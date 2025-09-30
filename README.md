# Instruções para instalação e rodar o código
Este projeto contém a seguinte estrutura:
```
.
├── backend
├── data
└── frontend
```
Com o diretório data utilizado para armazenamento dos dados em banco de dados (não sendo necessária nenhuma alteração no mesmo) e os diretórios de frontend e backend utilizados para configuração e execução de suas respectivas funções.

## Configuração e execução

Para esse processo será necessário abrir 2 terminais, um para a realização da configuração e execução do backend e outro para a realização da configuração e execução do frontend

### Configuração e Execução do backend
Após clonar o repositório, acesse o diretório backend e realize a configuração do ambiente virtual (venv):

```
cd lista-de-imoveis/backend/
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

Caso não tenha o módulo venv em sua máquia realize o seguinte comando para instalá-lo:
```
sudo apt install python3-venv
```

Após instalação dos pacotes necessários ao backend, realize a execução do backend na porta 8000:

```
uvicorn app.main:app --reload --port 8000
```

### Configuração e Execução do frontend
Em um segundo terminal, acesse o diretório frontend e realize a configuração dos pacotes npm:

```
cd lista-de-imoveis/frontend/
npm install
```

Após instalação dos módulos necessários, realize a execução do frontend na porta 5173:
```
npm run dev -- --port 5173
```

Agora, a aplicação pode ser acessada diretamente pelo navegador no endereço: http://localhost:5173 