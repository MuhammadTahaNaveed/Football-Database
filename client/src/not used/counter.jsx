import React from "react";


class Counter extends React.Component 
{
  state = { count : (this.props.count<0)?(0):(this.props.count) }
  
  handleIncrement = () => 
  {
    this.setState({ count: this.state.count + 1 })
  }
  handleDecrement = () => 
  {
    if (this.state.count!==0)
     this.setState({ count: this.state.count - 1 });
  }
  getBadgeClasses = () =>
  {
    return ((this.state.count!==0) ? "badge badge-primary m-2" : "badge badge-warning m-2");
  }

  render() 
  {
    return (
      <div className=" ml-4">
        
        <span className = {this.getBadgeClasses()}>
            {this.state.count}
        </span>

        <button className = "btn btn-secondary btn-sml m-2" onClick = {this.handleIncrement}>
            Increment
        </button>

        <button className = "btn btn-secondary btn-sml" onClick = {this.handleDecrement}>
            Decrement
        </button>
        

      </div>
    );
  }
}

export default Counter;
