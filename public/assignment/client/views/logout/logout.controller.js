(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LogoutController", LogoutController);

    function LogoutController($rootScope) {
        $rootScope.user = null;
        console.log("rootScope user:"); //checking if rootScope.usr is reset to null
        console.log($rootScope.user);
    }
})();