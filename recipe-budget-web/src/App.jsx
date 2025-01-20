import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0); // Percentual de lucro
  const [finalPrice, setFinalPrice] = useState(0); // Preço de venda final

  const addItem = () => {
    setItems([...items, { name: '', totalWeight: '', totalPrice: '', usedWeight: '', cost: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    // Recalcula o custo total após remover o item
    const newTotalCost = updatedItems.reduce((sum, item) => sum + item.cost, 0);
    setTotalCost(newTotalCost);
    setFinalPrice(newTotalCost * (1 + profitMargin / 100)); // Recalcula o preço de venda
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Cálculo do custo por item
    const { totalWeight, totalPrice, usedWeight } = updatedItems[index];
    if (totalWeight && totalPrice && usedWeight) {
      const cost = (usedWeight / totalWeight) * totalPrice;
      updatedItems[index].cost = cost;
    } else {
      updatedItems[index].cost = 0;
    }

    setItems(updatedItems);

    // Atualiza o custo total
    const newTotalCost = updatedItems.reduce((sum, item) => sum + item.cost, 0);
    setTotalCost(newTotalCost);
    setFinalPrice(newTotalCost * (1 + profitMargin / 100)); // Recalcula o preço de venda
  };

  const handleProfitMarginChange = (value) => {
    setProfitMargin(value);
    setFinalPrice(totalCost * (1 + value / 100));
  };

  return (
    <div>
      <h1>Calculadora de Custos</h1>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Nome do Produto"
            value={item.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Peso total (g)"
            value={item.totalWeight}
            onChange={(e) => handleInputChange(index, 'totalWeight', parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Preço total (R$)"
            value={item.totalPrice}
            onChange={(e) => handleInputChange(index, 'totalPrice', parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Peso usado (g)"
            value={item.usedWeight}
            onChange={(e) => handleInputChange(index, 'usedWeight', parseFloat(e.target.value))}
          />
          <span> Custo: R$ {item.cost.toFixed(2)}</span>
          <button onClick={() => removeItem(index)}>Remover</button>
        </div>
      ))}
      <button onClick={addItem}>Adicionar Item</button>

      <h2>Custo Total: R$ {totalCost.toFixed(2)}</h2>
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          placeholder="Percentual de lucro (%)"
          value={profitMargin}
          onChange={(e) => handleProfitMarginChange(parseFloat(e.target.value))}
        />
        <h2>Preço de Venda: R$ {finalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App
