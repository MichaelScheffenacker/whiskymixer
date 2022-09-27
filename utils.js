module.exports = {
    mapIngredientToCocktail: function (cocktails) {
        let lookup = {};
        cocktails.forEach(
            cocktail => {
                let indexIngredient = cocktail?.ingredients[0];
                if (!Array.isArray(lookup[indexIngredient])) {
                    lookup[indexIngredient] = []
                }
                lookup[indexIngredient].push(cocktail)
            }
        );
        return lookup;
    }
};
