# UsuarioFront
 Aplicativo feito em React-Native para a realização de CRUD para usuários
## Configuração do ambiente:
- Primeiro, recomendo seguir os passos relatados nesse tutorial: https://dev.to/alexandrefreire/como-instalar-react-native-windows-e-android-466f
- Lembre-se de checar se as variáveis de ambiente, ANDROID_HOME e Platfom-tools estão ok. O SDK do android encontra-se na pasta c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\
- Se for a primeira vez que você configura um ambiente de desenvolvimento Android, lembre-se de aceitar as licensas. Execute o comando: ```sdkmanager --licenses```. O comando pode ser executado dentro de %ANDROID_HOME%/tools/bin.
- Após configurar todo o ambiente, vá até o android studio e na parte de AVD_MANAGER, inicie uma máquina virtual do android de sua preferência.
- Agora, vá até a raiz do presente projeto e execute o comando ```$npm install```, para instalar todas as dependencias do projeto e depois excutar ```$react-native``` run-android para rodar o projeto.
## Descrição das funicionalidades:
- Todas as funções do aplicativo, consomem os serviços disponíves na api que econtra-se em: https://github.com/cleitianne/UsuarioBack.
- A primeira tela, lista todos os usuários cadastrados. Nessa tela é feito um GET na rota ```api\usuarios``` que retorna todos os usuários.
- Nessa mesma tela é fornecida uma função de filtro, em que é feito um GET na rota ```api\usuarios?nome={nome}```, em que todos os usuários que possuem aquele determinado nome são retornados.
- Ao clicar em um usuário específico, uma tela de detalhes do usuário é aberta.
- Ao lado de cada usuário, é dado a opção de exclusão. Nessa funcionalidade é feito um POST em ```api\usuarios\{id}``` para excluir o usuário selecionado.
- É possível cadastrar um novo usuário, clicando em "ADICIONAR USUÁRIO". Após todo o fluxo de preenchimento dos dados, é feito um POST em ```api\usuarios\``` para adicionar o novo usuário.
- OBS: durante o fluxo de adição do usuários, são feitas duas consultas para validar a inserção dos dados. Um GET em ```api\usuarios\cpf?cpf{cpf}``` que retorna exclusivamente um usuário que possua aquele CPF, isso serve para validar se o usuário não está inserindo um CPF de alguém que já esteja cadastrado. O mesmo ocorre para o RG, onde é feito um GET em ```api\usuarios\rg?rg={rg}```.

