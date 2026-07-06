# Acervo — Controle de Tiro Esportivo (PWA)

Painel para acompanhar treinos, provas e manutenção de armas do ciclo de
credenciamento (Decreto 11.615/2023, Decreto 12.345/2024, IN DG/PF 311/2023).
O app lê a planilha `Comp_Acervo_V4.xlsm` diretamente do GitHub — sem backend.

## Estrutura

```
index.html          → app (abas Resumo / Armas / Limpeza)
manifest.json        → metadados do PWA (instalável no celular)
sw.js                → cache do "shell" para uso offline
data/Comp_Acervo_V4.xlsm  → sua planilha (fonte de dados)
icons/                → ícone do app e ícones das abas
```

## Como publicar

1. Crie um repositório público no GitHub (ex: `acervo-tiro`).
2. Suba todos os arquivos desta pasta, mantendo a estrutura acima.
3. Abra `index.html` e troque a constante `RAW_URL` no topo do `<script>` pela
   URL raw do seu arquivo, algo como:
   ```
   https://raw.githubusercontent.com/SEU_USUARIO/acervo-tiro/main/data/Comp_Acervo_V4.xlsm
   ```
4. Ative o GitHub Pages: **Settings → Pages → Branch: main → / (root)**.
5. Acesse `https://SEU_USUARIO.github.io/acervo-tiro/` — no celular, use
   "Adicionar à tela de início" para instalar como app.

## Atualizando os dados

Sempre que atualizar o `Comp_Acervo_V4.xlsm` no Excel, basta subir o arquivo
novamente para `data/` no GitHub (mesmo nome). O app busca a versão mais
recente a cada abertura (sem cache).

Se quiser testar antes de publicar, use o botão "Selecionar planilha" que
aparece caso a busca pela URL falhe — ele carrega o arquivo localmente, do seu
computador, sem precisar do GitHub.

## O que cada aba mostra

- **Resumo**: progresso de treinos/provas/nacionais por grupo (ACRP, ACRR,
  ALRP, ALRR, ALLP) com metas do Nível 3, competições por entidade,
  última atividade por grupo e indicadores de qualidade dos dados.
- **Armas**: ficha de cada arma do acervo (calibre, Sigma, nº GT Base, grupo).
- **Limpeza**: última limpeza e usos de cada arma, com alerta configurável
  (dias sem limpar / usos acumulados).

## Observação sobre os dados

O app lê os valores já calculados pelas fórmulas da planilha (colunas
`% Treinos`, `% Provas`, `Faltam Treinos` etc. na aba `Resumo`). Se a
estrutura de colunas dessas abas mudar significativamente, ajuste as
funções `renderResumo`, `renderArmas` e `renderLimpeza` em `index.html`.
