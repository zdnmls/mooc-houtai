const cheerio = require('cheerio')
const request = require('request')
const async =require('async')
const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbs'
});

let farr = [];
request({url:'https://www.imooc.com/course/list'},(err,response,body)=>{
    let $ = cheerio.load(body)
    $('.course-content .bd').eq(0).find('.course-nav-item a' ).each((index,el)=>{
        if(index){
            farr.push({
                f_name:$(el).text(),
                f_href:'https://www.imooc.com'+$(el).attr('href'),
                sql:'insert into field (name) values (?)',

            })
        }
    });
    let carr = [];
    async.eachLimit(farr,20,function (v,callback) {
        // console.log(v.sql)
        connection.query(
            v.sql,
            [v.f_name],
            function (err,result) {
                carr.push({
                    id:result.insertId,
                    href:v.f_href
                })
                callback()
            })
    },function (err) {
        if(!err){
           async.eachLimit(carr,10,function (v,callback) {
                request(v.href,(err,header,body)=>{
                    let $ = cheerio.load(body)
                    $('.bd').eq(1).find('.course-nav-item a').each((index,el)=>{
                        if(index){
                            let sql ='insert into category (fid,name) values (?,?)';
                            connection.query(sql,[v.id,$(el).text()],(err,result)=>{
                            })
                        }
                    })
                })
            },function (err) {
               if(!err){
                   console.log('done')
               }
           })
        }
    })
})