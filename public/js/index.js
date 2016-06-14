! function(angular, window, b) {
    var app = angular.module('myApp', ['ngRoute']);
    // 导航栏指令
    app.filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

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
            controller: 'loginController',
            replace: true
        }
    });
    app.directive('embedSrc', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var current = element;
                scope.$watch(function() {
                    return attrs.embedSrc; }, function() {
                    var clone = element
                        .clone()
                        .attr('src', attrs.embedSrc);
                    current.replaceWith(clone);
                    current = clone;
                });
            }
        };
    })
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

    })

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
            .when("/login", {
                templateUrl: "/public/template/loginTpl.html",
                controller: "loginController"
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
            .when("/tieba", {
                templateUrl: "/public/template/tieba.html",
                controller: "loginController"
            })


        .otherwise({ redirectTo: "/index" });

    }]);

    app.controller("documentaryDetailController", function($scope, $http, $route, $sce) {
        var id = $route.current.params.id;
        $scope.id = id;
        var set = $route.current.params.set;

        $http({
            url: "admin.php?c=documentary&a=documentaryDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.documentaryDetail = response;
            var sets = $scope.documentaryDetail.sets.replace(/&quot;/g, "\"") || '[]';
            $scope.documentaryDetail.sets = JSON.parse(sets);
            $scope.documentaryDetail.set = JSON.parse(sets)[set];

            $scope.documentaryDetail.maincontent = $sce.trustAsHtml($scope.documentaryDetail.maincontent);
            $scope.documentaryDetail.content = $sce.trustAsHtml($scope.documentaryDetail.content);

            console.log($scope.documentaryDetail.set)
            console.log(response);
        })
    });
    app.controller("allDocumentaryController", function($scope, $http, $route, $sce) {
        $http({
            url: "index.php?c=documentary&a=allDocumentary&page=1",
            method: "get"
        }).success(function(response) {
            $scope.documentarys = response.data;
            var len = $scope.documentarys.length;

            for (var i = 0; i < len; i++) {
                $scope.documentarys[i].sets = JSON.parse($scope.documentarys[i].sets.replace(/&quot;/g, "\"") || '[]');
                console.log($scope.documentarys[i].sets)
            }
            $scope.num = $scope.num;
        })
    });
    app.controller("articleDetailController", function($scope, $http, $route, $sce) {
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/article";
        $http({
            url: "/index.php?c=article&a=articleDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.articleDetail = response;
            $scope.articleDetail.detail.content = $sce.trustAsHtml($scope.articleDetail.detail.content);
        });

    });
    app.controller("imageDetailController", function($scope, $http, $route, $sce) {
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/image";
        $http({
            url: "/index.php?c=pic&a=picDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.imgDetail = response;
            $scope.imgDetail.content = $sce.trustAsHtml($scope.imgDetail.content);
            $scope.imgDetail.maincontent = $sce.trustAsHtml($scope.imgDetail.maincontent);
        });
        $http({
            url:"/index.php?c=pic&a=relativePic",
            method:"get"
        }).success(function(response){
            $scope.relativePics = response;
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

    app.controller("videoDetailController", function($scope, $http, $route, $sce) {
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/video";
        $http({
            url: "/index.php?c=video&a=videoDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.videoDetail = response;
            $scope.videoDetail.content = $sce.trustAsHtml($scope.videoDetail.content);
        });
    });
    app.controller("indexController", function($scope, $http) {

        $http({
            method: "get",
            url: "/index",
        }).success(function(response) {
            $scope.title = response.title;
            $scope.content = response.content;
            $scope.img_src = response.img_src;

        })
    });
    app.controller("allPicController", function($scope, $http, pageSet) {
        document.title = "所有图片";
        $http({
            method: "get",
            url: "/index.php?c=pic&a=allPic&page=1",
        }).success(function(response) {
            $scope.num = response.num;

            pageSet.init(Math.ceil($scope.num / 18), picByPage);
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

    app.controller("articleListController", function($http, $scope, pageSet, util, $route) {
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
            pageSet.init(Math.ceil($scope.num / 18), articleByPage);
            $("#article-list1").empty();
            $("#article-list2").empty();
            $("#article-list3").empty();
            $("#article-list4").empty();
            for (var len = response.data.length, i = 0; i < len; i++) {
                var newArticle = '<div class="thumbnail video-padding"><div class="caption-change"><a href="#articleDetail/'
                 + response.data[i].id + '"><h4>' + response.data[i].title +
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
                var newArticle = '<div class="thumbnail video-padding"><div class="caption-change"><a href="#articleDetail/'
                 + response.data[i].id + '"><h4>' + response.data[i].title +
                    '</h4></a><p>' + response.data[i].publishtime.slice(0, 16) +
                    '</p></div><img src="' + response.data[i].thumbnail +
                    '" alt=""><div class="caption"><p>' + response.data[i].abstract +
                    '</p></div></div>';

                $("#article-list" + (i % 4 + 1)).append(newArticle);

            }
            });
        }
    });
    app.controller("videoController", function($http, $scope, pageSet, $route) {
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
            pageSet.init(Math.ceil($scope.num / 18), picByPage);
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

    app.controller("loginController", function($scope, $http) {
        $scope.init = function(type) {
            $scope.type = type;
            $('#myModal').modal();

        }
    })

}(angular, window);
