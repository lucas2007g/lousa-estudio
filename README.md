# Lousa — estúdio de ideias

Aplicação estática em português para preparar aulas e apresentar um quadro visual. Sem cadastro, backend, telemetria ou dependências externas de execução. Os projetos ficam no IndexedDB do navegador, incluindo as mídias em data URLs.

## Executar

Requer Node.js 18 ou superior. Na pasta do projeto, execute `node serve.mjs` e abra http://127.0.0.1:4173. Também é possível servir a pasta `dist` em qualquer hospedagem HTTPS. Abra por HTTP/HTTPS: módulos JavaScript e IndexedDB não são garantidos em URLs `file://`.

No ambiente restrito usado para construir o projeto, o Node precisa das opções `--preserve-symlinks-main --preserve-symlinks` antes de `serve.mjs` por causa de uma limitação de acesso aos diretórios superiores.

## Usar

- Abra a aula de exemplo **Fotossíntese: da luz à vida**. Ela contém três quadros editáveis, conexões, uma imagem vetorial embutida, equação, código, notas, um desenho e um áudio de dois segundos para experimentar os controles.
- A barra vertical cria tópicos, textos, notas, formas, fórmulas e código, ou ativa seleção, navegação, conexão, caneta, marca-texto e borracha.
- Selecione e arraste para mover. Arraste o canto inferior direito para redimensionar. Imagens mantêm a proporção. Shift também mantém a proporção dos outros elementos.
- Shift + clique ou arraste uma área vazia para selecionar vários. As ações de grupo, distribuição e alinhamento ficam no painel de propriedades. As setas movem a seleção; Shift + seta move dez unidades.
- Use **C** e clique na origem e no destino para conectar. Selecione a linha para editar rótulo, cor ou seta. As conexões acompanham o movimento e o redimensionamento.
- Duplo clique ou Enter abre o editor de conteúdo. A edição rica suporta fonte, tamanho, cor, negrito, itálico, sublinhado, listas, alinhamento e destaque. Não há atalhos de quadro ativos nos campos de edição.
- Imagens PNG/JPG/GIF/WebP e áudios compatíveis podem ser carregados, soltos no quadro ou colados como arquivos. As mídias pertencem ao projeto; não são links temporários para os arquivos originais.
- No painel esquerdo, organize quadros, camadas e enquadramentos. Os enquadramentos salvos usam proporção 16:9, centrada na área visível; a apresentação segue a ordem dos quadros e depois a dos enquadramentos.
- **Apresentar** solicita tela cheia e oculta o editor. Setas avançam/voltam, R revela tópicos, Shift+R volta uma etapa de revelação, L ativa o ponteiro, P ativa marcações que desaparecem em 3,5 segundos, H oculta os controles e 0 mostra o quadro inteiro. Esc sai.
- Cada elemento pode ter uma etapa de revelação: 0 fica sempre visível; valores maiores aparecem progressivamente. Enquadramentos posteriores também avançam a revelação.
- O indicador de salvamento só mostra “Salvo” depois que a transação do IndexedDB termina. Falhas mantêm o projeto aberto e mostram uma orientação para exportar.
- **Exportar projeto** gera um arquivo JSON editável com todos os quadros e mídias. **Importar** valida o arquivo e cria uma nova cópia, preservando os projetos existentes. A aula também está no arquivo `aula-exemplo.lousa.json`.
- PNG e PDF exportam o quadro inteiro ou a seleção de elementos. O PDF contém uma imagem de alta resolução em uma página.

## Limitações reais

- Armazenamento local por navegador e origem: não há sincronização entre dispositivos ou colaboração. Limpar os dados do site remove os projetos locais. Exporte backups; o volume disponível depende da quota do navegador. Evite editar o mesmo projeto em duas abas simultaneamente.
- Até 40 MB por mídia e 200 MB por importação. Imagens SVG enviadas pelo usuário são recusadas; o SVG da aula é uma ilustração interna conhecida. GIFs são estáticos em exportações. A borracha remove traços inteiros.
- As fórmulas usam MathML e um subconjunto explícito de LaTeX: frações, raízes, índices, potências, letras gregas e operadores, com prévia e erros claros. Não há ambientes avançados, matrizes, macros ou pacotes LaTeX. Código preserva o texto e a indentação, sem execução ou realce de sintaxe.
- PNG/PDF são estáticos e não incluem reprodução de áudio. Textos são recompostos no canvas; diferenças pequenas de métricas podem ocorrer em relação à tela. Limite de exportação: 8.192 px por lado e 24 megapixels. PDF é rasterizado, sem texto selecionável.
- A aplicação oferece o modo de apresentação; a gravação de vídeo é feita com o gravador de tela de sua preferência.
- A interface é focada em computador; em telas menores os painéis são reduzidos e a barra de ferramentas permite rolagem.
- Não é um aplicativo offline instalável: depois de carregado, a edição e os dados não dependem de serviços externos, mas um recarregamento ainda requer acesso à hospedagem.

## Verificação

`node verify.mjs` verifica os modelos e suas reimportações, a integridade das mídias embutidas, os pontos das conexões, os limites de exportação, a recusa de projetos incompatíveis, o parser matemático e os offsets binários do PDF. `node --check dist/app.js` verifica a sintaxe do editor.

O navegador de automação estava indisponível no ambiente de construção. Os fluxos visuais de arraste, edição rica, reprodução, arquivos, IndexedDB, tela cheia e downloads precisam de conferência num navegador real. Essa limitação não é apresentada como teste aprovado.
