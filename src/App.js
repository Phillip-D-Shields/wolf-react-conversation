import React, { useState } from "react";

export default function App() {
  // loading
  const [loading, setIsLoading] = useState(false);

  // response
  const [reply, setReply] = useState(undefined);

  const [responses, setResponses] = useState([]);

  // query
  const [query, setQuery] = useState("");

  const [queries, setQueries] = useState([]);

  // handle change
  const handleChange = (e) => setQuery(e.target.value);

  async function fetchResponse(input) {
    var myHeaders = new Headers();

    // myHeaders.append("Cookie", "WR_SID=e7adced7.5b54e009db21a; JSESSIONID=162238E374EDAA9D8247CCAC18015CD9");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://api.wolframalpha.com/v1/conversation.jsp?appid=7TX64H-P32AW25LLY&i=${input}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setReply(result.result);
        setResponses([...responses, result ]);
      })
      .catch((error) => console.log("error", error));
  }

  // handleClick
  async function submit() {
    setIsLoading(true);

    setQueries([...queries, query]);

    await fetchResponse(query);

    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>a wee morrigan conversation box, version 2.0</h1>
      <h3>ask a question</h3>
      <input type="text" onChange={handleChange} />
      <button onClick={submit}>submit</button>

      {/* conditionally render loading */}
      {loading && <h2>thinking...</h2>}

      {/* conditionally render api request below */}
      {reply &&  <h4>{reply}</h4>}

      {/* conditionally render query */}
      {queries.length > 0 &&
        queries.map((query, idx) => (
          <h4 key={idx}>
            query: {query} idx: {idx}
          </h4>
        ))
      
      
      }
    </div>
  );
}
