# Rastreamento de vendas — Cakto e UTMify

## Alterações
- `src/lib/tracking.ts`: lê os parâmetros UTM e `sck` da URL ou do armazenamento local da visita.
- `src/routes/checkout.tsx`: inclui esses parâmetros na solicitação de criação de pagamento.
- `src/lib/cakto.functions.ts`: valida os parâmetros e os encaminha como `metadata` no `POST /public_api/payments/` da Cakto.
- Pix, cartão, ofertas, preços, idempotência e webhooks existentes foram preservados.
- Back Redirect permanece desativado.

## Verificação após publicação
1. Abra a página de vendas com `?utm_source=FB&utm_campaign=teste_utmify&utm_medium=teste&utm_content=anuncio_teste&utm_term=instagram`.
2. Navegue até o checkout e confirme que os parâmetros persistem no Local Storage.
3. Sem pagar, use uma conta/ambiente de teste apropriado para conferir no pedido da Cakto o campo `metadata`, se disponível. A criação de Pix real gera uma cobrança pendente: não a confunda com compra aprovada.
4. Confirme que a integração **direta Cakto → UTMify**, já cadastrada no painel da Cakto, recebe eventos de pedidos aprovados. A atribuição só pode ser confirmada com um evento real ou de teste suportado pelas plataformas.
5. Verifique que a Meta recebe um único evento Purchase por pedido aprovado; não configure dois emissores independentes sem deduplicação.

## Observações
- O contrato oficial da API da Cakto para `payments_create` permite `metadata` com `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` e `sck` (até 255 caracteres cada).
- Não cole dados pessoais ou credenciais em capturas de tela ou logs.
- A disponibilidade do arquivo JS na Vercel e a captura das UTMs não comprovam, isoladamente, a atribuição de uma venda na UTMify.
