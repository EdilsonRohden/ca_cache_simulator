# ca_cache_simulator
Cache simulator

Edilson Rohden e Gabriel Techio Pansera:

	Mapeamento: Direto

	Troca: não tem 

	Escrita: Write - Through

//Implementação
 Pode ser implementado em qualquer linguagem, e deve seguir o padrão das estruturas do código em C abaixo, respeitando todos os tamanhos dados. 

MemCache cache[16]; //tamanho de quadros ou conjuntos
MemPrincipal principal[2048]; //número de células


//Opções de Menu

1- Ler Memoria
2- Escrever memoria
3- Estatísticas

As estatísticas abaixo devem ser implementadas:

3.1 Numero de Acessos
3.2 Numero de Acertos
3.3 Numero de Faltas
3.4 Numero de Leituras
3.5 Numero de Escritas
3.6 Numero de Acertos na Leitura
3.7 Numero de Acertos na Escrita
3.8 Numero de Faltas na Leitura
3.9 Numero de Faltas na Escrita


//Pontuação
Em caso da politica direta:

    Politica de Mapeamento: 5 pts
     Politica de escrita: 2 pts
    Estatísticas: 3 pts


//Observações:

    O tamanho do quadro deve ser definido pelo grupo.
    Os dados de endereço e rótulo devem ser exibidos em binário.
    O conteúdo de cada célula é um char, que pode ser preenchido aleatoriamente na memória principal.
    Caso seja necessário adição de variáveis ou modificação no tamanho dos atributos nas estruturas, deve ser feito. Mas sempre respeitando o tamanho da cache, da memória principal e das células.


N = 2048
Q = 16
log2(2048) = 11 //Cada endereço é um valor de 11bits
E = 11

O valor escolhido para K é 16

BLOCOS = N/K
B = 2048/16 = 128
Total de blocos 128;

Um quadro(cache) é sempre igual a um bloco(MP)

tag:
    log2(16) = 4
    4 bits para representar o quadro em cache.

Para descobrir o bloco:
    endereço/K
Para Deslocamento no bloco:
    endereço % K


