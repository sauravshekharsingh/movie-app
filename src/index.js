import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";
require("dotenv").config();

// Logger Middleware
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") {
      console.log("ACTION_TYPE:", action.type);
    }
    next(action);
  };

// We do not need to write redux thunk middleware as it is available as a package
// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }
//     next(action);
//   };

// Create the store and pass the reducer
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("STATE", store.getState());

// Store Context
// export const storeContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       // Whatever we pass as value here if changes then all the consumers will be rerendered
//       <storeContext.Provider value={store}>
//         {this.props.children}
//       </storeContext.Provider>
//     );
//   }
// }

// Connect Store to Component
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }

//       render() {
//         return (
//           <storeContext.Consumer>
//             {(store) => {
//               const state = store.getState();
//               const dataToBePassesAsProps = callback(state);
//               return (
//                 <Component
//                   {...dataToBePassesAsProps}
//                   dispatch={store.dispatch}
//                 />
//               );
//             }}
//           </storeContext.Consumer>
//         );
//       }
//     }

//     return class connectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <storeContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </storeContext.Consumer>
//         );
//       }
//     };
//   };
// }

// Dispatching actions

// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name: 'Skyfall'}]
// });

// console.log('AFTER STATE', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
