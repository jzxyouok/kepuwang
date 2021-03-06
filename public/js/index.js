! function(angular, window, b) {
    var app = angular.module('myApp', ['ngRoute']);
    // 导航栏指令
    var base_url = "http://boomler.wang/";

    function toggleDuoshuoComments(id, url, title, abstract) {
        var el = document.createElement('div'); //该div不需要设置class="ds-thread"
        el.setAttribute('data-thread-key', id); //必选参数
        el.setAttribute('data-url', url); //必选参数
        DUOSHUO.EmbedThread(el);
        // DUOSHUO.initSelector('.ds-share',{type:'ShareWidget'});
        jQuery("#duoshuo-comment").append(el);

        var share_code = '<div class="ds-share flat" id="ds-share" data-thread-key="此处请替换为当前文章的thread-key" data-title="此处请替换为分享时显示的标题" data-images="此处请替换为分享时显示的图片的链接地址" data-content="此处请替换为分享时显示的内容" data-url="此处请替换为分享时显示的链接地址"><div class="ds-share-inline"><ul class="ds-share-icons-16"><li data-toggle="ds-share-icons-more"><a class="ds-more" href="javascript:void(0);">分享到：</a></li><li><a class="ds-weibo" href="javascript:void(0);" data-service="weibo">微博</a></li><li><a class="ds-qzone" href="javascript:void(0);" data-service="qzone">QQ空间</a></li><li><a class="ds-qqt" href="javascript:void(0);" data-service="qqt">腾讯微博</a></li><li><a class="ds-wechat" href="javascript:void(0);" data-service="wechat">微信</a></li></ul><div class="ds-share-icons-more"></div></div></div>';
        var share_el = $(share_code);
        share_el.attr('data-thread-key', id);
        share_el.attr('data-url', url);
        share_el.attr('data-content', abstract);
        share_el.attr('data-title', title);
        $("#duoshuo-share").append(share_el);
        // document.getElementById("ds-share").setAttribute('data-thread-key', id);
        // document.getElementById("ds-share").setAttribute('data-url', url);
        // document.getElementById("ds-share").setAttribute('data-content', abstract);

        // document.getElementById("ds-share").setAttribute('data-title', title);

    }

    app.filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    app.filter('cutTimeStr', function() {
        return function(timeStr) {
            console.log(timeStr)
            if (typeof timeStr === "string")
                return timeStr.slice(0, 10);
            return "";
        };
    });

    app.service("util", function() {
        return {
            localTime: function(timestamp) {
                return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ').slice(0, 10);
            }
        }
    })


    app.directive("navbar", function() {
        return {
            restrict: "E",
            templateUrl: '/public/template/nav.html',
            controller: "searchController",
            replace: true
        }
    });
    //     app.directive('repeatDone', function() {
    //     return {
    //         link: function(scope, element, attrs) {
    //             if (scope.$last) {                   // 这个判断意味着最后一个 OK
    //                 scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
    //             }
    //         }
    //     }
    // })

    app.directive('embedSrc', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var current = element;
                scope.$watch(function() {
                    return attrs.embedSrc;
                }, function() {
                    var clone = element
                        .clone()
                        .attr('src', attrs.embedSrc);
                    current.replaceWith(clone);
                    current = clone;
                });
            }
        };
    });
    app.service("pageSet", function() {
        return {
            init: function(pages, callback) {
                $(".tcdPageCode").createPage({
                    pageCount: pages,
                    current: 1,
                    backFn: function(p) {
                        callback(p);
                    }
                });
            },

        }

    });
    app.directive("comment", function() {
        return {
            restrict: 'A',
            link: function(scope) {
                var duoshuo = scope.duoshuo;
                var data_thread_key = 'article_' + duoshuo.id;
                var data_url = duoshuo.url;
                // var data_author_key = base_url + duoshuo.url + duoshuo.id;

                // dynamic load the duoshuo comment box
                var el = document.createElement('div'); //该div不需要设置class="ds-thread"
                el.setAttribute('data-thread-key', data_thread_key); //必选参数
                el.setAttribute('data-url', data_url); //必选参数
                // el.setAttribute('data-author-key', data_author_key);//可选参数
                console.log(DUOSHUO)
                DUOSHUO.EmbedThread(el);
                jQuery('#comment-box').append(el);


            }
        };
    });

    app.directive("foot", function() {
        return {
            restrict: "E",
            templateUrl: '/public/template/footer.html',
            // controller: 'navUserController',
            replace: true
        }
    });

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/index", {
            templateUrl: "/public/template/indexTpl.html",
            controller: "indexController"
        })

        .when("/video", {
                templateUrl: "/public/template/videoTpl.html",
                controller: "videoController"
            })
            .when("/videoDetail/:id", {
                templateUrl: "/public/template/videoDetailTpl.html",
                controller: "videoDetailController"
            })
            .when("/image", {
                templateUrl: "/public/template/imageTpl.html",
                controller: "allPicController"
            })
            .when("/imageDetail/:id", {
                templateUrl: "/public/template/imageDetailTpl.html",
                controller: "imageDetailController"
            })
            .when("/documentary", {
                templateUrl: "/public/template/documentary.html",
                controller: "allDocumentaryController"
            })
            .when("/documentaryDetail/:id/:set", {
                templateUrl: "/public/template/documentaryDetail.html",
                controller: "documentaryDetailController"
            })
            .when("/article", {
                templateUrl: "/public/template/articleTpl.html",
                controller: "articleListController"
            })
            .when("/articleDetail/:id", {
                templateUrl: "/public/template/articleDetailTpl.html",
                controller: "articleDetailController"
            })
            .when("/searchResult", {
                templateUrl: "/public/template/searchResultTpl.html",
                controller: "searchResultController"
            })
            .otherwise({ redirectTo: "/index" });

    }]);
    app.controller("searchController", function($scope, $http, $route) {

        $scope.search = function(key) {
                location.href = "#/searchResult?search=" + key;
            }
            //轮播栏目
        $http({
            url: "/index.php?c=index&a=slideArticle",
            method: "get"
        }).success(function(response) {
            $scope.slideArticle = response;
        });

    });
    app.controller("searchResultController", function($rootScope,$scope, $http, $route, pageSet) {
        
        $rootScope.showSlider = true;
        var search = $route.current.params.search;
        // $scope.heightlight = function(){
        //     $("#result").highlight(search);
        // }
        $http({
            url: "/index.php?c=search&a=search&search=" + search,
            method: "get"
        }).success(function(response) {
            $scope.searchResult = response.slice(0, 15);

            pageSet.init(Math.ceil(response.length / 15), function(page) {
                console.log(response.slice((page - 1) * 15, page * 15))
                $scope.searchResult = response.slice((page - 1) * 15, page * 15);
                $scope.$apply();
            });


        });
    });
    app.controller("documentaryDetailController", function($rootScope, $scope, $http, $route, $sce) {

        $rootScope.showSlider = false;
        var id = $route.current.params.id;
        $scope.id = id;
        var set = $route.current.params.set;
        // 纪录片的详细信息
        $http({
                url: "/admin.php?c=documentary&a=documentaryDetail&id=" + id,
                method: "get"
            }).success(function(response) {
                $scope.documentaryDetail = response;
 
                $scope.documentaryDetail.maincontent = $sce.trustAsHtml($scope.documentaryDetail.maincontent);
                $scope.documentaryDetail.content = $sce.trustAsHtml($scope.documentaryDetail.content);
         })
            // 本集的详细信息

        $http({
            url: "/index.php?c=documentary&a=setDetail&id=" + id + "&set=" + set,
            method: "get",
        }).success(function(response) {
            $scope.setDetail = response;
            document.title = $scope.setDetail.title;
            $scope.setDetail.content = $sce.trustAsHtml($scope.setDetail.content);
        });
    });
    app.controller("allDocumentaryController", function($rootScope,$scope, $http, $route, $sce, pageSet) {
        $rootScope.showSlider = true;
        document.title = "纪录片";
        $http({
            url: "/index.php?c=documentary&a=allDocumentary&page=1",
            method: "get"
        }).success(function(response) {
            $scope.documentarys = response.data;
            var len = $scope.documentarys.length;
            pageSet.init(Math.ceil(response.num / 15), selectPage);

            function selectPage(page) {
                $http({
                    url: "/index.php?c=documentary&a=allDocumentary&page=" + page,
                    method: "get"
                }).success(function(response) {
                    $scope.documentarys = response.data;
                })
            }
        });
    });

    app.controller("articleDetailController", function($rootScope, $scope, $http, $route, $sce) {
        $rootScope.showSlider = false;
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/article";

        $http({
            url: "/index.php?c=article&a=articleDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.articleDetail = response;
            $scope.articleDetail.detail.content = $sce.trustAsHtml($scope.articleDetail.detail.content);
            toggleDuoshuoComments(id, base_url + "#/articleDetail/" + id, $scope.articleDetail.detail.title, $scope.articleDetail.detail.abstract, $scope.articleDetail.detail.thumbnail)
        });
        $http({
            url: "/admin.php?c=relation&a=allRelative&articleType=1&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.finalRelative = response;
        })
    });
    app.controller("imageDetailController", function($rootScope, $scope, $http, $route, $sce) {
        $rootScope.showSlider = false;

        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/image";
        $http({
            url: "/index.php?c=pic&a=picDetail&id=" + id,
            method: "get"
        }).success(function(response) {

            $scope.imgDetail = response;
            document.title = $scope.imgDetail.title;
            $scope.imgDetail.content = $sce.trustAsHtml($scope.imgDetail.content);
            $scope.imgDetail.maincontent = $sce.trustAsHtml($scope.imgDetail.maincontent);
            toggleDuoshuoComments(id, base_url + "#/imageDetail/" + id, $scope.imgDetail.title, $scope.imgDetail.abstract, $scope.imgDetail.thumbnail);

        });
        $http({
            url: "/admin.php?c=relation&a=allRelative&articleType=2&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.finalRelative = response.slice(0, 5);
        })
        $scope.like = function() {
            var liked = localStorage.getItem("pid" + id) === "1";

            if (liked) {
                console.log(liked + "`````false")
                localStorage.setItem("pid" + id, "0");
                $scope.imgDetail.likes--;
            } else {
                console.log(liked + "`````true")
                localStorage.setItem("pid" + id, "1");
                $scope.imgDetail.likes++;
            }

            $http({
                url: "/index.php?c=pic&a=like&id=" + id + "&liked=" + liked,
                method: "get"
            }).success(function(response) {


            })
        }
    })

    app.controller("videoDetailController", function($rootScope, $scope, $http, $route, $sce) {
        $rootScope.showSlider = false;
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/video";
        $http({
            url: "/index.php?c=video&a=videoDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.videoDetail = response;
            document.title = $scope.videoDetail.title;
            if (!$scope.videoDetail.attachment.length)
                $scope.noDownload = true;
            $scope.videoDetail.content = $sce.trustAsHtml($scope.videoDetail.content);

            toggleDuoshuoComments(id, base_url + "#/videoDetail/" + id, $scope.videoDetail.title, $scope.videoDetail.abstract, $scope.videoDetail.thumbnail);
        });
        $http({
            url: "/admin.php?c=relation&a=allRelative&articleType=4&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.finalRelative = response.slice(0, 5);
        })
    });
    app.controller("indexController", function($rootScope,$scope, $http) {
        $rootScope.showSlider = true;
        $http({
            method: "get",
            url: "/index.php?c=index&a=indexContent",
        }).success(function(response) {
            $scope.title = response.title;
            $scope.content = response.content;
            $scope.pics = response.pics;
            $scope.mainVideo = response.videos[0];
            $scope.topRightVideo1 = response.videos.slice(1, 3);
            $scope.topRightVideo2 = response.videos.slice(3, 5);
            $scope.bottomVideo = response.videos.slice(5, 9);
            $scope.hotArticle = response.hotArticle;
            $scope.recommandArticleWithPic = response.recommandArticle.slice(0, 4);
            $scope.recommandArticleNoPic = response.recommandArticle.slice(5, 13);



        })
    });
    app.controller("allPicController", function($rootScope, $scope, $http, pageSet) {
        document.title = "所有图片";
        $rootScope.showSlider = true;
        $http({
            method: "get",
            url: "/index.php?c=pic&a=allPic&page=1",
        }).success(function(response) {
            $scope.num = response.num;

            pageSet.init(Math.ceil($scope.num / 24), picByPage);
        });
        picByPage(1);

        function picByPage(page) {
            $http({
                method: "get",
                url: "/index.php?c=pic&a=allPic&page=" + page,
            }).success(function(response) {
                $scope.num = response.num;
                initPics(response.data)
            });
        }


        function initPics(data) {
            $scope.pics = data;
            var etraData = $scope.pics.length % 3;
            var jiange = parseInt($scope.pics.length / 3);
            console.log(jiange)

            switch (etraData) {
                case 0:
                    $scope.picsLeft = $scope.pics.slice(0, jiange);
                    $scope.picsMiddle = $scope.pics.slice(jiange, jiange * 2);
                    $scope.picsRight = $scope.pics.slice(jiange * 2, jiange * 3);
                    break;
                case 1:
                    $scope.picsLeft = $scope.pics.slice(0, jiange + 1);
                    $scope.picsMiddle = $scope.pics.slice(jiange + 1, jiange * 2 + 1);
                    $scope.picsRight = $scope.pics.slice(jiange * 2 + 1, jiange * 3 + 1);
                    break;

                case 2:
                    $scope.picsLeft = $scope.pics.slice(0, jiange + 1);
                    $scope.picsMiddle = $scope.pics.slice(jiange + 1, jiange * 2 + 2);
                    $scope.picsRight = $scope.pics.slice(jiange * 2 + 2, jiange * 3 + 2);
                    break;
            }
        }



    });

    app.controller("articleListController", function($rootScope, $http, $scope, pageSet, util, $route) {
        $rootScope.showSlider = true;

        var maintype = $route.current.params.mainType;
        console.log(maintype);
        var query = "";
        if (maintype) {
            query = "&maintype=" + maintype;
        }
        $http({
            method: "get",
            url: "/index.php?c=article&a=allArticle&page=1" + query,
        }).success(function(response) {
            $scope.num = response.num;
            pageSet.init(Math.ceil($scope.num / 32), articleByPage);
            $("#article-list1").empty();
            $("#article-list2").empty();
            $("#article-list3").empty();
            $("#article-list4").empty();
            for (var len = response.data.length, i = 0; i < len; i++) {
                var newArticle = '<div class="thumbnail article-thumbnail"><div class="caption-change"><a href="#articleDetail/' + response.data[i].id + '"><h4>' + response.data[i].title +
                    '</h4></a><p>' + response.data[i].publishtime.slice(0, 16) +
                    '</p></div><img src="' + response.data[i].thumbnail +
                    '" alt=""><div class="caption"><p>' + response.data[i].abstract +
                    '</p></div></div>';

                $("#article-list" + (i % 4 + 1)).append(newArticle);

            }
            // $scope.articles = response.data;
        });

        function articleByPage(page) {
            $http({
                method: "get",
                url: "/index.php?c=article&a=allArticle&page=" + page + query,
            }).success(function(response) {
                $("#article-list1").empty();
                $("#article-list2").empty();
                $("#article-list3").empty();
                $("#article-list4").empty();

                for (var len = response.data.length, i = 0; i < len; i++) {
                    var newArticle = '<div class="thumbnail article-thumbnail"><div class="caption-change"><a href="#articleDetail/' + response.data[i].id + '"><h4>' + response.data[i].title +
                        '</h4></a><p>' + response.data[i].publishtime.slice(0, 16) +
                        '</p></div><img src="' + response.data[i].thumbnail +
                        '" alt=""><div class="caption"><p>' + response.data[i].abstract +
                        '</p></div></div>';

                    $("#article-list" + (i % 4 + 1)).append(newArticle);

                }
            });
        }
    });
    app.controller("videoController", function($rootScope, $http, $scope, pageSet, $route) {
        $rootScope.showSlider = true;
        var maintype = $route.current.params.mainType;
        var query = "";
        if (maintype) {
            query = "&maintype=" + maintype;
        }
        $http({
            method: "get",
            url: "/index.php?c=video&a=allVideo&page=1" + query,
        }).success(function(response) {
            $scope.num = response.num;
            pageSet.init(Math.ceil($scope.num / 40), picByPage);
            $scope.videos = response.data;
        });


        function picByPage(page) {
            $http({
                method: "get",
                url: "/index.php?c=video&a=allVideo&page=" + page + query,
            }).success(function(response) {
                $scope.videos = response.data;
            });
        }


    })

}(angular, window);
