'use strict';

angular.module('editor-app' , [])
	.directive('storageEditor', ['$interval', function ($interval) {
		return {
			scope : {},
			templateUrl : 'editor.directive.html',
			bindToController: true,
			controllerAs: 'vmEditor',
			controller: editorController
		};

		function editorController () {

			var vm = this;

			vm.storage_types = ['localStorage', 'sessionStorage'];

			// Sets the default
			vm.type = vm.storage_types[1];

			setStorageType(vm.type);
			intervalLoop();

			vm.__backup = vm.storage;

			vm.changeType = function () {
				setStorageType(vm.type);
			};

			vm.addItem = function (item) {
				vm.storage[item.key] = item.val;
				vm.newItem = [];
			};

			vm.deleteItem = function (key) {
				delete vm.storage[key];
			};

			vm.save = function () {

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

			vm.editing = function (val) {

			};

			vm.clear = function () {
				var response = confirm('Are you sure?\n\nThis will Clear -ALL- data within ' + vm.type);
				if (response) {
					vm.storage.clear();
					return;
				}
			};

			///////////////////////////
			// BACKUP & RESTORE

			vm.backup = function () {
				vm.__backup = vm.storage;
			};

			vm.restore = function () {
				vm.storage = vm.__backup;
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

		}

	}]);
