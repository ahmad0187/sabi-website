/* Page logic: Baccarat Rouge 540 — Sabi */
(function () {
  class Component extends DCLogic {
    constructor(props) {
      super(props);
      this.state = { size: '70 ml', qty: 1, bag: 0, added: false, wished: false, open: 'Fragrance notes', view: 0 };
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
    componentWillUnmount() { if (this.io) this.io.disconnect(); }
    renderVals() {
      const st = this.state;
      const sizes = ['35 ml', '70 ml', '200 ml'].map((s) => ({ label: s, active: s === st.size, inactive: s !== st.size, pick: () => this.setState({ size: s }) }));
      const bgs = ['#F2DCD6', '#EFE3DE', '#F5E1DB', '#E9D3CC'];
      const dims = [['260px', '416px'], ['200px', '320px'], ['300px', '480px'], ['230px', '368px']];
      const views = ['front view', 'side view', 'close-up', 'with box'].map((label, i) => ({
        label, bg: bgs[i], pressed: i === st.view ? 'true' : 'false',
        border: i === st.view ? '1.5px solid #2B1D21' : '1px solid #EADDD7',
        pick: () => this.setState({ view: i })
      }));
      const detailData = [
        { title: 'Fragrance notes', text: 'Top: saffron and jasmine. Heart: amberwood and ambergris. Base: fir resin and cedar.' },
        { title: 'How to wear', text: 'Spray two or three times on pulse points — wrists, neck and behind the ears — from about 15 cm away. Let it dry naturally; rubbing breaks down the top notes.' },
        { title: 'Ingredients', text: '[Add the full ingredient list from the packaging here.]' },
        { title: 'Delivery & returns', text: 'Delivered in [X–Y] working days. Unopened, sealed bottles can be returned within [X] days. See our FAQs for full details.' }
      ];
      const details = detailData.map((d) => {
        const open = st.open === d.title;
        return { ...d, open, expanded: open ? 'true' : 'false', sign: open ? '−' : '+', toggle: () => this.setState({ open: open ? '' : d.title }) };
      });
      const related = [
        { brand: 'Tom Ford', title: 'Oud Wood', shape: 'classic', liquid: '#6A3E2A', cap: '#1E1A1C', bg: '#E6DCD3' },
        { brand: 'Yves Saint Laurent', title: 'Libre Eau de Parfum', shape: 'round', liquid: '#E8C46A', cap: '#C9A27A', bg: '#F4EADB' },
        { brand: 'Lattafa', title: 'Khamrah', shape: 'classic', liquid: '#8E3B2E', cap: '#C9A27A', bg: '#EBD6D4' },
        { brand: 'Chanel', title: 'Coco Mademoiselle', shape: 'classic', liquid: '#E9B48F', cap: '#C9A27A', bg: '#F4E3D8' }
      ];
      return {
        accent: this.props.accent ?? '#9A5845',
        sizes, views, details, related,
        viewBg: bgs[st.view], viewW: dims[st.view][0], viewH: dims[st.view][1],
        sizeLabel: st.size.toUpperCase(),
        qty: st.qty, bagCount: st.bag, added: st.added,
        wishPressed: st.wished ? 'true' : 'false',
        wishColor: st.wished ? '#B03A4E' : '#2B1D21',
        wishFill: st.wished ? 'currentColor' : 'none',
        wish: () => this.setState({ wished: !st.wished }),
        inc: () => this.setState({ qty: st.qty + 1 }),
        dec: () => this.setState({ qty: Math.max(1, st.qty - 1) }),
        add: () => this.setState({ bag: st.bag + st.qty, added: true })
      };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
