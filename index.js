import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const options = {
    method: 'GET',
    url: '',
    headers: {
      'X-RapidAPI-Key': '1f950b51b7msh501c017248e5cadp15c4a5jsnbb9d4cd35224',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
};

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const word = req.body.word;
    const action = req.body.action;

    switch (action) {
        case "frequency":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/frequency`;
            try {
                const response = await axios.request(options);

                let information = "";
                information += "<ul>";
                information += `<li>Common Used Scale (out of 7): ${response.data.frequency.zipf}/7</li>`;
                information += `<li>How likely '${word}' would appear in 1M texts: ${response.data.frequency.perMillion}</li>`;
                information += `<li>Likelyhood word would appear in an English text (0-1): ${response.data.frequency.diversity}</li>`;
                information += "</ul>";

                res.render("index.ejs", {word: word, action: 'frequency', info: information});
            } catch (error) {
                res.render("index.ejs", {error: error});
            }
            break;
        
        case "syllables":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/syllables`;
            try {
                const response = await axios.request(options);
                let information = `<p>No of syllables: ${response.data.syllables.count}</p>`;
                information += "<ul>";
                response.data.syllables.list.forEach(syllable => {
                    information += "<li>"+syllable+"</li>";
                });
                information += "</ul>";

                res.render("index.ejs", {word: word, action: 'syllables', info: information});
            } catch (error) {
                res.render("index.ejs", {error: error});
            }
            break;

        case "pronounciation":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/pronunciation`;
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            res.render("/");
            break;

        case "antonyms":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/antonyms`;
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            break;
        
        case "rhymes":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`;
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            break;
        
        case "examples":
            options['url'] = `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`;
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            break;
        default:
            res.render("/");
            break;
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});