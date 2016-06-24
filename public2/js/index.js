! function(angular, window, b) {
    var app = angular.module('myapp', ['ngRoute']);
    // 导航栏指令
    var transform = function(data) {
        return $.param(data);
    }
    app.filter('cut', function() {
        var filter = function(input) {
            if (typeof input != "string")
                return "无正文~~";
            return input.slice(0, 50) + '...';
        };
        return filter;
    });
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
                        if (p <= pages)
                            callback(p);
                    }
                });
            },

        }

    })

    app.service("relation", function($http) {
        return {
            //查找相关文章
            init: function(type, id, callback) {
                $http({
                    url: "/admin.php?c=relation&a=allRelative&articleType=" + type + "&id=" + id,
                    mthod: "get"
                }).success(function(response) {
                    callback(response);

                })

            },
            // 添加相关文章
            addRelative: function(aid, rid, type, callback) {
                $http({
                    url: "/admin.php?c=relation&a=addRelative&articleType=" + type + "&rid=" + rid + "&aid=" + aid,
                    method: "get"
                }).success(function(response) {
                    if (response == "0") alert("编号不存在！！")
                    else {
                        callback({ id: response.id, "title": response.title });
                    }

                })


            },
            delRelative: function(aid, rid, type) {
                $http({
                    url: "/admin.php?c=relation&a=delRelative&articleType=" + type + "&rid=" + rid + "&aid=" + aid,
                    method: "post"
                }).success(function(response) {
                    // do something
                });
            }

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
                controller: "allArticleController"
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
                controller: "allArticleController"
            })
            .when("/documentarySet/:id", {
                templateUrl: "/public2/template/documentarySets.html",
                controller: "documentarySetController"
            })

        .when("/newContent", {
                templateUrl: "/public2/template/newContentTpl.html",
                controller: "newContentController"
            })
            .when("/newPassword", {
                templateUrl: "/public2/template/passwordTpl.html",
                controller: "newPasswordController"
            })
            .when("/relative/:articleType/:id", {
                templateUrl: "/public2/template/relativeTpl.html",
                controller: "relativeController"
            })

        .when("/about", {
                templateUrl: "public2/template/about.html",
            })
            .otherwise({ redirectTo: "/index" });
    }]);

    app.controller('newPasswordController', function($scope, $http, $route) {
        $scope.user = {
            name: "",
            password: "",
            password1: "",
            changePd: function() {
                if ($scope.user.password !== $scope.user.password1) {
                    alert("两次密码输入不一致！");
                } else {
                    if ($scope.user.password.length < 6 || $scope.user.password.length > 12) {
                        alert("密码长度必须6-12位！！");
                    } else {

                        $http({
                            url: "/admin.php?c=login&a=changePd",
                            method: "post",
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            transformRequest: transform,
                            data:{
                                newPwd:$scope.user.password
                            }
                        }).success(function(response) {
                            alert("更改成功！")
                        })
                    }
                }
            }
        }
    })

    app.controller('relativeController', function($scope, $http, $route) {
        var id = $route.current.params.id;
        var articleType = $route.current.params.articleType;
        $scope.relative = [];
        $http({
            url: "/admin.php?c=relation&a=allRelative&articleType=" + articleType + "&id=" + id,
            mthod: "get"
        }).success(function(response) {
            $scope.relative = response;

        })
        $scope.addRelative = function() {
            $http({
                url: "/admin.php?c=relation&a=addRelative&articleType=" + articleType + "&rid=" + $scope.articleId + "&aid=" + id,
                method: "get"
            }).success(function(response) {
                if (response == "0") alert("编号不存在！！")
                else {
                    $scope.relative.push({ id: response.id, "title": response.title });
                }

            })


        };
        $scope.delRelative = function(rid, index) {
            $http({
                url: "/admin.php?c=relation&a=delRelative&articleType=" + articleType + "&rid=" + rid + "&aid=" + id,
                method: "post",

            }).success(function(response) {
                // do something
                $scope.relative.splice(index, 1);
            });
        }



    });

    app.controller('documentarySetController', function($scope, $http, $route, $sce) {
        var id = $route.current.params.id;
        $http({
            url: "/admin.php?c=documentary&a=setDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.allSets = response;
            for (var i = 0, len = $scope.allSets.length; i < len; i++) {
                $scope.allSets[i].content = $sce.trustAsHtml($scope.allSets[i].content);
                $scope.currentDocumentary = id;
            }
        });



    })
    app.controller('allDocumentaryController', function($scope, $http, $route, pageSet) {
        var status = $route.current.params.status || 1;
        $http({
            url: "/index.php?c=documentary&a=allDocumentary&page=1&status=" + status,
            method: "get"
        }).success(function(response) {
            $scope.allArticle = response.data;
            pageSet.init(Math.ceil(response.num / 10), selectPage);

            function selectPage(page) {
                $http({
                    url: "/index.php?c=documentary&a=allDocumentary&page=" + page,
                    method: "get"
                }).success(function(response) {
                    $scope.documentarys = response.data;
                })
            }

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
        $scope.documentary.sets = [{ title: "", code: "" }];
        if (Id) {
            $http({
                url: "/admin.php?c=documentary&a=documentaryDetail&id=" + Id,
                method: "get",
            }).success(function(response) {

                $scope.documentary = response;
                UE.getEditor('editor2').setContent($scope.documentary.maincontent || "", false);
                $http({
                    url: "admin.php?c=documentary&a=setDetail&id=" + Id,
                    method: "get"
                }).success(function(response) {
                    $scope.documentary.sets = response;
                    if (!$scope.documentary.sets.length) {

                        $scope.documentary.sets = [{ title: "", code: "" }];
                    }
                })

            });
        }


        $scope.addSet = function() {
            console.log($scope.documentary.sets.length);
            $scope.documentary.sets.push({ title: "", code: "" });

        }
        $scope.delSet = function(index, setId) {
            if (confirm("确定删除第" + (index + 1) + "集？")) {
                $scope.documentary.sets.splice(index, 1);
                $http({
                    method: "get",
                    url: "/admin.php?c=documentary&a=delSet&id=" + setId
                }).success(function() {});
            }

        }
        $scope.save = function(type) {
            var len = $scope.documentary.sets.length;
            var sets = [];
            for (var i = 0; i < len; i++) {
                sets.push({
                    title: $scope.documentary.sets[i].title,
                    code: $scope.documentary.sets[i].code,
                    id: $scope.documentary.sets[i].id || 0,
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
                alert("保存成功！");

                // if (type == 1) {
                //     alert("保存成功");
                // } else {
                //     location.href = "#/newContent?articleType=5&id=" + response;
                // }

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
            $scope.upImage = function() {
                console.log("beinghrere")
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            };
        });
    });
    app.controller('editArticleController', function($scope, $http, $route, relation) {
        // 得到之前数据
        var articleId = $route.current.params.id;
        $scope.article = { detail: {} };

        $http({
            url: "/admin.php?c=article&a=editArticle&articleType=1&id=" + articleId,
            method: "get",
        }).success(function(response) {
            $scope.article.detail = response[articleId];
            // console.log($scope.article);

            // 相关文章
            $scope.relative = [];

            relation.init(1, articleId, bindRel);

            function bindRel(data) {
                $scope.relative = data;
            }
            $scope.delRelative = function(index) {
                relation.delRelative(articleId, $scope.relative[index].id, 1);
                $scope.relative.splice(index, 1);

            }

            $scope.addRelative = function() {

                relation.addRelative(articleId, $scope.articleId, 1, bindAdded);

                function bindAdded(data) {
                    if (!$scope.relative) $scope.relative = [];
                    $scope.relative.push(data);
                }
            }
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
                    author: $scope.article.detail.author,


                }
            }).success(function(response) {
                alert("保存成功");
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
    app.controller("allArticleController", function($http, $route, $scope, $location, pageSet) {
        $scope.mainType = $route.current.params.mainType;
        var articleType = $route.current.params.articleType;
        var status = $route.current.params.status;
        var page = $route.current.params.page;
        var query = "";
        $scope.query = "";

        $scope.mainType = 0;
        var What = ""
        switch (articleType) {
            case "1":
                what = "文章";
                break;
            case "2":
                what = "图片";
                break;
            case "4":
                what = "视频";
                break;
        }

        $scope.queryArticle = function(isQuery) {

            if ($scope.query && isQuery) { query = "&name=" + $scope.query; }
            $http({
                url: "/admin.php?c=util&a=getAll&articleType=" + articleType + "&status=" + status + "&mainType=" + $scope.mainType + "&page=" + page + query,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.data;
                pageSet.init((Math.ceil(response.num / 10)), handlePageChange);

            });
        }

        function handlePageChange(page) {
            $http({
                url: "/admin.php?c=util&a=getAll&articleType=1&status=" + status + "&mainType=" + $scope.mainType + "&page=" + page + query,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.data;
            });
        }
        $scope.queryArticle();
        $scope.changeStatus = function(id, status) {
            var message = "确定" + status == "0" ? "恢复" : "撤销" + "这篇" + what + "？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&articleType=1&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.changePosition = function(id, position) {
            if (confirm("确定调整此" + what + "位置？")) {
                console.log(id + position)
                $http({
                    url: "/admin.php?c=article&a=changePosition&articleType=" + articleType + "&id=" + id + "&position=" + position,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }

        }

        $scope.chagePriority = function(id, priority) {
            $http({
                method: "POST",
                url: "/admin.php?c=util&a=changePriority",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: transform,
                data: {
                    articleType: articleType,
                    id: id,
                    priority,
                }
            }).success(function() {});

        }
        $scope.publish = function(id, status) {

            var message = "确定发布这篇" + what + "？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=publish&articleType=" + articleType + "&id=" + id,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.changeArticleType = function(id, mainType) {
            if (confirm("确定更换此" + what + "类别？")) {
                $http({
                    url: "/admin.php?c=article&a=changeArticleMainType&articleType=" + articleType + "&id=" + id + "&mainType=" + mainType,
                    method: "get"
                }).success(function(response) {
                    // location.reload(true);
                });
            }
        }
    });
    app.controller("newPicController", function($scope, $route, $http) {
        var picId = $route.current.params.id;
        var currentFile; //标识正在操作哪一个附件
        $scope.showSavebuttom = !!picId;
        $scope.newPic = {};
        $scope.attachment = [{ name: "", url: "" }];
        if (picId !== undefined) {
            $http({
                url: "/admin.php?c=pic&a=picDetail&id=" + picId,
                method: "get",
            }).success(function(response) {
                $scope.newPic = response;
                $scope.attachment = response.attachment;
                if (!$scope.attachment.length)
                    $scope.attachment = [{ name: "", url: "" }];
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
                $scope.$apply(function() {

                    $scope.attachment[currentFile].url = arg.url;
                });
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
                        mainContent: UE.getEditor('editor2').getContent(), //图片的简要信息【图片详情页右侧内容】
                        attachment: JSON.stringify($scope.attachment)
                    }
                }).success(function(response) {

                    if (isRedirect === 1)
                        location.href = "#/newContent?articleType=2&id=" + response;
                    else {
                        alert("保存成功");
                    }
                });


            },

            upFiles: function(index) {
                currentFile = index;
                var myFiles = o_ueditorupload.getDialog("attachment");
                myFiles.open();
            },
            upImage: function(type) {
                $scope.imgType = type; //标志插入的是缩略图还是原图片
                var myImage = o_ueditorupload.getDialog("insertimage");
                myImage.open();
            },
            addAttachment: function() {
                console.log("asasa")
                $scope.attachment.push({ name: "", url: "" })
            },
            delAttachment: function(index) {
                console.log("asasa")
                $scope.attachment.splice(index, 1)
                if ($scope.attachment.length == 0) {
                    $scope.attachment = [{ name: "", url: "" }];
                }
            }

        }

    });
    app.controller("newVideoController", function($scope, $http, $route, relation) {
        var videoId = $route.current.params.id;
        $scope.showSave = !!videoId;
        $scope.newVideo = {};
        $scope.attachment = [{ name: "", url: "" }];
        if (videoId !== undefined) {
            $http({
                url: "/admin.php?c=video&a=videoDetail&id=" + videoId,
                method: "get",
            }).success(function(response) {

                $scope.newVideo = response;

                $scope.attachment = response.attachment;
                if (!$scope.attachment.length)
                    $scope.attachment = [{ name: "", url: "" }];

            })

        }

        $scope.relative = [];

        relation.init(4, videoId, bindRel);

        function bindRel(data) {
            $scope.relative = data;
        }
        $scope.delRelative = function(index) {
            relation.delRelative(videoId, $scope.relative[index].id, 4);
            $scope.relative.splice(index, 1);

        }

        $scope.addRelative = function() {

            relation.addRelative(videoId, $scope.articleId, 1, bindAdded);

            function bindAdded(data) {
                if (!$scope.relative) $scope.relative = [];
                $scope.relative.push(data);
            }
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
                        thumbnail_url: $scope.thumbnail || $scope.newVideo.thumbnail,
                        mainType: $scope.newVideo.maintype,
                        type: $scope.newVideo.type,
                        abstract: $scope.newVideo.abstract,
                        videoCode: $scope.newVideo.videocode,
                        attachment: JSON.stringify($scope.attachment),
                        id: videoId,
                    }
                }).success(function(response) {
                    if (type == 0) {
                        alert("保存成功");
                    } else {
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

            },
            addAttachment: function() {
                console.log("asasa")
                $scope.attachment.push({ name: "", url: "" })
            },
            delAttachment: function(index) {
                console.log("asasa")
                $scope.attachment.splice(index, 1)
                if ($scope.attachment.length == 0)
                    $scope.attachment = [{ name: "", url: "" }];

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
            o_ueditorupload.addListener('afterUpfile', function(t, arg) {
                $scope.files = arg[0].url;
                console.log($scope.files)
            });
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
                        abstract: $scope.newArticle.abstract,
                        author: $scope.newArticle.author,

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
    app.controller("allPicController", function($scope, $http, $route, pageSet) {
        $scope.mainType = $route.current.params.mainType;
        var status = $route.current.params.status;
        var page = $route.current.params.page;
        var query = "";
        $scope.query = "";

        $scope.mainType = 0;

        $scope.queryArticle = function(isQuery) {

            if ($scope.query && isQuery) { query = "&name=" + $scope.query; }
            $http({
                url: "/admin.php?c=util&a=getAll&articleType=2&status=" + status + "&mainType=" + $scope.mainType + "&page=" + page + query,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.data;
                document.getElementById("clearContent").innerHTML = "";
                pageSet.init((Math.ceil(response.num / 10)), handlePageChange);

            });
        }

        function handlePageChange(page) {
            $http({
                url: "/admin.php?c=util&a=getAll&articleType=2&status=" + status + "&mainType=" + $scope.mainType + "&page=" + page + query,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.data;
            });
        }
        $scope.queryArticle();
        $scope.changeStatus = function(id, status) {
            var message = "确定" + status == "0" ? "恢复" : "撤销" + "此图片？";
            if (confirm(message)) {
                $http({
                    url: "/admin.php?c=article&a=changeStatus&articleType=2&id=" + id + "&status=" + status,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }
        }
        $scope.changePosition = function(id, position) {
            if (confirm("确定调整此图片位置？")) {
                console.log(id + position)
                $http({
                    url: "/admin.php?c=article&a=changePosition&articleType=2&id=" + id + "&position=" + position,
                    method: "get"
                }).success(function(response) {
                    location.reload(true);
                });
            }

        }

        $scope.chagePriority = function(id, priority) {
            $http({
                method: "POST",
                url: "/admin.php?c=util&a=changePriority",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: transform,
                data: {
                    articleType: 2,
                    id: id,
                    priority,
                }
            }).success(function() {});

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
        $scope.changeArticleType = function(id, mainType) {
            if (confirm("确定更换此文章类别？")) {
                $http({
                    url: "/admin.php?c=article&a=changeArticleMainType&articleType=1&id=" + id + "&mainType=" + mainType,
                    method: "get"
                }).success(function(response) {
                    // location.reload(true);
                });
            }
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
            pageSet.init(Math.ceil(response.pageNum / 10), handlePageChange);
        });

        function handlePageChange(page) {

            $http({
                url: "/admin.php?c=video&a=allVideo" + queryString + "&page=" + page,
                method: "get"
            }).success(function(response) {
                $scope.allArticle = response.allArticle;
            });
        }
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
