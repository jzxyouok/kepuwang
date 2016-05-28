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
                // controller: "allPicController"
            })
            .when("/documentary/", {
                templateUrl: "/public/template/documentary.html",
                controller: "loginController"
            })
             .when("/articleDetail", {
                templateUrl: "/public/template/articleDetailTpl.html",
                controller: "loginController"
            })

        .otherwise({ redirectTo: "/index" });

    }]);

    app.controller("imageDetail", function($scope, $http) {
        $http({
            url: "/imageDetail",
            method: "get"
        }).success(function(response) {
            $scope = response;
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
        pageSet.init(5);
    })
    app.controller("videoController",function($http,$scope, pageSet){
pageSet.init(5);

    })
        
    app.controller("loginController", function($scope, $http) {
        $scope.init = function(type){
            $scope.type = type;
            $('#myModal').modal();

        }
    })

}(angular, window);
