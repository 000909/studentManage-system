Mock.mock('/studentList',{
    "data|10":  [{
        "id": "@id",
        "name":"@cname",
        "birth": "@date('yyyy')",
        "sex|1": [0,1],
        "sNo":"@integer(1000, 1000000)",
        "email":"@email",
        "phone":"@integer(12000000000,19000000000)",
        "address":"@city(true)",
        "appkey":"@word(16)",
        "ctime": 1547190636,
        "utime":1547190636
    }],
    "status":"success",
    "msg":"查询成功"
}) 


Mock.mock('/updateStudent','get',{
    "data": "",
    "status":"success",
    "msg":"查询成功"
}) 


//删除接口
Mock.mock('/delBySno','get',{
    "data": "",
    "status":"success",
    "msg":"删除成功"
}) 


//新增学生接口


Mock.mock(RegExp('addStudent?[\w\W]*'),'get',function(){
    
    
   
    return{
        "data": "",
        "status":"success",
        "msg":"新增成功"
    }

})
