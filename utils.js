module.exports = {
    mapIngredientToCocktail: function (cocktails) {
        let lookup = {};
        cocktails.forEach(
            cocktail => {
                let indexIngredient = cocktail.ingredients[0];
                if (!Array.isArray(lookup[indexIngredient])) {
                    lookup[indexIngredient] = []
                }
                lookup[indexIngredient].push(cocktail)
            }
        );
        return lookup;
    },
    groupCocktailCandidates: function (availableIngredients, cocktailLookup) {
        let cocktailSubset = [];
        availableIngredients.forEach(ingredient => {
            let section = cocktailLookup[ingredient] ?? [];
            cocktailSubset = cocktailSubset.concat(section);
        });
        return cocktailSubset;
    },
    filterAvailableCocktails: function (availableIngredients, cocktailLookup) {
        let cocktailSubset = [];
        availableIngredients.forEach(ingredient => {
            let section = cocktailLookup[ingredient] ?? [];
            cocktailSubset = cocktailSubset.concat(section);
        });
        let availableCocktails = cocktailSubset.filter(cocktail =>
            cocktail.ingredients.every(ingredient => availableIngredients.includes(ingredient))
        )
        return availableCocktails;
    }
};
