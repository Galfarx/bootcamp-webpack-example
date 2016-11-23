import HomeCtrl from './home.controller';

const HomeModule = angular.module('sampleApp.home', [])
    .config(($StateProvider, $urlRouterProvider) => {
        $StateProvider
            .state('home', {
                url: '/home',
                template: require('./home.html'),
                controller: HomeCtrl,
                controllerAs: 'home'
            });
    });

export default HomeModule;