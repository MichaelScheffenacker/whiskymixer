const utils = require('../utils');

describe('mapIngredientToCocktail', () => {
    test('basic functionallity', () => {
        let input = [
                {
                    "id": 1,
                    "key": "12460",
                    "title": "Vodka And Tonic",
                    "ingredients": ["Vodka", "Tonic water"]
                },
                {
                    "id": 2,
                    "key": "16041",
                    "title": "Mudslinger",
                    "ingredients": ["Southern Comfort", "Orange juice", "Pepsi Cola"]
                },
                {
                    "id": 3,
                    "key": "12674",
                    "title": "Fruit Shake",
                    "ingredients": ["Yoghurt", "Banana"]
                }
            ]
        let expected = {
            "Southern Comfort": [{
                "id": 2,
                "ingredients": ["Southern Comfort", "Orange juice", "Pepsi Cola"],
                "key": "16041",
                "title": "Mudslinger"
            }],
            "Vodka": [{
                "id": 1,
                "ingredients": ["Vodka", "Tonic water"],
                "key": "12460",
                "title": "Vodka And Tonic"
            }],
            "Yoghurt": [{
                "id": 3,
                "ingredients": ["Yoghurt", "Banana"],
                "key": "12674",
                "title": "Fruit Shake"
            }]
        }
        let result = utils.mapIngredientToCocktail(input);
        expect(result).toStrictEqual(expected);
    });
});
