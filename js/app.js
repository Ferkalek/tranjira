'use strict';

var myListExpense = [{name: 'Проезд', sum: 13.5, dateExpense: '19.01.2017'},
  {name: 'Еда', sum: 47.75, dateExpense: '20.01.2017'},
  {name: 'Проезд', sum: 4.25, dateExpense: '25.01.2017'},
  {name: 'Еда', sum: 14.25, dateExpense: '25.01.2017'},
  {name: 'Прочие', sum: 164.25, dateExpense: '02.02.2017'}];

var expenseSt = [{id: 0, name: 'Проезд', isOpen: false},
  {id: 1, name: 'Еда', isOpen: false},
  {id: 2, name: 'Лекарства', isOpen: false},
  {id: 3, name: 'Комуналка', isOpen: false},
  {id: 4, name: 'Прочие', isOpen: false}];

var app = angular.module("tranjiraApp", []);

app.controller('homeCtrl', function($scope){

    //переменная для вывода в таблицу значений (первоначальный рендеринг таблицы)
    $scope.list = myListExpense;
    $scope.listCat = expenseSt;
    $scope.selected = $scope.listCat[0];

    //проверка формы по добавлению затрат
    $scope.matchPattern = /^\d+(?:.\d{1,2})?$/;

    $scope.getError = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Поле не должно быть пустым";
            } else if (error.pattern) {
                return "Введите сумм";
            }
        }
    };

    //метод добавление при клике на кнопку - добавление записи
    $scope.addItem = function() {
        var date = new Date();

        $scope.list.push({
            name: $scope.selected.name,
            sum: $scope.sumExpense,
            dateExpense: date
        });

        //изначально добавляемые значения равны пустате
        $scope.sumExpense = '';
        $scope.dateExpense = '';

        //закрываем модальное окно
        $scope.modalShow = false;
        //очещаем поля формы
        $scope.addExpense.$setPristine();
    };

    //переменная для отображения или прятанья модального окна
    $scope.modalShow = false;
    $scope.viewModal = '';

    //показать модальное окно и отобразить настройки (список категорий)
    $scope.showSettings = function() {
        $scope.modalShow = true;
        $scope.viewModal = 'list';
    };

    //показать модальное окно и отобразить форму для добавления расходов
    $scope.addExpens = function() {
        $scope.modalShow = true;
        $scope.viewModal = 'expense';
    };

    //показать модальное окно и отобразить форму для добавления категорий
    $scope.showModalAddExpensCat = function() {
        $scope.modalShow = true;
        $scope.viewModal = 'expensecat';
    };

    //добавление категории
    $scope.addExpensCat = function() {
        console.log('1 - ' + $scope.newListCat);
        $scope.listCat.push({
            name: $scope.newListCat,
            id: $scope.listCat.length
        });
        $scope.newListCat = '';

        //закрываем модальное окно
        $scope.modalShow = false;
        //очещаем поля формы
        $scope.addExpenseCat.$setPristine();
    };

    $scope.hideModal = function() {
        $scope.modalShow = false;
    };

    $scope.preChangeCat = function(id) {
        $scope.listCat[id].isOpen = true;
    };

    $scope.changeExpensCat = function(id, name) {
        $scope.listCat[id].name = name;
        $scope.listCat[id].isOpen = false;
    };

    $scope.delExpensCat = function(id) {
        $scope.listCat.splice(id, 1);
    };

});