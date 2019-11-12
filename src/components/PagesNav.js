import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class PagesNav extends Component {
  navigateToPage(page) {
    this.props.fetchProducts({
      query: this.props.products.query,
      category: this.props.products.category,
      sort: this.props.products.sort,
      page
    });
  }

  navigateToNextPage() {
    console.log(
      "Curr: ",
      this.props.products.pageNum,
      " Next: ",
      this.props.products.pageNum + 1
    );
    this.navigateToPage(this.props.products.pageNum + 1);
  }

  navigateToPreviousPage() {
    this.navigateToPage(this.props.products.pageNum - 1);
  }

  renderPageNums() {
    console.log(this.props);
    const { pageNum, numPages } = this.props.products;
    const elements = [];
    for (let i = 1; i <= numPages; i++) {
      elements.push(
        <a
          href="#"
          key={i}
          onClick={() => this.navigateToPage(i)}
          className={i == pageNum ? "active" : ""}
        >
          {i}
        </a>
      );
    }

    return elements;
  }

  render() {
    return (
      <div className="pages">
        <div className="pagination" style={{ display: "inline-block" }}>
          {this.props.products.pageNum > 1 ? (
            <a href="#" onClick={() => this.navigateToPreviousPage()}>
              &laquo;
            </a>
          ) : (
            ""
          )}
          {this.renderPageNums()}
          {this.props.products.pageNum < this.props.products.numPages ? (
            <a href="#" onClick={() => this.navigateToNextPage()}>
              &raquo;
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesNav);
