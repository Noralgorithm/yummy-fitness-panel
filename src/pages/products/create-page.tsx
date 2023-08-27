import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductContext.jsx';

function CreatePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [apiData, setApiData] = useState(null);
  const { addProduct, businessIds } = useContext(ProductContext);
  
  console.log('Business IDs:', businessIds);


  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ingredientValues = ingredients.filter((ingredient) => ingredient.trim() !== '');

    fetch('https://yummycodicon.azurewebsites.net/nutrition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientValues),
    })
      .then((response) => response.json())
      .then((result) => {
        setApiData(result);
        addProduct({
          name: event.target.name.value,
          calories: result.totalCalories,
          fat: result.totalFat,
          carbs: result.totalCarbohydrates,
          protein: result.totalProtein,
        });
      });
  };

  return (
    <div style={{ display: 'block' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del producto:
          <input type="text" name="name" style={{ border: '1px solid black', display: 'block' }} />
        </label>
        <label>
          Cantidad:
          <input type="number" name="quantity" style={{ border: '1px solid black', display: 'block' }} />
        </label>
        <label>
          ¿Es producto vegano?:
          <input type="checkbox" name="isVegan" style={{ border: '1px solid black', display: 'block' }} />
        </label>
        <label>
          ¿Es producto fitness?:
          <input type="checkbox" name="isFit" style={{ border: '1px solid black', display: 'block' }} />
        </label>
        <label>
          Ingredientes:
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Ingrese un ingrediente"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                style={{ border: '1px solid black', display: 'block' }}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            +
          </button>
        </label>
        <input type="submit" value="Submit" style={{ border: '1px solid black', display: 'block' }} />
      </form>

      {apiData && (
        <div>
          <h2 style={{marginTop: 20, textAlign: "center"}}>API Data</h2>
          <ul>
            {apiData.ingredients.map((ingredient, index) => (
              <li key={index}>
                Nonmbre del ingrediente: {ingredient.name}         Calorias del ingrediente: {ingredient.calories}
              </li>
            ))}
          </ul>
          <p>Total de Calorías: {apiData.totalCalories}</p>
          <p>Total de grasas: {apiData.totalFat}</p>
          <p>Porcentaje de grasas: {apiData.fatPercentage}</p>
          <p>Total de Carbohidratos: {apiData.totalCarbohydrates}</p>
          <p>Porcentaje de carbohidratos: {apiData.carbohydratesPercentage}</p>
          <p>Total de Proteína: {apiData.totalProtein}</p>
          <p>Porcentaje de Proteína: {apiData.totalPercentage}</p>
        </div>
      )}
    </div>
  );
}

export default CreatePage

