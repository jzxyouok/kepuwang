! function(angular, window, b) {
    var app = angular.module('myapp', ['ngRoute']);
    // 导航栏指令
    var transform = function(data) {
        return $.param(data);
    }
    app.config(function($httpProvider) {
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    });
    app.directive("navbar", function() {
        return {
            restrict: "E",
            templateUrl: '/public2/template/nav.html',
            // controller: 'navUserController',
            replace: true
        }
    });
    // 配置文件信息
    app.factory('config', function() {
        return {
            USERNAME_NOT_EXIST: "用户名错误！",
            USERNAME_WRONG_LNGTH: "用户名长度要在6~12位！",
            USERNAME_WRONG_PATTERN: "用户名仅能包括字母和数字！",
            WRONG_PASSWORD: "密码错误！"
        }
    });
    // 关于用户的服务
    app.service("pageSet", function() {
        return {
            init: function(pages) {
                $(".tcdPageCode").createPage({
                    pageCount: pages,
                    current: 1,
                    backFn: function(p) {
                        console.log(p);
                    }
                });
            },

        }

    })


    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/index", {
                templateUrl: "/public2/template/adminIndexTpl.html",
                // controller: "indexController"
            }).when("/user", {
                templateUrl: "/public2/template/userTpl.html",
                controller: "userController"
            })
            .when("/login", {
                templateUrl: "/public2/template/loginTpl.html",
                controller: "loginController"
            })
            .when("/pic/:id", {
                templateUrl: "/public2/template/imageTpl.html",
                controller: "allPicController"
            }).when("/uploadPic", {
                templateUrl: "/public2/template/uploadPicTpl.html",
                controller: "uploadImageController"
            })
            .when("/video", {
                templateUrl: "/public2/template/videoTpl.html",
            }).when("/newVideo", {
                templateUrl: "/public2/template/newVideo.html",
                controller: "newVideoController"
            })
            .when("/allArticle", {
                templateUrl: "/public2/template/articleTpl.html",
                controller: "allArticleController"
            })
            .when("/newArticle", {
                templateUrl: "/public2/template/newArticle.html",
                controller: "newArticleController"
            })
            .when("/editArticle", {
                templateUrl: "/public2/template/editArticleTpl.html",
                controller: "editArticleController"
            })
            .when("/newContent", {
                templateUrl: "/public2/template/newContentTpl.html",
                controller: "newContentController"
            })
            .otherwise({ redirectTo: "/index" });
    }]);
    app.controller('editArticleController', function($scope, $http, $route) {
        // 得到之前数据
        var articleId = $route.current.params.id;
        $scope.article = { detail: {} };

        $http({
            url: "/admin.php?c=article&a=editArticle&articletype=1&id=" + articleId,
            method: "get",
        }).success(function(response) {
            $scope.article.detail = response[articleId];
            // console.log($scope.article);
        })
        $scope.article.save = function() {
            $http({
                url: "/admin.php?c=article&a=update",
                method: "post",
                data: {
                    id: $scope.article.detail.id,
                    abstract: $scope.article.detail.abstract,
                    maintype: $scope.article.detail.maintype,
                    thumbnail: $scope.article.detail.thumbnail,
                    title: $scope.article.detail.title,
                    type: $scope.article.detail.type,

                }
            }).success(function(response) {
                // window.location.reload(true);
            })
        }
        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });
        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器

            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {

                $scope.article.detail.thumbnail = arg[0].src;
            });
            $scope.article.upFiles = function() {
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            };
            $scope.article.upImage = function() {
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            };
        });

    })
    app.controller("newContentController", function($scope, $http, $route) {
        $scope.article = {
            id: $route.current.params.id,
            articleType:$route.current.params.articletype,
            save: function() {
                $http({
                    url: "admin.php?c=article&a=saveContent&articletype=" + $scope.article.articleType,
                    method: "post",
                    data: {
                        articleType: $route.current.params.articletype,
                        id: $route.current.params.id,
                        content: UE.getEditor('editor').getContent()
                    }
                }).success(function(response) {
                    // 保存成功
                    alert("保存成功");
                })
            },

        }
        $http({
            url: "/admin.php?c=article&a=newContent&id=" + $scope.article.id + "&articletype=" +$scope.article.articleType ,
            method: "get"
        }).success(function(response) {

            $scope.article.title = response.title;
            UE.getEditor('editor').setContent(response.content, false);
        });
    })
    app.controller("allArticleController", function($http, $scope, $location, pageSet) {
        var type = $location.search()['type'] || 0;
        var status = $location.search()['status'] || 1;
        $http({
            url: "/admin.php?c=article&a=allArticle&type=" + type + "&status=" + status,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.allArticle;
            pageSet.init(response.pageNum / 10 + 1);
        });
        $scope.changeStatus = function(id, status) {
            var message = "确定" + status == "0" ? "恢复" : "撤销" + "这篇文章？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.publish = function(id) {
            var message = "确定发布这篇文章？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=publish&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
    });

    app.controller("newVideoController", function($scope, $http) {
        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });
        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器
            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {
                $scope.img_src = arg[0].src;
            });
            // o_ueditorupload.addListener('afterUpfile', function (t, arg)
            // {
            //   $scope.files = arg[0].url;
            // });
        });


        $scope.newVideo = {
            save: function() {
                // var content = UE.getEditor('editor').getContent();
                // var JqueryObject = $(content);
                // 提取附件
                // console.log($(JqueryObject, "img[src^='/attachment']"));
                // console.log(content)

                // console.log(content + "/n" + $scope.newArticle.title);
                $http({
                    method: "POST",
                    url: "/admin.php?c=video&a=newVideo",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: transform,
                    data: {
                        title: $scope.newVideo.title,
                        // content: content,
                        thumbnail_url: $scope.img_src,
                        mainType: $scope.newVideo.mainType,
                        type: $scope.newVideo.type,
                        abstract: $scope.newVideo.abstract,
                        videoCode:$scope.newVideo.videoCode
                    }
                }).success(function(response) {
 
                    location.href = "#/newContent?articletype=4&id=" + response;
                });

            },
            upFiles: function() {
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            },
            upImage: function() {
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            },
            publish: function() {

            }

        }
    });
    app.controller("newArticleController", function($scope, $http) {
        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });
        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器
            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {
                $scope.img_src = arg[0].src;
            });
            // o_ueditorupload.addListener('afterUpfile', function (t, arg)
            // {
            //   $scope.files = arg[0].url;
            // });
        });


        $scope.newArticle = {
            save: function() {
                // var content = UE.getEditor('editor').getContent();
                // var JqueryObject = $(content);
                // 提取附件
                // console.log($(JqueryObject, "img[src^='/attachment']"));
                // console.log(content)

                // console.log(content + "/n" + $scope.newArticle.title);
                $http({
                    method: "POST",
                    url: "/admin.php?c=article&a=newArticle",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: transform,
                    data: {
                        title: $scope.newArticle.title,
                        // content: content,
                        thumbnail_url: $scope.img_src,
                        mainType: $scope.newArticle.mainType,
                        type: $scope.newArticle.type,
                        abstract: $scope.newArticle.abstract
                    }
                }).success(function(response) {
                    // $scope.allPic = response;
                    // console.log(response);
                    location.href = "#/newContent?articletype=1&id=" + response;
                });

            },
            upFiles: function() {
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            },
            upImage: function() {
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            },
            publish: function() {

            }

        }
    });
    app.controller("allPicController", function($scope, $http, $route) {
        $scope.type = $route.current.params.id;

        $http({
            method: "get",
            url: "/admin.php?c=pic&a=allPic&type=" + $scope.type,
        }).success(function(response) {
            $scope.allPic = response;
        });

    });

    app.controller("userController", function($scope, $http, pageSet) {

        $scope.getUser = function(param) {
            $http({
                method: "get",
                url: "/admin.php?c=index&a=allUser" + param,
            }).success(function(response) {
                $scope.allUser = response.allUser;
                $scope.activeNum = response.activeNum;
                $scope.totalNum = response.totalNum;
                pageSet.init($scope.totalNum / 10 + 1);
            });
        };
        $scope.getUser("");
        $scope.searchUser = function() {
            console.log("hahahaha");
            var queryParam = "";
            if ($scope.name != undefined) {
                queryParam = queryParam + "&name=" + $scope.name;
            }
            if ($scope.email != undefined) {
                queryParam = queryParam + "&email=" + $scope.email;
            }
            if ($scope.status != undefined) {
                queryParam = queryParam + "&status=" + $scope.status;
            }
            $scope.getUser(queryParam);
        }
    })

    app.controller("loginController", function($scope, $http) {
        $scope.user = {
            email: "",
            password: "",
            loginCheck: function() {
                $http({
                    method: "POST",
                    url: "/loginCheck",
                    data: {
                        email: $scope.user.email,
                        password: $scope.user.password
                    }
                }).success(function(response) {
                    if (response === "1") {
                        alert("登陆成功！");
                        window.location.href = "#/index";
                    }
                    if (response === "0") alert("密码错误！");
                    if (response === "2") alert("用户名不存在！");
                });
            }
        }

    })

}(angular, window);