// 所有表格数据
var tableData = [];

function init(){
    location.hash='student-list';
    bindEvent();
}
init();

function bindEvent(){
    var list=$('header .drop-list');
    $('header .btn').click(function(){
        list.slideToggle();
    });

    $(window).on('hashchange',function(){
        // console.log(12);
        var hash=location.hash;
        //console.log(hash);

        $('.show-list').removeClass('show-list');
        $(hash).addClass('show-list');

        //#student-list
        $('.list-item.active').removeClass('active');
        $('.'+hash.slice(1)).addClass('active');
    });

    $('.list-item').click(function(){
        $('header .drop-list').slideUp();
        var id=$(this).attr('data-id');
        // console.log( $(this).data('id'));
        // console.log(id);

        location.hash=id;
    });



    //编辑按钮添加点击事件
    $('#students-table > tbody').on('click', '.edit', function () {
        // 拿到当前学生的数据  渲染到编辑表单当中  并且显示编辑表单
        // 获取当前编辑按钮对应的学生的索引值
        var index = $(this).parents('tr').index();
        //console.log(index);
        renderEditForm(tableData[index]);
        $('.modal').slideDown();
    });


    //提交按钮点击事件
    $('.submit').click(function (e) {
        e.preventDefault();
        var data = getFormData($('#edit-form'));
        if (data.status === 'success') {
          $.ajax({
            url: '/updateStudent',
            type: 'get',
            dataType: 'json',
            success: function (res) {
              if (res.status === 'success') {
                $('.modal').slideUp();
                getTableData();
              }
            }
          })
        }
      });



    //删除按钮点击事件
    $('#students-table > tbody').on('click', '.remove', function(){
        var index = $(this).parents('tr').index();
        var isDel = confirm('确认删除学号为' + tableData[index].sNo + '的学生信息吗？');
        if (isDel) {
          $.ajax({
            url: '/delBySno',
            type: 'get',
            dataType: 'json',
            success: function (res) {
              if (res.status === 'success') {
                alert('删除成功');
                getTableData();
              }
            }
          })
        }
      })

    //点击阴影区域，编辑表单收回
    $('.modal').click(function(e) {
        if (e.target === this) {
          $('.modal').slideUp();
        }
      
      });
    

    //为新增提交按钮添加点击事件
   
function formatData(data) {
    var obj = {};
    // for循环的数据可以是数组  也可以是对象（类数组）
    // forEach循环只能是数组
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!item.value) {
            // 如果是数组的forEach  或者map  filter  方法中return的话  代表的是方法的返回值  
            // 否则是最近一层函数的返回值
            return false;
        }
        obj[item.name] = item.value;
    }
    return obj;
}


function transferData(path, data, cb) {
    $.ajax({
        url: 'http://api.duyiedu.com' + path,
        type: 'get',
        data: $.extend({
            appkey: 'kaivon_1574822824764'
        }, data),
        // json 
        // jsonp  ---> 解决跨域问题   和ajax是两个东西
        // cors
        dataType: 'json',
        success: function (res) {
            if (res.status == 'success') {
                cb(res.data);
            } else {
                alert(res.msg);
            }
        }
    })
};



    $('#add-student-btn').click(function (e) {
        // 阻止表单提交默认刷新功能
        e.preventDefault();
        // 获取表单数据
        var data = $('#add-student-form').serializeArray();
        // 将表单数据转化成对象的形式
        data = formatData(data);
        // 如果数据没问题则提交否则弹出错误信息
        if (!data) {
            alert('请将信息填写完全后提交');
        } else {
            // 提交新增的学生信息
            transferData('/api/student/addStudent', data, function (res) {
                // 提交成功跳转到列表页
                alert('提交成功');
                $('#add-student-form')[0].reset();
                // $('#menu-list > dd[data-id=student-list]').click();
                // 点击确定更新页面
                location.hash = 'student-list';

            })
        }
        return false;
    });


    // 点击搜索按钮  过滤表格数据
    $('#search-btn').click(function () {
      var val = $('#search-inp').val();
      // 将当前页置为1 获取表格数据
      nowPage = 1;
      getTableData(val);
  })

}




//获取表格数据（mock模拟的数据）
function getTableData(){
    $.ajax({
        url:'/studentList',
        type:'get',
        dataType:'json',
        success:function(res){
            console.log(res);
            if (res.status === 'success') {
                tableData = res.data;
                renderDom(res.data);
            }
        }
    })
}

//渲染表格数据
function renderDom(data) {
    var str = data.reduce(function (prev, item) {
      return prev + `  <tr>
      <td>${item.sNo}</td>
      <td>${item.name}</td>
      <td>${item.sex == 0 ? '男' : '女'}</td>
      <td>${item.email}</td>
      <td>${new Date().getFullYear() - item.birth}</td>
      <td>${item.phone}</td>
      <td>${item.address}</td>
      <td>
          <button class="btn edit">编辑</button>
          <button class="btn remove">删除</button>
      </td>
  </tr>`
    }, '');
    $('#students-table > tbody').html(str);
  }


//表单回填
function renderEditForm(data) {
    var form = $('#edit-form')[0];
    for (var prop in data) {
      if (form[prop]) {
        form[prop].value = data[prop];
      }
    }
  }

// 获取表单数据
function getFormData(form) {
    var arr = form.serializeArray();
    var result = {
      status: 'success',
      msg: '',
      data: {}
    };
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value) {
        result.data[arr[i].name] = arr[i].value;
      } else {
        result.status = 'fail';
        result.msg = '信息填写不全，请检验后提交';
        return result;
      }
    }
    return result;
  }
  

getTableData();





 










