function getTarefas(){
	this.itens = [];

	var lista = localStorage.getItem('tarefas');

	if(lista != null){
		this.itens = angular.fromJson(lista);
	}

	this.salvar = function(){
		var lista = angular.toJson(this.itens);
		localStorage.setItem('tarefas', lista);
	};

	this.remover = function(item){
		var pos = this.itens.indexOf(item);
		this.itens.splice(pos, 1);
	};

	this.adicionar = function(item){
		this.itens.push(item);
	};
}