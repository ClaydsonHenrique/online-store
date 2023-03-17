import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from './Categories';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import SearchProduct from './InputSearch';
import ProductsList from './ProductsList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category,
      productsDetails: [],
      search: false,
    };
  }

  async componentDidMount() {
    const categ = await getCategories();
    console.log(categ);
  }

  handleClick = async (product) => {
    const { category } = this.state;
    const products = await getProductsFromCategoryAndQuery(category, product);
    if (products.results.length > 0) {
      this.setState(() => ({
        productsDetails: products.results,
      }));
    }
    this.setState({ search: true });
  };

  render() {
    const { productsDetails, search } = this.state;
    return (
      <>
        <div>
          <SearchProduct
            handleClick={ this.handleClick }
          />
          { !search && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <Link to="./Carrinho" data-testid="shopping-cart-button"> Carrinho</Link>
        <div>
          <Categories />
          { search && productsDetails.length < 1
          && (<p>Nenhum produto foi encontrado</p>)}
          <ProductsList productsDetails={ productsDetails } />
        </div>
      </>
    );
  }
}

Home.propTypes = {
  category: PropTypes.string,
};
Home.defaultProps = {
  category: '',
};

export default Home;
