import './App.css';
import init from "./init"

const state = {}
const cache = []
const ram = []
const est = {
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
init(cache, ram)

function read(address){
  console.log("Before Reading")
  console.log(cache)
  console.log(ram)
  console.log(est)
  const result = getCellFromCache(address)
  console.log("After Reading")
  console.log(cache)
  console.log(ram)
  console.log(est)
  return result
}


function write(address, value){
  console.log("Before Writting")
  console.log(cache)
  console.log(ram)
  console.log(est)
  writeCellToCache(address, value)
  console.log("After Writting")
  console.log(cache)
  console.log(ram)
  console.log(est)
}

function getCellFromCache(address) {
  console.log("getting from cache")
  const quadro = getQuadro(address)

  if(quadro.tag === getTag(address)){
    console.log("hit")
    hitOnRead()
    const cell = getCellDecimalPosition(address)
    return quadro.cells[cell]
  }
  console.log("miss")
  missOnRead()
  const block =  getBlockFromRAM(address);
  writeBlockToCache(address, block)
  return block[getCellDecimalPosition(address)]
}

function writeCellToCache(address, value){
  console.log("writting to cache")
  const quadro = getQuadro(address)
  if(quadro.tag === getTag(address)){
    console.log("hit")
    hitOnWrite()
    const cell = getCellDecimalPosition(address)
    quadro.cells[cell] = value
    writeBlockToRAM(address, quadro.cells)
    return
  }
  console.log("miss")
  missOnWrite()
  getFromRamAndWrite();
  function getFromRamAndWrite() {
    const block = getBlockFromRAM(address);
    writeBlockToCache(address, block);
    const quadro = getQuadro(address);
    const cell = getCellDecimalPosition(address);
    quadro.cells[cell] = value;
    writeBlockToRAM(address, quadro.cells);
  }
}

function writeBlockToCache(address, block){
  console.log("writting to cache")
  const quadro = getQuadro(address)
  quadro.cells = block
  quadro.tag = getTag(address)
}

function getBlockFromRAM(address) {
  est.n_acessos++
  const decimalAddress = getDecimalAddress(address)
  let beginBlock = parseInt(decimalAddress/cache.length) * cache.length
  const endBlock = beginBlock + cache.length
  const block = []
  while(beginBlock < endBlock){
    block.push(ram[beginBlock])
    beginBlock++
  }
  return block;
}

function writeBlockToRAM(address, block){
  est.n_acessos++
  const decimalAddress = getDecimalAddress(address)
  let beginBlock = parseInt(decimalAddress/cache.length) * cache.length
  block.forEach(cell => {
    ram[beginBlock] = cell
    beginBlock++
  });
}

function getTag(address){
  return address.substring(0, 3)
}

function getCellDecimalPosition(address){
  return parseInt(address.substring(7, 11), 2)
}

function getDecimalAddress(address){
  return parseInt(address, 2)
}

function getQuadro(address) {
  const decimalAddress = getDecimalAddress(address)
  const quadroDestino = decimalAddress % cache.length
  return cache[quadroDestino]
}

function hitOnRead(){
  est.n_acertos++
  est.n_leituras++
  est.n_acertos_leitura++
}
function missOnRead(){
  est.n_faltas_leitura++
  est.n_leituras++
  est.n_faltas++
}

function hitOnWrite(){
  est.n_acertos_escrita++
  est.n_escritas++
  est.n_acertos++
}
function missOnWrite(){
  est.n_faltas_escrita++
  est.n_escritas++
  est.n_faltas++
}
function createBinaryString (index) {
  let binary = index.toString(2) 
  while(binary.length < 11){
    binary = "0" + binary
  }
  return binary
}

function App() {
  return (
    <div className="App">

      <div className="MC">
        <table>
          <thead>
            <tr>
              <th>TAG</th>
              {cache.map((_, index) => (
                <th key={index}>
                  cell-{index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cache.map((value, index) => (
                <tr key={index}>
                  <td key={index+"quadro"}>Quadro-{index}</td>
                  {value.cells.map((element, inde) => (
                    <td key={inde+"cell"}>{element}</td>
                  ))}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="readWrite">
        <input placeholder="Endereço"
          type="text" value={state.address} onChange={(event)=>{state.address = event.target.value}}></input>
        <input placeholder="Valor" 
          type="text" value={state.value} onChange={(event)=>{state.value = event.target.value}}></input>
        <button onClick={()=> {
          write(state.address, state.value)
        }}>Write</button>
        <button onClick={()=> {
          state.value = read(state.address)
        }}>read</button>
      </div>
      <div className="estatistics">
        <table>
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Numero de Acessos</td><td>{est.n_acessos}</td>
            </tr>
            <tr>
              <td>Numero de Acertos</td><td>{est.n_acertos}</td>
            </tr>
            <tr>
              <td>Numero de Faltas</td><td>{est.n_faltas}</td>
            </tr>
            <tr>
              <td>Numero de Leituras</td><td>{est.n_leituras}</td>
            </tr>
            <tr>
              <td>Numero de Escritas</td><td>{est.n_escritas}</td>
            </tr>
            <tr>
              <td>Numero de Acertos na Leitura</td><td>{est.n_acertos_leitura}</td>
            </tr>
            <tr>
              <td>Numero de Acertos na Escrita</td><td>{est.n_acertos_escrita}</td>
            </tr>
            <tr>
              <td>Numero de Faltas na Leitura</td><td>{est.n_faltas_leitura}</td>
            </tr>
            <tr>
              <td>Numero de Faltas na Escrita</td><td>{est.n_faltas_escrita}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="MP">
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {ram.map((value, index) => (
                <tr key={index+"celula"}>
                  <td key={index+"binary"}>{createBinaryString(index)}</td>
                  <td key={index+"binaryValue"}>{value}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;