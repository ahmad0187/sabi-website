/* Page logic: About Sabi */
(function () {
  class Component extends DCLogic {
    renderVals() {
      return { accent: this.props.accent ?? '#9A5845' };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
