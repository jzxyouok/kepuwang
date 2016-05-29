! function(angular, window, b) {
    var app = angular.module('myApp', ['ngRoute']);
    // 导航栏指令
    app.directive("navbar", function() {
        return {
            restrict: "E",
            templateUrl: '/public/template/nav.html',
            controller: 'loginController',
            replace: true
        }
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

    })


    app.directive("foot", function() {
        return {
            restrict: "E",
            templateUrl: '/public/template/footer.html',
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
    app.service("user", function($http, config) {
        return {
            checkUserName: function(name) {
                if (name.length < 6 || name.length > 12) {
                    return config.USERNAME_WRONG_LNGTH;
                }
                var reg = /^[a-zA-Z0-9_]{6,12}$/;
                if (!reg.test(name)) {
                    return config.USERNAME_WRONG_PATTERN;
                }
            },
            encryPassword: function(password) {

                }
                // 
                // some other code
        }

    })


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
                controller: "videoController"
            })
            .when("/image", {
                templateUrl: "/public/template/imageTpl.html",
                controller: "allPicController"
            })
            .when("/imageDetail/:id", {
                templateUrl: "/public/template/imageDetailTpl.html",
                controller: "imageDetailController"
            })
            .when("/documentary/", {
                templateUrl: "/public/template/documentary.html",
                controller: "loginController"
            })
            .when("/article", {
                templateUrl: "/public/template/articleTpl.html",
                controller: "loginController"
            })
            .when("/articleDetail", {
                templateUrl: "/public/template/articleDetailTpl.html",
                controller: "loginController"
            })
            .when("/tieba", {
                templateUrl: "/public/template/tieba.html",
                controller: "loginController"
            })


        .otherwise({ redirectTo: "/index" });

    }]);

    app.controller("imageDetailController", function($scope, $http, $route) {
        var id = $route.current.params.id;
        if (id == "")
            window.location.href = "#/image";
        $http({
            url: "/index.php?c=pic&a=picDetail&id=" + id,
            method: "get"
        }).success(function(response) {
            $scope.imgDetail = response;
        });
    })
    app.controller("indexController", function($scope, $http, user) {

        $http({
            method: "get",
            url: "/index",
        }).success(function(response) {
            $scope.title = response.title;
            $scope.content = response.content;
            $scope.img_src = response.img_src;

        })
    })
    app.controller("allPicController", function($scope, $http, pageSet) {
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
            var pics;

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

    app.controller("videoController", function($http, $scope, pageSet) {
        pageSet.init(5);

    })

    app.controller("loginController", function($scope, $http) {
        $scope.init = function(type) {
            $scope.type = type;
            $('#myModal').modal();

        }
    })

}(angular, window);
