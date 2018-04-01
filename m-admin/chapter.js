const cheerio = require('cheerio')
const request = require('request')
const async =require('async')
const mysql = require('mysql')
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbs'
});
async.series({
    urls: function (callback) {
        let url = [];
        con.query("select id , url from course", (err, body) => {
            body.forEach(v => {
                url.push({
                    id: v.id,
                    url: "https://www.imooc.com" + v.url
                })
            })
            callback(null, url);
        })
    }
}, function (err, results) {
    async.eachLimit(results.urls, 10, function (url, callback) {
        request(url.url, (err, response, body) => {
            let $ = cheerio.load(body);
            $(".chapter").each((index, val) => {
                // console.log($(val).find("h3 strong").contents())
                let chapter_name = $(val).find("h3 strong").contents()[2].data.trim();
                con.query(
                    "insert into chapter (cid,title) values (?,?)",
                    [url.id, chapter_name],
                    (err, body) => {
                        console.log(chapter_name + "ok")
                        let cid = body.insertId;
                        $(val).find(".video li").each((index, val) => {
                            let section_name = $(val).find("a").contents()[2].data.replace(/\s/g, "");
                            let sql = `insert into sections (sid,title,src) values (?,?,?)`
                            con.query(sql, [cid, section_name, "/video/video"+Math.ceil(Math.random()*3)], (err, body) => {
                                if(err){
                                    throw err
                                }else{
                                    console.log(section_name + "ok")
                                }
                            })
                        })
                    }

                )
            })
            callback()
        })
    }, function (err) {
        if (!err) {
            console.log("ok");
        }
    })
})
