# UsuarioFront
 Aplicativo feito em React-Native para a realização de CRUD para usuários
## Configuração do ambiente:
- Primeiro, recomendo seguir os passos relatados nesse tutorial: https://dev.to/alexandrefreire/como-instalar-react-native-windows-e-android-466f
- Lembre-se de checar se as variáveis de ambiente, ANDROID_HOME e Platfom-tools estão ok. O SDK do android encontra-se na pasta c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\
- Se for a primeira vez que você configura um ambiente de desenvolvimento Android, lembre-se de aceitar as licensas. Execute o comando: ```sdkmanager --licenses```. O comando pode ser executado dentro de %ANDROID_HOME%/tools/bin.
- Após configurar todo o ambiente, vá até o android studio e na parte de AVD_MANAGER, inicie uma máquina virtual do android de sua preferência.
- Agora, vá até a raiz do presente projeto e execute o comando ```$npm install```, para instalar todas as dependencias do projeto e depois excutar ```$react-native``` run-android para rodar o projeto.
