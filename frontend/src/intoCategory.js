// import React, { Component } from 'react';
// import Axios from 'axios';
// import './homepage.css';
// class IntoCategory extends Component{
//     constructor(props) {
//         super(props);
//         var content ;
//         this.state = {
//             intoCategory:[],
//             mainBody:[]
//         }
//     }
// componentDidMount(){
//     console.log('into mount function');
//     console.log(this.props.parentContext);
//     var parent = {key: this.props.parentContext}
//     Axios.post("http://localhost:4000/intoCategory",parent)
//     .then( (response) => {
//         console.log('returned to intocategory front end');
//         console.log(response.data);
//         this.setState({intoCategory:response.data});
//         var item = this.state.intoCategory.map((categor) =>
//         <li onClick={() => this.handleClick(categor.product_name)}>{categor.product_name}</li> 
//         )
//         var mainBody = (
//             <ul id="category">
//             {item}
//             </ul>
//         )
//         this.setState({mainBody:item});
//    })
// }
// render(){
//     return(
//         <div>
//         {this.state.mainBody}
//         </div>
//     );
// }
// }
// export default IntoCategory;