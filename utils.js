module.exports = {
    mapIngredientToCocktail: function (cocktails) {
        let lookup = {};
        let uniquenessGuard = new Set;
        cocktails.forEach(
            cocktail => {
                if (!uniquenessGuard.has(cocktail.key)) {
                    uniquenessGuard.add(cocktail.key);
                    let indexIngredient = cocktail.ingredients[0];
                    if (!Array.isArray(lookup[indexIngredient])) {
                        lookup[indexIngredient] = []
                    }
                    lookup[indexIngredient].push(cocktail);
                }
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
    filterAvailableCocktails: (availableIngredients, cocktailLookup) => {
        let cocktailSubset = module.exports.groupCocktailCandidates(availableIngredients, cocktailLookup);
        let availableCocktails = cocktailSubset.filter(cocktail =>
            cocktail.ingredients.every(ingredient => availableIngredients.includes(ingredient))
        )
        return availableCocktails;
    }
};
