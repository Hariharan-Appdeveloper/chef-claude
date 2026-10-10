type IngredientsListProps = {
    ingredient: string[];
};

export function IngredientsList(props: IngredientsListProps){

    const ingredientList = props.ingredient.map((ingredient)=>{
        return <li key={ingredient}>{ingredient}</li>
    });

    return (
    <>
        {props.ingredient.length > 0 && (
                <>
                <section  className="ingredient-list">
                <h2>Ingredients On Hand</h2>
                <ul>
                    {ingredientList}
                </ul>
            </section>
            </>
        )}
    </>)
}