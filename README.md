# teachingassistant

Projeto exemplo da disciplina de ESS da graduação em Ciência da Computação do CIn-UFPE.

## Preparação do ambiente
1. Certifique-se de ter Node.js instalado.
2. Instale as dependências dos testes (raiz do repositório):
   ```bash
   npm install
   npx playwright install --with-deps chromium
   ```
3. Instale as dependências do backend (serviços do professor):
   ```bash
   cd server/ta-server
   npm install
   ```
4. Instale as dependências do frontend (dashboard do professor):
   ```bash
   cd gui/ta-gui
   npm install
   ```

## Executar o backend (porta 3000)
Em um terminal dedicado:
```bash
cd server/ta-server
npm start
```
O servidor responde em `http://localhost:3000`.

## Executar o frontend do professor (porta 4250)
Em outro terminal dedicado:
```bash
cd gui/ta-gui
npm start -- --host 0.0.0.0 --port 4250
```
A interface do professor fica disponível em `http://localhost:4250/gui/ta-gui`.

## Executar a suíte de testes BDD (dashboard do professor)
Com as dependências instaladas e (opcionalmente) frontend/backend já em execução, rode na raiz do repositório:
```bash
npm run teste
```
- O comando executa exclusivamente os testes em `/tests` (GUI + serviços do professor).
- Hooks de teste iniciam frontend/backend automaticamente se eles não estiverem rodando.
- Os logs no terminal exibem totais de features, cenários e testes, além do tempo e status final (exit code 0/1).
