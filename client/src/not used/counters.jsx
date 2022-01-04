import React from 'react';
import Counter from "./counter";
class Counters extends React.Component {
      state = {
            counters : 
            [
                  {id : 1, count : 2},
                  {id : 2, count : 3},
                  {id : 3, count : 1},
                  {id : 4, count : -1}
            ]
      }
      render() { 
            return <div>
                  {this.state.counters.map(counter => <Counter key = {counter.id} count = {counter.count}/>)}
                  </div>;
      }
}
 
export default Counters;