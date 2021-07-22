const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('yes it\'s working. enjoy!')
})

app.get('/gv/:kachra', (req, res) => {
    const kachra = req.params.kachra.trim();
    var pattern = /[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]/gi;
    let gvs = "";
    let result = kachra.match(pattern);
    result.forEach((gv) => {
        gvs += `${gv}` + "<br>";
    })
    res.send(gvs);
})

app.get('/plus/:email/:from/:to', (req, res) => {
    const email = req.params.email;
    const from = req.params.from;
    const to = req.params.to;
    text = "";
    for (var i = from; i <= to; i++) {
        text += email + "+" + i + "@gmail.com\n"
    }
    res.send(text);
})



app.listen(port, () => console.log('> Server is up and running on port : ' + port))








