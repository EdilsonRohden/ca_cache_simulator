export default (cache, ram, est) => {
    if(cache?.length !== 16){
        for (let i = 0; i < 16; i++) {
            cache.push({
                tag: "---",
                cells: ["","","","","","","","","","","","","","","",""]
            });        
        }
        for (let i = 0; i < 2048; i++) {
            ram.push(Math.random().toString(36).substring(5,4));
        }

        est = {
            n_acessos: 0,
            n_acertos: 0,
            n_faltas: 0,
            n_leituras: 0,
            n_escritas: 0,
            n_acertos_leitura: 0,
            n_acertos_escrita: 0,
            n_faltas_leitura: 0,
            n_faltas_escrita: 0
        }
    }
}