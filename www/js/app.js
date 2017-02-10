// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('indexController',function($scope, $ionicPopup, $ionicListDelegate){
  var tarefas = new getTarefas();

  $scope.lista = tarefas.itens;
  $scope.verFinalizadas = false;
  $scope.verBotaoRemover = false;

  function adicionarItemPopup(item, novo){
    $scope.itemAdicionar = {};
    $scope.itemAdicionar.nome = item.nome;

    $ionicPopup.show({
      title:"Nova Tarefa",
      scope:$scope,
      template: "<input type='text' placeholder='Nome' autofocus='true' ng-model='itemAdicionar.nome'>",
      buttons:[{text: 'OK', onTap: function(e){
        item.nome = $scope.itemAdicionar.nome;
        if(novo){
          tarefas.adicionar(item);
        }
        tarefas.salvar();
      }}, {text:'Cancelar'}]
      
    });
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.statusItem = function(item){
    item.status = !item.status;
    console.log(item.status);
    tarefas.salvar();
  };

  $scope.verItens = function(item){
    return item.status && !$scope.verFinalizadas;
  };

  $scope.removerItem = function(item){
    tarefas.remover(item);
    tarefas.salvar();
  };

  $scope.botaoRemoverClick = function(){
    $scope.verBotaoRemover = !$scope.verBotaoRemover;
  };

  $scope.adicionarItem = function(){
    var item = {nome:'', status: false};
    adicionarItemPopup(item, true);
  };

  $scope.alterarItem = function(item){
    adicionarItemPopup(item, false);
  };

});
