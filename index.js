const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    const htu = `
    <h3>To extract gvs,</h3>
    http://gvgb.herokuapp.com/gv/copied-email-here................dsdasdsdadsasd.asdad.dada.d.ad.ad.a<br>

    <br><br><br><br>
    <h3>To increment gmail,</h3>
    http://gvgb.herokuapp.com/plus/gmailaddr/1/100<br>
    where gmailaddr is from gmailaddr@gmail.com without @gmail.com and 1 - 100 is limit.<br><br>

    simple!
`;
    res.send(htu)
})

app.get('/gv/:kachra', (req, res) => {
    try {
        const kachra = req.params.kachra.trim();
        var pattern = /[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]/gi;
        let gvs = "";
        let result = kachra.match(pattern);
        result.forEach((gv) => {
            gvs += `${gv}` + "<br>";
        })
        res.send(gvs);
    } catch (e) {
        res.send('something is really wrong');
    }
})

app.get('/plus/:email/:from/:to', (req, res) => {
    try {
        const email = req.params.email;
        const from = req.params.from;
        const to = req.params.to;
        text = "";
        for (var i = from; i <= to; i++) {
            text += email + "+" + i + "@gmail.com\n"
        }
        res.send(text);
    } catch (e) {
        res.send('something is really wrong');
    }
})



app.listen(port, () => console.log('> Server is up and running on port : ' + port))








