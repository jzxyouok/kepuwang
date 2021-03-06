<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
    <title>科普网后台管理系统</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width">
    <link href="/public/stylesheet/styles.css" rel="stylesheet" media="screen">
    <link href="/public2/stylesheet/index.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="/public2/stylesheet/templatemo_main.css">
</head>

<body ng-app="myapp">
    <div class="navbar navbar-inverse" role="navigation">
        <div class="navbar-header">
            <div class="logo">
                <h1>科普网后台管理系统</h1></div>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
    </div>
    <div class="template-page-wrapper">
        <div class="navbar-collapse collapse templatemo-sidebar">
            <ul class="templatemo-sidebar-menu">
                <li class="active"><a href="#"><i class="fa fa-home"></i>主页</a></li>
                <li class="sub"><a href="javascript:;">
    <i class="fa fa-database"></i>文章管理
    <div class="pull-right"><span class="caret"></span></div>
</a>

                    <ul class="templatemo-submenu"><!-- 1轮播2热点3普通4推荐 -->
                        <li><a href="#/allArticle?status=1&mainType=0&page=1">所有文章</a></li>
                       <!--  <li><a href="#/allArticle?type=1">首页轮播</a></li>
                        <li><a href="#/allArticle?type=2">首页热点</a></li>
                           <li><a href="#/allArticle?type=4">首页推荐</a></li>
                        <li><a href="#/allArticle?type=3">普通文章</a></li> -->
                        <li><a href="#/allArticle?articleType=1&status=2&mainType=0&page=1">草稿箱</a></li>
                        <li><a href="#/allArticle?articleType=1&status=0&mainType=0&page=1">被撤文章</a></li>
                        <li><a href="#/newArticle">新文章</a></li>
                         
                    </ul>
                </li>
                <li class="sub">
                    <a href="javascript:;">
                        <i class="fa fa-database"></i> 图片管理
                        <div class="pull-right"><span class="caret"></span></div>
                    </a>
                    <ul class="templatemo-submenu">
                        <li><a href="#/allPic?articleType=2&status=1&mainType=0&page=1">所有图片</a></li>
                     <!--    <li><a href="#/allPic?type=2">首页图片</a></li>
                        <li><a href="#/allPic?type=1">首页图片</a></li>

                        <li><a href="#/allPic?type=3">普通图片</a></li> -->
                        <li><a href="#/allPic?articleType=2&status=2&mainType=0&page=1">草稿箱</a></li>
                        <li><a href="#/allPic?articleType=2&status=0&mainType=0&page=1">被撤图片</a></li>
                        <li><a href="#/newPic">新图片</a></li>
                        <!-- <li><a href="#">Facilisi</a></li> -->
                    </ul>
                </li>
                <li class="sub">
                    <a href="javascript:;">
                        <i class="fa fa-database"></i> 视频管理
                        <div class="pull-right"><span class="caret"></span></div>
                    </a>
                    <ul class="templatemo-submenu">
                        <li><a href="#/allVideo?articleType=4&status=1&mainType=0&page=1">所有视频</a></li>
                         
                      <!--   <li><a href="#/allVideo?type=2">首页视频</a></li>
                        <li><a href="#/allVideo?type=3">普通视频</a></li> -->
                        <li><a href="#/allVideo?articleType=4&status=2&mainType=0&page=1">草稿箱</a></li>
                        <li><a href="#/allVideo?articleType=4&status=0&mainType=0&page=1">被撤视频</a></li>
                        <li><a href="#/newVideo">新视频</a></li>
                    </ul>
                </li>
                 <li class="sub">
                    <a href="javascript:;">
                        <i class="fa fa-database"></i> 纪录片管理
                        <div class="pull-right"><span class="caret"></span></div>
                    </a>
                    <ul class="templatemo-submenu">
                        <li><a href="#/allDocumentary?articleType=5&status=1&mainType=0&page=1">所有纪录片</a></li>
                         
                           <li></li>
                        <li><a href="#/allDocumentary?articleType=5&status=2&mainType=0&page=1">草稿箱</a></li>
                        <li><a href="#/allDocumentary?articleType=5&status=0&mainType=0&page=1">被撤纪录片</a></li>
                        <li><a href="#/newDocumentary">新纪录片</a></li>
                    </ul>
                </li>
               <!--  <li class="sub">
                    <a href="javascript:;">
                        <i class="fa fa-database"></i> 用户管理
                        <div class="pull-right"><span class="caret"></span></div>
                    </a>
                    <ul class="templatemo-submenu">
                        <li><a href="#">所有用户</a></li>
                        <li><a href="#">Pellentesque</a></li>
                        <li><a href="#">Congue</a></li>
                        <li><a href="#">Interdum</a></li>
                        <li><a href="#">Facilisi</a></li>
                    </ul>
                </li> -->
                <li class="sub">
                    <a href="#/about">
                        <i class="fa fa-cubes"></i>
                        使用说明
                    </a>
                </li>
                <li class="sub">
                    <a href="#/about">
                        <i class="fa fa-cubes"></i>
                        多说评论
                    </a>
                </li>
                <li class="sub">
                    <a href="#/newPassword">
                        <i class="fa fa-cubes"></i>
                        更改密码
                    </a>
                </li> 
                <li class="sub">
                    <a href="/admin.php?c=login&a=signout">
                       
                        退出
                    </a>
                </li>
                <!-- <li><a href="#/newArticle"><i class="fa fa-map-marker"></i><span class="badge pull-right">42</span>发布</a></li>
                <li><a href="tables.html"><i class="fa fa-users"></i><span class="badge pull-right">NEW</span>Manage Users</a></li>
                <li><a href="preferences.html"><i class="fa fa-cog"></i>Preferences</a></li>
                <li><a href="javascript:;" data-toggle="modal" data-target="#confirmModal"><i class="fa fa-sign-out"></i>Sign Out</a></li> -->
            </ul>
        </div>
        <div ng-view></div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">注销登录</h4>
                </div>
                <div class="modal-footer">
                    <a href="admin.php?c=login&a=signout" class="btn btn-primary">Yes</a>
                    <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
 <!--    <footer class="templatemo-footer">
        <div class="templatemo-copyright">
            <p>Copyright &copy; 2016 科普网</p>
        </div>
    </footer> -->
    </div>
    <script src="/public2/js/jquery.min.js"></script>
    <script src="/public2/js/bootstrap.min.js"></script>
    <script src="/public2/js/Chart.min.js"></script>
    <script src="/public2/js/templatemo_script.js"></script>
    <script src="/public2/js/angular.js"></script>
    <script src="/public2/js/angular.route.min.js"></script>
    <script src="/public2/js/jquery.page.js"></script>
    <script src="/public2/js/index.js"></script>
    <script type="text/javascript">
    // Line chart
    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100)
    };
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }]

    }

    // window.onload = function() {
    //     var ctx_line = 
    //     document.getElementById("templatemo-line-chart").getContext("2d");
    //     window.myLine = new Chart(ctx_line).Line(lineChartData, {
    //         responsive: true
    //     });
    // };

    $('#myTab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('#loading-example-btn').click(function() {
        var btn = $(this);
        btn.button('loading');
        // $.ajax(...).always(function () {
        //   btn.button('reset');
        // });
    });
    </script>
</body>

</html>