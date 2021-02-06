class Restaurant {
	constructor() {
		this._foods = {
			meat: 10,
			bread: 20
		};
		this._recipes = {
			burger: {
				recipe: ["bread", "meat", "bread"],
				time: 1000
			}
		};
		this._busy = false;
		this._pauseTime = 1000;
	}

	order(dishes, callback) {
		var items = [];

		this._cooking(dishes, item => {
			items.push(item);
			
			if(items.length === dishes.length) {
				callback(items)
			}
		})
	}

	_cooking(dishes, callback) {
		var i = 0;
		
		if(!this._busy) {
			this._cook(dishes, i, callback);
		} else {
			setTimeout(this._cooking.bind(this, dishes, callback), this._pauseTime);
		}
	}

	_cook(dishes, i, callback) {
		var recipe = this._recipes[dishes[i]].recipe;
		var time = this._recipes[dishes[i]].time;
		var ingredients = [];

		this._busy = true;
				
		for(var j = 0; j < recipe.length; j++) {
			var ingredient = recipe[j];

			ingredients.push(ingredient);
			this._foods[ingredient]--;
		}

		setTimeout(callback.bind(null, ingredients), time);
		i++;

		if(i < dishes.length) {
			setTimeout(this._cook.bind(this, dishes, i, callback), time);
		} else {
			setTimeout(() => this._busy = false, time);
		}
	}
}