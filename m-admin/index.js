const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const async = require('async')
const multer = require('multer');
const bodyParser = require('body-parser')
const upload = multer({
    dest: path.join(__dirname, './public/temp')
});
var app = express();
var mysql = require('mysql');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbs'
});
app.get('/', function (req, res) {
    res.sendFile(path.resolve('./views/index.html'))
})
app.post('/api/add_course', upload.single('pic'), function (req, res) {
    let {
        title,
        field,
        type,
        degree,
        s_desc
    } = req.body;
    let name = new Date().valueOf();
    let oldPath = path.join(__dirname, './public/temp/') + req.file.filename;
    let newPath = path.join(__dirname, '../mooc/public/img/') + name + path.extname(req.file.originalname)
    fs.rename(
        oldPath,
        newPath,
        function (err) {
            if (err) {
                throw err
            } else {
                let pic = '/img/' + name + path.extname(req.file.originalname);
                async.series({
                    f_id: function (callback) {
                        connection.query(
                            'select id from field where name=?', [field],
                            function (req, r) {
                                callback(null, r)
                            }
                        )
                    },
                    t_id: function (callback) {
                        connection.query(
                            'select id from type where name=?', [type],
                            function (req, r) {
                                callback(null, r)
                            }
                        )
                    },
                    d_id: function (callback) {
                        connection.query(
                            'select id from degree where name=?', [degree],
                            function (req, r) {
                                callback(null, r)
                            }
                        )
                    },
                }, function (err, r) {
                    if (err) {
                        throw err
                    } else {
                        let crr = [];
                        async.eachLimit(req.body.category, 20, function (v, callback) {
                            connection.query(
                                'select id from category where name=?', [v],
                                function (err, result) {
                                    crr.push(result)
                                    callback()
                                }
                            )
                        }, function (err) {
                            if (!err) {
                                r.cid = []
                                crr.forEach(v => {
                                    r.cid.push(v[0].id)
                                })
                                let fid = r.f_id[0].id;
                                let tid = r.t_id[0].id;
                                let did = r.d_id[0].id;
                                let cid = r.cid;
                                let view_count = 0;
                                let teach_id = 1;
                                let teach_tip = '无';
                                let url = '/learn/968'
                                connection.query(
                                    'insert into course (fid,tid,did,view_count,description,title,teach_id,teach_tip,pic,url) values (?,?,?,?,?,?,?,?,?,?)', [fid, tid, did, view_count, s_desc, title, teach_id, teach_tip, pic, url],
                                    function (err, result) {
                                        if (err) {
                                            throw err
                                        } else {
                                            if (result) {
                                                let course_id = result.insertId;
                                                cid.forEach(v => {
                                                    connection.query(
                                                        'insert into course_category (course_id,category_id) values (?,?)', [course_id, v],
                                                        function (err, result) {
                                                            if (err) {
                                                                throw err
                                                            } else {
                                                                console.log('关系表写入成功')
                                                            }
                                                        }
                                                    )
                                                })
                                            }
                                        }
                                    }
                                )
                            } else {
                                throw err
                            }
                        })
                    }
                })
                res.json('/img/' + name + path.extname(req.file.originalname))
            }
        }
    )
})
app.post('/api/add_field', upload.single('field'), function (req, res) {
    connection.query(
        'insert into field (name) values (?)', [req.body.field],
        function (err, r) {
            if (err) {
                throw err
            } else {
                res.json('ok')
            }
        }
    )
})
app.post('/api/add_category', upload.single('category'), function (req, res) {
    console.log(req.body)
    connection.query(
        'select id from field where name=?', [req.body.fid],
        function (err, result) {
            if (result.length != 0) {
                connection.query(
                    'insert into category (name,fid) values (?,?)', [req.body.category, result[0].id],
                    function (err, r) {
                        if (err) {
                            throw err
                        } else {
                            res.json('ok')
                        }
                    }
                )
            }
        }
    )

})
app.post('/api/add_type', upload.single('type'), function (req, res) {
    connection.query(
        'insert into type (name) values (?)', [req.body.type],
        function (err, r) {
            if (err) {
                throw err
            } else {
                res.json('ok')
            }
        }
    )
})
app.post('/api/login', function (req, res) {
    // console.log(req.body)
    let {
        pass,
        username
    } = req.body;
    connection.query(
        'select * from  teacher where name=? and password=?', [username, pass],
        function (err, result) {
            if (result.length) {
                res.json('ok')
            } else {
                res.json('no')
            }
        }
    )

})
app.get('/api/course_list', function (req, res) {
    connection.query(
        'select * from course',
        function (err, result) {
            res.json(result)
        }
    )
})
app.get('/api/field_list', function (req, res) {
    connection.query(
        'select * from field',
        function (err, result) {
            res.json(result)
        }
    )
})
app.get('/api/category_list', function (req, res) {
    connection.query(
        'select * from category',
        function (err, result) {
            res.json(result)
        }
    )
})
app.get('/api/type_list', function (req, res) {
    connection.query(
        'select * from type',
        function (err, result) {
            res.json(result)
        }
    )
})
app.get('/api/del_course', function (req, res) {
    let id = req.query.cid;
    connection.query(
        'select * from course where id = ' + id,
        function (er, result) {
            if (result) {
                res.json('ok')
            }
        }
    )
})
app.get('/api/del_field', function (req, res) {
    let id = req.query.cid;
    connection.query(
        'select * from field where id = ' + id,
        function (er, result) {
            if (result) {
                res.json('ok')
            }
        }
    )
})
app.get('/api/del_category', function (req, res) {
    let id = req.query.cid;
    connection.query(
        'select * from category where id = ' + id,
        function (er, result) {
            if (result) {
                res.json('ok')
            }
        }
    )
})
app.get('/api/del_type', function (req, res) {
    let id = req.query.cid;
    connection.query(
        'select * from type where id = ' + id,
        function (er, result) {
            if (result) {
                res.json('ok')
            }
        }
    )
})
app.get('/api/get_course_info', function (req, res) {
    async.series({
            f_name: function (callback) {
                connection.query(
                    'select name from field',
                    function (req, r) {
                        callback(null, r)
                    }
                )
            },
            ca_name: function (callback) {
                connection.query(
                    'select name from category',
                    function (req, r) {
                        callback(null, r)
                    }
                )
            },
            t_name: function (callback) {
                connection.query(
                    'select name from type',
                    function (req, r) {
                        callback(null, r)
                    }
                )
            },
            d_name: function (callback) {
                connection.query(
                    'select name from degree',
                    function (req, r) {
                        callback(null, r)
                    }
                )
            }
        },
        function (err, r) {
            res.json(r);
        })
})
app.listen(18080)