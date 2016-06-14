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

    // 关于用户的服务
    app.service("pageSet", function() {
        return {
            init: function(pages, callback) {
                $(".tcdPageCode").createPage({
                    pageCount: pages,
                    current: 1,
                    backFn: function(p) {
                        console.log(p)
                        if(p<= pages)
                        callback(p);
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
            .when("/allPic", {
                templateUrl: "/public2/template/imageTpl.html",
                controller: "allPicController"
            })
            .when("/newPic", {
                templateUrl: "/public2/template/newPic.html",
                controller: "newPicController"
            })
            .when("/editPic", {
                templateUrl: "/public2/template/newPic.html",
                controller: "newPicController"
            })
            .when("/uploadPic", {
                templateUrl: "/public2/template/uploadPicTpl.html",
                controller: "uploadImageController"
            })
            .when("/allVideo", {
                templateUrl: "/public2/template/videoTpl.html",
                controller: "allVideoController"
            })
            .when("/newVideo", {
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
            .when("/newDocumentary", {
                templateUrl: "/public2/template/newDocumentary.html",
                controller: "newDocumentaryController"
            })
            .when("/allDocumentary", {
                templateUrl: "/public2/template/documentary.html",
                controller: "allDocumentaryController"
            })

        .when("/newContent", {
            templateUrl: "/public2/template/newContentTpl.html",
            controller: "newContentController"
        })

        .when("/about", {
                templateUrl: "public2/template/about.html",
            })
            .otherwise({ redirectTo: "/index" });
    }]);

    app.controller('allDocumentaryController', function($scope, $http, $route, pageSet) {
        var status = $route.current.params.status || 1;
        $http({
            url: "/index.php?c=documentary&a=allDocumentary&page=1&status=" + status,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.data;
        });
        $scope.publish = function(id) {
            var message = "确定发布此纪录片？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&articleType=5&a=publish&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }

    })

    app.controller('newDocumentaryController', function($scope, $http, $route) {
        // 得到之前数据
        var Id = $route.current.params.id;
        $scope.showSaveButton = !!Id;
        // 如果是编辑已有
        $scope.documentary = {};
        if (Id) {
            $http({
                url: "/admin.php?c=documentary&a=documentaryDetail&id=" + Id,
                method: "get",
            }).success(function(response) {
                $scope.documentary = response;
                $scope.documentary.sets = $scope.documentary.sets || [];
                $scope.documentary.sets = JSON.parse($scope.documentary.sets);
                UE.getEditor('editor2').setContent($scope.documentary.maincontent || "", false);
            });
        }
        if (!$scope.documentary.sets) {
            console.log("here");
            $scope.documentary.sets = [{ title: "", code: "" }];
        }
        $scope.addSet = function() {
            console.log($scope.documentary.sets.length);
            $scope.documentary.sets.push({ title: "", code: "" });

        }
        $scope.delSet = function(index) {
            if (confirm("确定删除第" + (index + 1) + "集？")) {
                $scope.documentary.sets.splice(index, 1);
            }

        }
        $scope.save = function(type) {
            var len = $scope.documentary.sets.length;
            var sets = [];
            for (var i = 0; i < len; i++) {
                sets.push({
                    title: $scope.documentary.sets[i].title,
                    code: $scope.documentary.sets[i].code,
                });
            }
            $http({
                method: "POST",
                url: "/admin.php?c=documentary&a=newdocumentary",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: transform,
                data: {
                    title: $scope.documentary.title,
                    // content: content,
                    mainContent: UE.getEditor('editor2').getContent(),
                    thumbnail_url: $scope.documentary.thumbnail,
                    abstract: $scope.documentary.abstract,
                    sets: JSON.stringify(sets),
                    id: Id
                }
            }).success(function(response) {
                if (type == 1) {
                    alert("保存成功");
                } else {
                    location.href = "#/newContent?articleType=5&id=" + response;
                }

            });
        }
        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });
        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器

            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {

                $scope.documentary.thumbnail = arg[0].src;
            });
            $scope.documentary.upFiles = function() {
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            };
            $scope.documentary.upImage = function() {
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            };
        });
    });
    app.controller('editArticleController', function($scope, $http, $route) {
        // 得到之前数据
        var articleId = $route.current.params.id;
        $scope.article = { detail: {} };

        $http({
            url: "/admin.php?c=article&a=editArticle&articleType=1&id=" + articleId,
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
                alert("保存成功");
                window.location.reload(true);

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

    });
    app.controller("newContentController", function($scope, $http, $route) {

        $scope.article = {
            id: $route.current.params.id,
            articleType: $route.current.params.articleType,
            save: function() {
                $http({
                    url: "admin.php?c=article&a=saveContent&articleType=" + $scope.article.articleType,
                    method: "post",
                    data: {
                        articleType: $route.current.params.articleType,
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
            url: "/admin.php?c=article&a=newContent&id=" + $scope.article.id + "&articleType=" + $scope.article.articleType,
            method: "get"
        }).success(function(response) {

            $scope.article.title = response.title;
            UE.getEditor('editor').setContent(response.content || "", false);
        });
    });
    app.controller("allArticleController", function($http, $scope, $location, pageSet) {
        var type = $location.search()['type'] || 0;
        $scope.type = type;
        var status = $location.search()['status'] || 1;
        $http({
            url: "/admin.php?c=article&a=allArticle&page=1&type=" + type + "&status=" + status,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.allArticle;
            pageSet.init((Math.ceil(response.pageNum / 10)), handlePageChange);

        });

        function handlePageChange(page) {
      
            $http({
                url: "/admin.php?c=article&a=allArticle&type=" + type + "&status=" + status + "&page=" + page,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.allArticle;
            });
        }
        $scope.changeStatus = function(id, status) {
            var message = "确定" + status == "0" ? "恢复" : "撤销" + "这篇文章？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&articleType=1&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.publish = function(id, status) {

            var message = "确定发布这篇文章？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=publish&articleType=1&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.searchArticle = function() {
            var type = $location.search()['type'] || 0;
            $scope.type = type;
            var status = $location.search()['status'] || 1;
            $http({
                url: "/admin.php?c=article&a=allArticle&type=" + type + "&status=" + $scope.searchStatus + "&name=" + $scope.searchName,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.allArticle;
                pageSet.init(response.pageNum / 10 + 1);
            });

        }
    });
    app.controller("newPicController", function($scope, $route, $http) {
        var picId = $route.current.params.id;
        $scope.showSavebuttom = !!picId;
        $scope.newPic = {};
        if (picId !== undefined) {
            $http({
                url: "/admin.php?c=pic&a=picDetail&id=" + picId,
                method: "get",
            }).success(function(response) {
                $scope.newPic = response;
                UE.getEditor('editor2').setContent(response.maincontent || "", false);

            })

        }

        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });

        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器
            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {
                if ($scope.imgType === 1) {
                    $scope.newPic.img_src = arg[0].src;
                } else {
                    $scope.newPic.thumbnail = arg[0].src;
                }

                console.log(arg);
            });
            o_ueditorupload.addListener('afterUpfile', function(t, arg) {
                console.log("asdssa" + arg[0].url);
                $scope.files = arg[0].url;
                console.log(arg);
            });
        });

        $scope.methods = {
            save: function(isRedirect) {
                console.log("dddd")
                $http({
                    method: "POST",
                    url: "/admin.php?c=pic&a=newPic",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: transform,
                    data: {
                        title: $scope.newPic.title,
                        thumbnail_url: $scope.newPic.thumbnail,
                        img_src: $scope.newPic.img_src,
                        mainType: $scope.newPic.maintype,
                        type: $scope.newPic.type,
                        abstract: $scope.newPic.abstract,
                        id: $scope.newPic.id,
                        mainContent: UE.getEditor('editor2').getContent() //图片的简要信息【图片详情页右侧内容】

                    }
                }).success(function(response) {

                    if (isRedirect === 1)
                        location.href = "#/newContent?articleType=2&id=" + response;
                    else {
                        alert("保存成功");
                    }
                });


            },

            upFiles: function() {
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            },
            upImage: function(type) {
                $scope.imgType = type; //标志插入的是缩略图还是原图片
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            },

        }

    });
    app.controller("newVideoController", function($scope, $http, $route) {
        var videoId = $route.current.params.id;
        $scope.showSave = !!videoId;
        $scope.newVideo = {};
        if (videoId !== undefined) {
            $http({
                url: "/admin.php?c=video&a=videoDetail&id=" + videoId,
                method: "get",
            }).success(function(response) {
                $scope.newVideo = response;

            })

        }


        var o_ueditorupload = UE.getEditor('j_ueditorupload', {
            autoHeightEnabled: false
        });
        o_ueditorupload.ready(function() {
            o_ueditorupload.hide(); //隐藏编辑器
            o_ueditorupload.addListener('beforeInsertImage', function(t, arg) {
                $scope.thumbnail = arg[0].src;
            });
        });


        $scope.methods = {
            save: function(type) {
                $http({
                    method: "POST",
                    url: "/admin.php?c=video&a=newVideo",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: transform,
                    data: {
                        title: $scope.newVideo.title,
                        // content: content,
                        thumbnail_url: $scope.thumbnail,
                        mainType: $scope.newVideo.maintype,
                        type: $scope.newVideo.type,
                        abstract: $scope.newVideo.abstract,
                        videoCode: $scope.newVideo.videocode,
                        id: videoId
                    }
                }).success(function(response) {
                    if(type==0){
                        alert("保存成功");
                    }else{
                          location.href = "#/newContent?articleType=4&id=" + response;
                    }
                  
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
                    location.href = "#/newContent?articleType=1&id=" + response;
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
    app.controller("allPicController", function($scope, $http, $location, pageSet) {
        var queryString = "";
        $scope.type = $location.search()['type'];
        if ($scope.type !== undefined) {
            queryString = "&type=" + $scope.type;
        }
        $scope.status = $location.search()['status'];
        if ($scope.status !== undefined) {
            queryString = "&status=" + $scope.status;
        }
        $http({
            url: "/admin.php?c=pic&a=allPic" + queryString,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.allArticle;
            pageSet.init(Math.ceil(response.pageNum / 10),getPicByPage);
        });
        function getPicByPage(page){
             $http({
            url: "/admin.php?c=pic&a=allPic" + queryString + "&page="+page,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.allArticle;
        });
        }
        $scope.changeStatus = function(id, status) {
            var message = "确定" + status == "0" ? "恢复" : "撤销" + "这张图片？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&articleType=2&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    // location.reload(true);
                });
            }
        }
        $scope.publish = function(id) {
            var message = "确定发布此图片？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&articleType=2&a=publish&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
    });
    app.controller("allVideoController", function($scope, $http, $location, pageSet) {
        var queryString = "";
        $scope.type = $location.search()['type'];
        if ($scope.type !== undefined) {
            queryString = "&type=" + $scope.type;
        }
        $scope.status = $location.search()['status'];
        if ($scope.status !== undefined) {
            queryString = "&status=" + $scope.status;
        }
        $http({
            url: "/admin.php?c=video&a=allVideo" + queryString,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.allArticle;
            pageSet.init(Math.ceil(response.pageNum / 10));
        });
        $scope.changeStatus = function(id, status) {

            var message = "确定" + (status == "0" ? "恢复" : "撤销") + "此视频？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&articleType=4&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }

        $scope.publish = function(id) {
            var message = "确定发布此视频？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&articleType=4&a=publish&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
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
