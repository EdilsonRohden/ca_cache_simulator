export default (cache, ram) => {
    for (let i = 0; i < 16; i++) {
        cache.push({
            tag: "",
            cells: ["","","","","","","","","","","","","","","",""]
        });        
    }
    for (let i = 0; i < 2048; i++) {
        ram.push(Math.random().toString(36).substring(5,4));
    }

    console.log(cache)
    console.log(ram)
}