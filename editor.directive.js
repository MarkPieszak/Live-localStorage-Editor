;(function () {
	'use strict';

	angular.module('editor-app' , [])
		.directive('storageEditor', ['$interval', function ($interval) {
			return {
				scope : {},
				bindToController: true,

				templateUrl : 'editor.directive.html',
				controllerAs: 'vmEditor',
				controller: editorController
			};

			function editorController () {

				var vm = this;

				vm.storage_types = ['localStorage', 'sessionStorage'];
				vm.type = vm.storage_types[1]; // Sets the default

				vm.changeType = changeType;
				vm.addItem = addItem;
				vm.deleteItem = deleteItem;
				vm.save = save;
				vm.editing = editing;
				vm.clear = clear;

				activate();

				////////////////////////////////////
				function activate() {

					setStorageType(vm.type);
					vm.__backup = vm.storage;
					intervalLoop();
				}

				////////////////////////////////////
				// #region Internal Methods
				////////////////////////////////////

				function editing (val) {

				};

				function deleteItem (key) {
					delete vm.storage[key];
				};

				function save () {

					var actual_storage = vm.type === 'localStorage'
						? localStorage
						: sessionStorage;

					console.log(vm.storage);

					for (var key in vm.storage) {
						console.log(key);
						console.log(vm.storage[key]);
						actual_storage.setItem(key, vm.storage[key]);
					}


					alert('Saved!');
				};

				vm.backup = function () {
					vm.__backup = vm.storage;
				};

				vm.restore = function () {
					vm.storage = vm.__backup;
				};

				function changeType () {
					setStorageType(vm.type);
				};

				function addItem (item) {
					vm.storage[item.key] = item.val;
					vm.newItem = [];
				};

				function clear () {
					var response = confirm('Are you sure?\n\nThis will Clear -ALL- data within ' + vm.type);
					if (response) {
						vm.storage.clear();
						return;
					}
				};

				function intervalLoop () {

					var previous = JSON.stringify(vm.storage);

					$interval(function () {
						/*
						var current = JSON.stringify(vm.storage);

						if (current !== previous) {
							console.log('different!');
							previous = JSON.stringify(vm.storage);
						}
						*/

					}, 500);
				}

				function setStorageType (type) {
					vm.storage = type === 'localStorage'
						? localStorage
						: sessionStorage;
				}

				// #endregion

			}

		}]);

}());
