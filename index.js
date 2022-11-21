const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var bodyParser = require('body-parser')

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit:5000000
    })
)
app.use(express.json())
app.use( bodyParser.json({limit: '50mb'}) );

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/gv', (req, res) => {
const kachra = req.body.kachra;
    try {
        const kachra = req.body.kachra;
        var pattern = /[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]-[A-Z|0-9][A-Z|0-9][A-Z|0-9][A-Z|0-9]/gi;
        let gvs = "";
        let result = kachra.match(pattern);
        result.forEach((gv) => {
            gvs += `${gv}<br>`;
        })
        res.send(gvs);
    } catch (e) {
        console.log(e);
        res.send('something is really wrong');
    }
})

app.post('/plus', (req, res) => {

  console.log(req.body);

    try {
        const email = req.body.email;
        const from = req.body.from;
        const to = req.body.to;
        
        text = "";
        for (var i = from; i <= to; i++) {
            text += email + "+" + i + "@gmail.com<br>"
        }
        res.send(text);
    } catch (e) {
        res.send('something is really wrong');
    }
})

app.post('/tokem', (req, res) => {
        try {
            const kachra = req.body.tokenmails;
            var pattern1 = /[0-9]{9}/g;
            var pattern2 = /[P][0-9]{2}[-][0-9]{7}[-][0-9]{7}/g;
            let tokens = "";

            var arr = [];
            var arr2 = [];

            let result1 = kachra.match(pattern1);
            result1.forEach((gv) => {
                arr.push(gv)
            })

            let result2 = kachra.match(pattern2);
            result2.forEach((gv) => {
                arr2.push(gv)
            })

            for(var i =0; i<arr.length; i++){
                tokens+= `${arr[i]}	${arr2[i]}
                `
            }
            console.log(tokens);
            res.send(tokens);
        } catch (e) {
            console.log(e);
            res.send('something is really wrong');
        }
    })


// 404 route
app.get('*', function (req, res) {
    res.send('Error 404. Page Not Found')
});

app.listen(port, () => console.log('> Server is up and running on port : ' + port))








