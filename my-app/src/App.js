import logo from './logo.svg';
import './App.css';
import {useState} from 'react';



function App() {

  const [message, setMessage] = useState("")
  const [responses, setResponses] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newResponse = { question: message, response: "" };
    setResponses([...responses, newResponse]);
    setMessage("");
  
    const response = await fetch("http://localhost:5069/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => data.message)
      .catch((e) => console.error(e));
  
    const updatedResponse = { ...newResponse, response };
    
    setResponses((prevResponses) =>
      prevResponses.map((r) =>
        r.question === updatedResponse.question ? updatedResponse : r
      )
    );
  };



  return (
    <div className="App">
      <div className = "chat_Container">
        <div className = "chat_Box">
          <div className = "chat_Header">
            <p>Inquire about the company</p>
          </div>

          <div className = "chat_Flex">
            <div className = "chat_Messages">
            {responses.map((r, i) => (
                <div className="response_Flex" key={i}>
                  <p className="bot_Messages">{r.question}</p>
                  {r.response && <p className="user_Messages">{r.response}</p>}
                </div>
              ))}
            </div>

          </div>

        </div>

        <form onSubmit={handleSubmit}>
            <input
            value = {message}
            placeholder ="What is your questions?"
            onChange={(e) => setMessage(e.target.value)}
            ></input>

            <button type = "submit">Submit</button>

        </form>


      </div>


    </div>
  );
}

export default App;
