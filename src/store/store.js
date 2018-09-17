import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import todos from './todos/reducers'
import shopcart from './shopcart/reducers'

// 安装Redux DevTools
// composeWithDevTools
// 两者缺一不可
const logger = createLogger({})
const store = createStore(
  combineReducers({todos, shopcart}),
  composeWithDevTools(applyMiddleware(thunk, logger))
)

export default store
