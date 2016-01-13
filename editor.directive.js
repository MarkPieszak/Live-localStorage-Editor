'use strict';

angular.module('editor-app' , [])
	.directive('storageEditor', function () {
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

			vm.storage = vm.type === 'localStorage'
				? localStorage
				: sessionStorage;

			vm.__backup = vm.storage;

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

			///////////////////////////
			// BACKUP & RESTORE

			vm.backup = function () {
				vm.__backup = vm.storage;
			};

			vm.restore = function () {
				vm.storage = vm.__backup;
			};

		}

	});
