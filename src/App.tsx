import React from "react";
//import { Table } from 'react-bootstrap'
import "./App.css";

class ProductCategoryRow extends React.Component<any, any> {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <td colSpan={2}>{category}</td>
      </tr>
    );
  }
}

class ProductRow extends React.Component<any, any> {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component<any, any> {
  render() {
    const rows: any[] = [];
    let lastCategory: string = "";

    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    this.props.products.forEach(
      (product: { name: string; stocked: boolean; category: string }) => {
        const indexOfFirst = product.name.indexOf(filterText);
        if (indexOfFirst === -1) {
          return;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }

        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              key={product.category}
            />
          );
        }

        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
      }
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e: { target: { value: any } }) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e: { target: { checked: any } }) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    return (
      <form>
        <input
          type="text"
          placeholder="Chercher..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />{" "}
          Afficher uniquement les produits en stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText: any) {
    this.setState({
      filterText: filterText,
    });
  }

  handleInStockChange(inStockOnly: any) {
    this.setState({
      inStockOnly: inStockOnly,
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$50.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 12",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 8" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FilterableProductTable products={PRODUCTS} />
      </header>
    </div>
  );
}

export default App;
