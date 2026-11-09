/* Page logic: Sabi — Every Scent. Your Signature. */
(function () {
  class Component extends DCLogic {
    constructor(props) {
      super(props);
      this.state = { filter: 'All', bag: 0, wish: {}, toast: '', subscribed: false };
    }
    componentDidMount() {
      try {
        if (!('IntersectionObserver' in window)) return;
        document.documentElement.classList.add('s-reveal-on');
        this.io = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('s-in'); this.io.unobserve(e.target); } });
        }, { threshold: 0.12 });
        document.querySelectorAll('[data-reveal]').forEach((el) => this.io.observe(el));
      } catch (err) {}
    }
    componentWillUnmount() { if (this.io) this.io.disconnect(); clearTimeout(this.toastTimer); }
    addToBag(title) {
      this.setState({ bag: this.state.bag + 1, toast: title });
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => this.setState({ toast: '' }), 2600);
    }
    renderVals() {
      const st = this.state;
      const all = [
        { id: 'sauvage', brand: 'Dior', title: 'Sauvage Eau de Parfum', gender: 'Men', family: 'Fresh spicy', notes: 'Bergamot, Sichuan pepper, ambroxan', shape: 'tall', liquid: '#2F4A6B', cap: '#1E1A1C', bg: '#E3E6EA' },
        { id: 'coco', brand: 'Chanel', title: 'Coco Mademoiselle', gender: 'Women', family: 'Floral chypre', notes: 'Orange, rose, jasmine, patchouli', shape: 'classic', liquid: '#E9B48F', cap: '#C9A27A', bg: '#F4E3D8' },
        { id: 'oudwood', brand: 'Tom Ford', title: 'Oud Wood', gender: 'Unisex', family: 'Oud', notes: 'Rare oud, sandalwood, vetiver, tonka', shape: 'classic', liquid: '#6A3E2A', cap: '#1E1A1C', bg: '#E6DCD3' },
        { id: 'br540', brand: 'Maison Francis Kurkdjian', title: 'Baccarat Rouge 540', gender: 'Unisex', family: 'Amber floral', notes: 'Saffron, jasmine, amberwood, fir resin', shape: 'round', liquid: '#C8423A', cap: '#C9A27A', bg: '#F2DCD6' },
        { id: 'libre', brand: 'Yves Saint Laurent', title: 'Libre Eau de Parfum', gender: 'Women', family: 'Floral', notes: 'Lavender, orange blossom, vanilla', shape: 'round', liquid: '#E8C46A', cap: '#C9A27A', bg: '#F4EADB' },
        { id: 'aventus', brand: 'Creed', title: 'Aventus', gender: 'Men', family: 'Fruity chypre', notes: 'Pineapple, birch, blackcurrant, musk', shape: 'tall', liquid: '#3B4A3F', cap: '#B8B8BC', bg: '#E1E4DE' },
        { id: 'lveb', brand: 'Lancôme', title: 'La Vie Est Belle', gender: 'Women', family: 'Gourmand', notes: 'Iris, praline, vanilla, patchouli', shape: 'round', liquid: '#E7A7B4', cap: '#EDE6E1', bg: '#F5E1DB' },
        { id: 'khamrah', brand: 'Lattafa', title: 'Khamrah', gender: 'Unisex', family: 'Amber gourmand', notes: 'Cinnamon, dates, praline, tonka', shape: 'classic', liquid: '#8E3B2E', cap: '#C9A27A', bg: '#EBD6D4' }
      ];
      const f = st.filter;
      const products = all.filter((p) => f === 'All' || p.gender === f).map((p) => {
        const wished = !!st.wish[p.id];
        return { ...p, wished, notWished: !wished,
          wish: () => this.setState({ wish: { ...this.state.wish, [p.id]: !this.state.wish[p.id] } }),
          add: () => this.addToBag(p.title) };
      });
      const tabs = ['All', 'Women', 'Men', 'Unisex'].map((t) => ({ label: t, active: t === f, inactive: t !== f, pick: () => this.setState({ filter: t }) }));
      const families = [
        { name: 'Floral', notes: 'Rose, jasmine, peony', shape: 'round', liquid: '#E8A3AC', cap: '#C9A27A', bg: '#F5E1DB' },
        { name: 'Oud', notes: 'Agarwood, smoke, saffron', shape: 'classic', liquid: '#4A3038', cap: '#1E1A1C', bg: '#E8DDD8' },
        { name: 'Fresh', notes: 'Citrus, aquatic, green', shape: 'tall', liquid: '#7FA7C4', cap: '#B8B8BC', bg: '#E3E9EC' },
        { name: 'Woody', notes: 'Cedar, sandalwood, vetiver', shape: 'classic', liquid: '#7A604C', cap: '#1E1A1C', bg: '#E6DCD3' },
        { name: 'Amber', notes: 'Vanilla, resin, warm spice', shape: 'round', liquid: '#D49A52', cap: '#C9A27A', bg: '#F3E5D6' },
        { name: 'Attar', notes: 'Rose oud, musk, oils', shape: 'attar', liquid: '#7A2E3A', cap: '#C9A27A', bg: '#EFDCDA' }
      ];
      const brands = ['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Yves Saint Laurent', 'Lancôme', 'Maison Francis Kurkdjian', 'Lattafa', 'Amouage', 'Sabi Signature'];
      const brandsLoop = brands.concat(brands).map((name) => ({ name }));
      const floats = ['s-float', 's-float-2', 's-float-3'];
      const vials = ['#E8A3AC', '#4A3038', '#7FA7C4', '#7A604C', '#D49A52', '#C8423A', '#E7A7B4', '#7A2E3A'].map((c, i) => ({ liquid: c, cls: floats[i % 3] }));
      return {
        accent: this.props.accent ?? '#9A5845',
        products, tabs, families, brandsLoop, vials,
        bagCount: st.bag,
        wishCount: Object.keys(st.wish).filter((k) => st.wish[k]).length,
        toast: st.toast,
        subscribed: st.subscribed,
        notSubscribed: !st.subscribed,
        subscribe: () => this.setState({ subscribed: true })
      };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
