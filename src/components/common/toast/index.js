import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //new方式 创建出一个组件对象
  const toast = new toastContrustor()
  //将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //toast.$el对应div
  document.body.appendChild(toast.$el)
  //定义原型
  Vue.prototype.$toast = toast
}
export default obj