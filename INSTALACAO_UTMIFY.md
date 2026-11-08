# Instalação UTMify

- Script de UTMs fornecido pelo usuário instalado em `public/utmify-utms.js`.
- Carregado no `<head>` global em `src/routes/__root.tsx`, inclusive na rota de checkout.
- Back Redirect **não instalado**: opcional, arquivo fornecido possui URL de exemplo.
- Não foi adicionado Pixel nem evento Purchase: exigem configuração/teste separado.
- Não foi alterada a integração existente da Cakto.

## Verificação após deploy
1. Abra `https://mapafaciltributario.vercel.app/utmify-utms.js` e confira que carrega JavaScript.
2. Visite o site com parâmetros UTM de teste e confira o comportamento do rastreamento no painel UTMify.
3. Teste a passagem das UTMs e IDs de atribuição até o checkout e a Cakto, e o recebimento dos webhooks.
4. Confirme consentimento e políticas de privacidade aplicáveis antes de usar rastreamento em produção.
