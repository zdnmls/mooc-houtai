// const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path')
const async = require('async')
const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbs'
});
let pic_url=[]
let imgs = []
for(let i=0;i<34;i++){
    pic_url.push('https://www.imooc.com/course/list?page='+i)
}
async.eachLimit(pic_url,5,function (url,callback) {
    // console.log('正在处理'+url)
    request({
        url
    },(err,response,body)=>{
        let $ = cheerio.load(body)
        let category = [];
        let img = $('.course-card-container img')

        // console.log(did)
        img.each((i,v)=>{
            let pic_url = 'https:'+$(v).attr('src')
            imgs.push(pic_url)
        })
        function string2did(str) {
            let table={
                '初级':1,
                '中级':2,
                '高级':3
            }
            return table[str]
        }
        function string2fid(a,f) {
            connection.query(
                'select * from category where name=?',
                [a],
                function (err,result) {
                    result.forEach((v,i)=>{
                        f(v.fid)
                    })
                }
            )
        }
        function string2cid(str,f) {
            connection.query(
                'select * from category where name=?',
                [str],
                function (err,result) {
                    result.forEach((v,i)=>{
                        f(v.id)
                    })
                }
            )
        }
            $('.course-card-container').each((i,v)=>{
                let title = $(v).find('h3').text()
                let did = string2did($(v).find('.course-card-info span').eq(0).text())
                let view_count = $(v).find('.course-card-info span').eq(1).text()
                let des = $(v).find('.course-card-desc').text()
                let pic = '/img/'+path.basename($(v).find('img').attr('src'))
                let teach_id = 1;
                let  teach_tip = '信息';
                let label = [];
                let tid = 1;
                let url = $(v).find('.course-card').attr('href')
                $(v).find('.course-label label').each((i,v)=>{
                    label.push($(v).text())
                })
                    string2fid(label[0],function (fid) {
                    connection.query(
                        'insert into course (fid,tid,did,view_count,description,title,teach_id,teach_tip,pic,url) values (?,?,?,?,?,?,?,?,?,?)',
                        [fid,tid,did,view_count,des,title,teach_id,teach_tip,pic,url],
                        function (err,result) {
                            if(err){
                                throw err
                            }else{
                                console.log( title+'正在写入数据库')
                                label.forEach((v,i)=>{
                                    string2cid(v,function (cid) {
                                        let course_id = result.insertId;
                                        connection.query(
                                            'insert into course_category (course_id,category_id) values (?,?)',
                                            [course_id,cid],
                                            function (err,result) {
                                                if(err){
                                                    throw  err
                                                }else{
                                                    console.log('关系表写入成功')
                                                }
                                            }
                                        )
                                    })
                                })
                            }
                        }
                    )

                })
            })
        callback()
    })
},function (err) {
    // if(!err){
    //     async.eachLimit(imgs,5,function (url,callback) {
    //         console.log('正在下载'+url)
    //         let pic_name = path.basename(url)
    //         request(url).pipe(fs.createWriteStream(
    //             path.join('./public/img/'+pic_name)
    //         ).on('finish',function () {
    //             callback()
    //         }))
    //
    //     },function (err) {
    //         if(!err){
    //             console.log('done')
    //         }
    //     })
    // }
})

