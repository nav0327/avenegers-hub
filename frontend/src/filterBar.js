import React, { Component } from "react";
// import './filterBar.css' ;
import Axios from "axios";
import { isBuffer } from "util";
import "./homepage.css";
import ProductDetails from "./ProductDetails";
class FilterBar extends Component {
  constructor(props) {
    super(props);
    var content;
    this.state = {
      pfilter: [],
      sfilter: [],
      bfilter: [],
      brandFilter: [],
      priceFilter: [],
      intoCategory: [],
      sizeFilter: [],
      price1: false,
      price2: false,
      price3: false,
      xsmall: false,
      small: false,
      medium: false,
      large: false,
      xlarge: false,
      size8: false,
      size16: false,
      size32: false,
      parentprops: [],
      product: [],
      productDetail: [],
      mainDiv: []
    };
    this.logincontext = this.props.childContext;
  }

  pricefilter(lprice, mprice, flag) {
    var price = [];
    price = this.state.priceFilter;
    // console.log(document.getElementById(flag).checked)
    if (document.getElementById(flag).checked) {
      console.log("into if for flag " + flag);
      console.log(lprice + " " + mprice);
      price.push(lprice, mprice);
      this.setState({ priceFilter: price });
      // console.log('push price, state')
      console.log(price);
      console.log(this.state.priceFilter);
    } else {
      var pos = price.indexOf(lprice);
      price.splice(pos, 1);
      pos = price.indexOf(mprice);
      price.splice(pos, 1);
    }
    // console.log(price)
    //  console.log(this.state.priceFilter)
    //  console.log(typeof(price))
    this.setState({ priceFilter: price });
    // console.log(price)
    // console.log(this.state.priceFilter)

    // console.log('price filter')
    // console.log(this.state.priceFilter)
    this.subcategory();
  }
  sizefilter(size, flag) {
    var tsize = [];
    tsize = this.state.sizeFilter;
    if (document.getElementById(flag).checked) {
      tsize.push(size);
      this.setState({ sizeFilter: tsize });
      console.log("size filter" + this.state.sizeFilter);
    } else {
      var pos = tsize.indexOf(size);
      tsize.splice(pos, 1);
      this.setState({ sizeFilter: tsize });
    }
    console.log(this.state.sizeFilter);
    this.subcategory();
  }
  brandfilter(brandp, flag) {
    var brand = [];
    brand = this.state.brandFilter;
    console.log("brand" + brand);
    console.log("brand filter" + this.state.brandFilter);
    if (document.getElementById(flag).checked) {
      brand.push(brandp);
      this.setState({ brandFilter: brand });
      console.log("if brand" + brand);
      console.log("if brand filter" + this.state.brandFilter);
    } else {
      var pos = brand.indexOf(brandp);
      brand.splice(pos, 1);
      this.setState({ brandFilter: brand });
      console.log("else brand" + brand);
      console.log("else brand filter" + this.state.brandFilter);
    }

    console.log("brand filter" + this.state.brandFilter);
    this.subcategory();
  }
  subcategory() {
    console.log("into mount function");
    //console.log(this.props.parentContext);
    //var parent = {key: this.props.parentContext}
    console.log(this.state);
    Axios.post("http://localhost:4000/intoCategory", this.state).then(
      response => {
        console.log("returned to intocategory front end");
        console.log(response); 
        console.log(response.data);
        this.setState({ intoCategory: response.data });
        var item = this.state.intoCategory.map(categor => (
          <li onClick={() => this.handleClick(categor)}>
            <strong>{categor.product_name}</strong>
            <br />
            Price: ${categor.price}
          </li>
        ));
        var mainBody = <ul id="category">{item}</ul>;
        this.setState({ mainBody: mainBody });
        // this.filter();
      }
    );
  }
  handleClick(productp) {
    console.log("into product detail handle click");
    console.log(productp);
    // this.setState({product:productp});
    // console.log(typeof(productp)+'  '+typeof(this.state.product))
    // console.log(this.state.product);
    var mainDiv = [];
    mainDiv.push(
      <ProductDetails
        parentContext={productp}
        appContext={this.logincontext}
      />
    );
    console.log(mainDiv);
    this.setState({ productDetail: mainDiv });
    this.setState({ pfilter: null });
    this.setState({ sfilter: null });
    this.setState({ bfilter: null });
    this.setState({ mainBody: null });
    // this.props.parentContext.carousel= '';
  }

  componentDidMount() {
    //this.setState({parentprops:this.props.parentContext})
    this.state.parentprops = this.props.parentContext;
    console.log("into filter bar");
    console.log(this.state.parentprops);
    //var parent = {key: this.props.parentContext}
    var pfilter = (
      <ul class="list-style-6 margin-50px-bottom text-small">
        <lh>Price</lh>
        <li>
          <input
            type="checkbox"
            value="0 AND 50"
            id="item_filter_price1"
            onClick={() => this.pricefilter(0, 50, "item_filter_price1")}
          />
          0 - 50
        </li>
        <li>
          <input
            type="checkbox"
            value="51 AND 500"
            id="item_filter_price2"
            onClick={() => this.pricefilter(51, 500, "item_filter_price2")}
          />
          51 - 500
        </li>
        <li>
          <input
            type="checkbox"
            value="501"
            id="item_filter_price3"
            onClick={() => this.pricefilter(501, 50000, "item_filter_price3")}
          />
          above 500
        </li>
      </ul>
    );
    var bfilter = (
      <ul class="list-style-6 margin-50px-bottom text-small">
        <lh>SuperHero</lh>
        <li>
          <input
            type="checkbox"
            value="8"
            id="item_filter_shironman"
            onClick={() => this.brandfilter("ironman", "item_filter_shironman")}
          />
          Ironman
        </li>
        <li>
          <input
            type="checkbox"
            value="16"
            id="item_filter_shcap"
            onClick={() =>
              this.brandfilter("captain_america", "item_filter_shcap")
            }
          />
          Captain America
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shhulk"
            onClick={() => this.brandfilter("hulk", "item_filter_shhulk")}
          />
          Hulk
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shhawk"
            onClick={() => this.brandfilter("hawk", "item_filter_shhawk")}
          />
          Hawk
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shthor"
            onClick={() => this.brandfilter("thor", "item_filter_shthor")}
          />
          Thor
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shblackw"
            onClick={() =>
              this.brandfilter("black_widow", "item_filter_shblackw")
            }
          />
          Black Widow
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shgroot"
            onClick={() => this.brandfilter("groot", "item_filter_shgroot")}
          />
          Groot
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shrocket"
            onClick={() => this.brandfilter("rocket", "item_filter_shrocket")}
          />
          Rocket
        </li>
        <li>
          <input
            type="checkbox"
            value="32"
            id="item_filter_shothers"
            onClick={() => this.brandfilter("others", "item_filter_shothers")}
          />
          Others
        </li>
      </ul>
    );
    this.setState({ bfilter: bfilter });
    this.setState({ pfilter: pfilter });
    if (this.props.parentContext.key == "clothing") {
      var sfilter = (
        <ul class="list-style-6 margin-50px-bottom text-small">
          <lh>Size</lh>
          <li>
            <input
              type="checkbox"
              value="XS"
              id="item_filter_sizexs"
              onClick={() => this.sizefilter("XS", "item_filter_sizexs")}
            />
            XS
          </li>
          <li>
            <input
              type="checkbox"
              value="S"
              id="item_filter_sizes"
              onClick={() => this.sizefilter("S", "item_filter_sizes")}
            />
            S
          </li>
          <li>
            <input
              type="checkbox"
              value="M"
              id="item_filter_sizem"
              onClick={() => this.sizefilter("M", "item_filter_sizem")}
            />
            M
          </li>
          <li>
            <input
              type="checkbox"
              value="L"
              id="item_filter_sizel"
              onClick={() => this.sizefilter("L", "item_filter_sizel")}
            />
            L
          </li>
          <li>
            <input
              type="checkbox"
              value="XL"
              id="item_filter_sizexl"
              onClick={() => this.sizefilter("XL", "item_filter_sizexl")}
            />
            XL
          </li>
        </ul>
      );
      this.setState({ sfilter: sfilter });
    }
    if (this.props.parentContext.key == "electronics") {
      var sfilter = (
        <ul class="list-style-6 margin-50px-bottom text-small">
          <lh>Memory</lh>
          <li>
            <input
              type="checkbox"
              value="8"
              id="item_filter_size8"
              onClick={() => this.sizefilter("8", "item_filter_size8")}
            />
            8
          </li>
          <li>
            <input
              type="checkbox"
              value="16"
              id="item_filter_size16"
              onClick={() => this.sizefilter("16", "item_filter_size16")}
            />
            16
          </li>
          <li>
            <input
              type="checkbox"
              value="32"
              id="item_filter_size32"
              onClick={() => this.sizefilter("32", "item_filter_size32")}
            />
            32
          </li>
        </ul>
      );
      this.setState({ sfilter: sfilter });
      this.setState({});
    }
    console.log("sub category");

    this.subcategory();
  }
  renderCheck() {}
  render() {
    // var temp;
    // if(!(this.state.productDetail.length===0)){
    //     console.log('into render if')
    //     console.log(this.state.productDetail)
    //     temp =(
    //         <div>{this.state.productDetail}</div>
    //     )
    // }else{
    //     console.log('into render else')
    //     temp=(
    // <div>
    // <nav id = 'filter'>
    // {this.state.pfilter}
    // {this.state.sfilter}
    // {this.state.bfilter}
    // </nav>
    // {this.state.mainBody}
    // </div>
    //     )
    // }
    // this.setState({mainDiv:temp})
    return (
      <div>
        <nav id="filter">
          {this.state.pfilter}
          {this.state.sfilter}
          {this.state.bfilter}
        </nav>
        {this.state.mainBody}
        {this.state.productDetail}
        {/* {this.props.parentContext.carousel} */}
      </div>
    );
  }
}
export default FilterBar;
