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
				vm.clear = clear;
				vm.backup = backup;
				vm.restore = restore;

				// On load
				activate();

				////////////////////////////////////
				function activate() {
					setStorageType(vm.type);
					vm.__backup = vm.storage;
				}

				////////////////////////////////////
				// #region Internal Methods
				////////////////////////////////////

				function save () {

					var actual_storage = vm.type === 'localStorage'
						? localStorage
						: sessionStorage;

					for (var key in vm.storage) {
						actual_storage.setItem(key, vm.storage[key]);
					}

					alert('Saved!');
				};

				function deleteItem (key) {
					delete vm.storage[key];
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

				function setStorageType (type) {
					vm.storage = type === 'localStorage'
						? localStorage
						: sessionStorage;
				}

				function backup () {
					vm.__backup = vm.storage;
				};

				function restore () {
					vm.storage = vm.__backup;
				};

				// #endregion

			}

		}]);

}());
