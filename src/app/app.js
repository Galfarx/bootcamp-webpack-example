require('./style.scss');

function getModuleName(module) {
    return module.name || module.default.name;
}

let appDependencies = [
    'ui.router'
];
let appModule = [
    require('./home/home.module')
];
angular.module('sampleApp', [appDependencies.concat(appModule.map(getModuleName))])
    .config(($StateProvider, $urlRouterProvider) => {
        $StateProvider
            .otherwise('/home');
    });