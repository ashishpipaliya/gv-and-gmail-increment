const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js')

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
        var pattern = /[A-Z|0-9]{4}-[A-Z|0-9]{6}-[A-Z|0-9]{3,4}/gi;
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
                tokens+= `<p>${arr[i]}  ${arr2[i]}</p>`;
            }
            res.send(tokens);
        } catch (e) {
            console.log(e);
            res.send('something is really wrong');
        }
    })


    app.get('/sim/:name', (req, res) => {
     var name = req.params.name;
     const supabase = createClient(
        'https://txzntoakmtfnztyfkgay.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTEzODQ1MSwiZXhwIjoxOTUwNzE0NDUxfQ.NdoQHgTEm7qUtLi00gCAfQX15exhIg3UBnb58enbaxE'
      )
      supabase
      .from('amazon-otp')
      .select().eq('name' , name )
      .limit(1).then(data=>{
        console.log(data);
        if(data){
        var html  = `<p id="otp">${data.data[0]?.name}</p><p id="phone">${data.data[0]?.phone_number}</p><p id="otp">${data.data[0]?.otp}</p>`;
            res.send(html)
        }else{
            res.send(`<p id="phone">${e ?? 'something went wrong'}</p><br>`)
        }
      })
    })

// 404 route
app.get('*', function (req, res) {
    res.send('Error 404. Page Not Found')
});

app.listen(port, () => console.log('> Server is up and running on port : ' + port))








