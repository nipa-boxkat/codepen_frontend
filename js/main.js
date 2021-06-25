// Fetches data from API and translates to JSON. Passes it to the render data function.
const getDataJSON = async () => {
    response = await fetch("http://localhost:5000");
    const data = await response.json();

    if (response.status === 200) {
    console.log("Data has been acquired and JSON-ified. Sending to rendering...");
        
        // Our output element -- empty wrapper that we'll push divs into
        let outputElement = document.getElementById('codepen-output');
    // Call the render data function, pass data + target element parameter    
    renderData(data, outputElement);
    } else {
    console.log("Something went wrong (status of 200 was not returned from API).");
    }
}

    // Takes passed in JSON data and renders it on screen onto the selected element. 
    //  Default will be to paste straight into body, which is ugly as sin but that's why you pass the parameter
const renderData = async(data, outputElement = document.body) => {
    console.log("Data has been received. Rendering...");
    //data.forEach(doc => console.log(doc));

    try {
        await data.forEach(doc => {
            let date = new Date(doc.date);
            let date2 = date.toLocaleString();
            
            // This is what each individual post (codepen div) looks like
            let outputContent = `
                <div class="grid-item"> 
                <a href=${doc.codepen_url} title='Visit this project on codepen'>
                    <h2 class="codepen-title">
                    ${doc.codepen_title}
                    </h2>
                    <p class="codepen-description">
                    ${doc.codepen_description}
                    </p>
                    <p class='codepen-date-posted'>${date2}</p>
                    </a>
                </div>`
    
            outputElement.innerHTML += outputContent
        })
    } catch(error) {
        console.log(error);
    }
    
}