/* Page logic: Your Bag — Sabi */
(function () {
  class Component extends DCLogic {
    constructor(props) {
      super(props);
      this.state = {
        delivery: 'standard',
        items: [
          { id: 'br', brand: 'Maison Francis Kurkdjian', name: 'Baccarat Rouge 540', family: 'Amber floral', size: '70 ml', qty: 1, shape: 'round', color: '#C8423A', cap: '#C9A27A', bg: '#F2DCD6' },
          { id: 'sv', brand: 'Dior', name: 'Sauvage Eau de Parfum', family: 'Fresh spicy', size: '100 ml', qty: 1, shape: 'tall', color: '#2F4A6B', cap: '#1E1A1C', bg: '#E3E6EA' },
          { id: 'kh', brand: 'Lattafa', name: 'Khamrah', family: 'Amber gourmand', size: '100 ml', qty: 2, shape: 'classic', color: '#8E3B2E', cap: '#C9A27A', bg: '#EBD6D4' }
        ]
      };
    }
    setQty(id, delta) {
      this.setState({ items: this.state.items.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x) });
    }
    renderVals() {
      const st = this.state;
      const items = st.items.map((x) => ({
        ...x,
        inc: () => this.setQty(x.id, 1),
        dec: () => this.setQty(x.id, -1),
        remove: () => this.setState({ items: this.state.items.filter((y) => y.id !== x.id) })
      }));
      const count = st.items.reduce((n, x) => n + x.qty, 0);
      return {
        accent: this.props.accent ?? '#9A5845',
        items,
        count,
        empty: items.length === 0,
        hasItems: items.length > 0,
        standard: st.delivery === 'standard',
        express: st.delivery === 'express',
        deliveryName: st.delivery === 'standard' ? 'Standard' : 'Express',
        pickStandard: () => this.setState({ delivery: 'standard' }),
        pickExpress: () => this.setState({ delivery: 'express' })
      };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
