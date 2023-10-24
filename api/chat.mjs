async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
            headers: {
                Authorization: "Bearer ---",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({ "inputs": "The recipe of spaghetti sauce " }).then((response) => {
    console.log(JSON.stringify(response));
});