import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addProduct,
  removeProduct,
  selectProduct,
  increaseProductQty,
  changePage,
  requestPurchase
} from '../actions/product';
import { login } from '../actions/account';
import ProductList from '../components/ProductList';
import PurchaseButton from '../components/PurchaseButton';
import AccountBar from '../components/AccountBar';
import ButtonBar from '../components/ButtonBar';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(login('154464990'));
  }

  componentWillReceiveProps(nextProps) {
  }

  addRandomProduct() {
    var eans = [
      '7310500088853',
      '7340083438684',
      '7611612221351',
      '7310500114934',
      '7310070765840',
      '7315360010754',
      '7622300342753'
    ];

    var randomIndex = Math.floor(Math.random() * eans.length);
    this.props.dispatch(addProduct(eans[randomIndex]));
  }

  render() {
    const { dispatch, products, account } = this.props;
    let selected = products.products.filter((p) => p.selected).length;
    return (
      <div id="container">
        <ProductList
          products={products}
          onSelect={(ean) => dispatch(selectProduct(ean))}
        />
        <span id="trash" className="button"></span>
        <div id="sidebar">
            <AccountBar {...account} />
            <div id="menubox"></div>
            <PurchaseButton products={products} onPurchase={() => dispatch(requestPurchase())} />
        </div>
        <ButtonBar
          onIncrease={() => dispatch(increaseProductQty(1))}
          onDecrease={() => dispatch(increaseProductQty(-1))}
          onRemove={() => dispatch(removeProduct())}
          onScrollUp={() => this.addRandomProduct()}
          onScrollDown={() => dispatch(changePage(1))}
          active={selected > 0}
          scrollUpActive={products.page > 0}
          scrollDownActive={products.page < products.maxPage}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products, account } = state;

  return {
    products,
    account
  };
}

export default connect(mapStateToProps)(App);
