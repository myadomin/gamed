import Mock from 'mockjs'
import buy from './buy'
import shop from './shop'

function addToMock (list) {
  list.forEach(n => {
    Mock.mock(n.path, n.data)
  })
}

addToMock(buy)
addToMock(shop)

export default Mock
