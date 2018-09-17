import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_FAILURE } from '../constants/ActionTypes'

// ---product---
const productInventoryDesc = (product) => {
  return {
    ...product,
    inventory: product.inventory - 1
  }
}

// [
//   {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
//   {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
//   {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
// ]
// 数据扁平化 转化为
// {
//    1: {id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2}
//    2: {id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10}
//    3: {id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
// }

// const formatData = (products) => {
//   let obj = {}
//   products.map(product => {
//     obj[product.id] = product
//   })
//   return obj
// }
const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
        // ...formatData(action.products)
      }
    case ADD_TO_CART:
      const { productId } = action
      return {
        ...state,
        [productId]: productInventoryDesc(state[productId])
      }
    default:
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

const products = combineReducers({
  byId,
  visibleIds
})

// ---cart---
const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default combineReducers({products, cart})
