/* Page logic: FAQs — Sabi */
(function () {
  class Component extends DCLogic {
    constructor(props) {
      super(props);
      this.state = { cat: 'All', open: 0 };
    }
    renderVals() {
      const st = this.state;
      const data = [
        { cat: 'Orders & Delivery', q: 'How long does delivery take?', a: 'Orders are usually delivered within [X–Y] working days in major cities and [X–Y] working days elsewhere. You will receive a tracking link by SMS and email as soon as your order is dispatched.' },
        { cat: 'Orders & Delivery', q: 'How can I track my order?', a: 'Use the tracking link in your dispatch message, or contact us on WhatsApp with your order number and we will update you right away.' },
        { cat: 'Orders & Delivery', q: 'Do you offer gift wrapping and gift messages?', a: 'Every Sabi order arrives gift-ready in our signature box. Add a personal note at checkout and we will include it, handwritten, with your order.' },
        { cat: 'Products', q: 'What is the difference between Eau de Parfum, Eau de Toilette and attar?', a: 'Eau de Parfum has a higher concentration of perfume oils, so it is richer and lasts longer. Eau de Toilette is lighter and fresher, perfect for daytime. Attar is a concentrated, alcohol-free perfume oil applied in small amounts directly to the skin.' },
        { cat: 'Products', q: 'How long will my fragrance last?', a: 'Longevity depends on the concentration, the scent family and your skin. Deeper notes such as oud, amber and woods usually last longer than fresh citrus. For the best results, apply to moisturised skin on your pulse points.' },
        { cat: 'Products', q: 'Can I try a scent before buying a full bottle?', a: 'Yes. Every order includes a complimentary discovery vial, and our Discovery Edit lets you try one fragrance from every scent family before choosing your signature.' },
        { cat: 'Products', q: 'How should I store my perfume?', a: 'Keep your bottle in a cool, dry place away from direct sunlight and heat, with the cap closed. Avoid storing perfume in the bathroom, where temperature and humidity change often.' },
        { cat: 'Returns', q: 'Can I return or exchange a perfume?', a: 'Unopened, sealed bottles can be returned within [X] days of delivery. For hygiene reasons, opened fragrances cannot be returned unless they arrived damaged or incorrect.' },
        { cat: 'Returns', q: 'What if my order arrives damaged?', a: 'We are so sorry if that happens. Please message us within [48 hours] of delivery with a photo of the item and packaging, and we will arrange a replacement or refund.' },
        { cat: 'Payments', q: 'Which payment methods do you accept?', a: 'We accept cash on delivery, debit and credit cards, and bank transfer. [Add any wallets you support, such as JazzCash or Easypaisa.]' },
        { cat: 'Payments', q: 'Is it safe to pay online?', a: 'Yes. All card payments are processed through a secure, encrypted payment gateway. We never see or store your full card details.' }
      ];
      const filtered = data.filter((d) => st.cat === 'All' || d.cat === st.cat);
      const faqs = filtered.map((d, i) => {
        const open = st.open === i;
        return { ...d, open, expanded: open ? 'true' : 'false', sign: open ? '−' : '+',
          toggle: () => this.setState({ open: open ? -1 : i }) };
      });
      const cats = ['All', 'Orders & Delivery', 'Products', 'Returns', 'Payments'].map((c) => ({
        label: c, active: c === st.cat, inactive: c !== st.cat,
        pick: () => this.setState({ cat: c, open: 0 })
      }));
      return { accent: this.props.accent ?? '#9A5845', faqs, cats };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
