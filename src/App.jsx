
import { useState ,useCallback,useEffect,useRef} from 'react';
import './App.css';


function App() {
  const [length,setlength] = useState(15)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllow,setCharAllow] = useState(false)
  const [password,setPassword] = useState ("")
  const passwordRef = useRef(null)

  const copyPassword = useCallback(()=>{ 
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,16)
     window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllow)  str += "!@#$%^&*()_+{}[]|?~`-/><,"

    for (let i = 1; i < length; i++) {
     let char = Math.floor(Math.random()*str.length+1)      

     pass +=  str.charAt(char)

    }
    setPassword(pass)

  },[length,numAllowed,charAllow,setPassword])

  useEffect(()=>{
      passwordGenerator()
  },[length,numAllowed,charAllow,passwordGenerator])

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="input">
        <input type="text"
        value={password}
        className='inputField'
        readOnly
        placeholder='password'
        ref={passwordRef}
        />
        <button onClick={copyPassword} className='copyBtn'>copy</button>
      </div>
      <div className="lenthDiv">
        <div className="lengthDiv02">
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='range'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label className='label'>lenght:{length}</label>
        </div>
        <div className="lengthDiv02">
          <input 
          type="checkbox" 
          className="checked"
          defaultChecked={numAllowed}
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }}
          />
          <label className='label'>Number allow</label>
        </div>
        <div className="lengthDiv02">
          <input 
          type="checkbox" 
          className="checked"
          defaultChecked={charAllow}
          onChange={()=>{
            setCharAllow((prev)=>!prev)
          }}
          />
          <label className='label'>Character Allow</label>
        </div>
      </div>
    </div>
  );
}

export default App;
