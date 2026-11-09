/* Page logic: Sabi — Our History */
(function () {
  class Component extends DCLogic {
    renderVals() {
      const milestones = [
        { when: 'Early', year: '2026', dot: '#E2A9A6', title: 'The idea', text: 'It began with a simple frustration: great fragrances were scattered everywhere, and finding the right one felt like guesswork. We set out to build one beautiful home for every kind of scent.' },
        { when: 'Spring', year: '2026', dot: '#D49A72', title: 'Searching for our scents', text: 'Months of smelling, testing and wearing. Florals, fresh citrus, warm ambers, deep oud and traditional attar — only the fragrances we truly loved made the cut.' },
        { when: 'Summer', year: '2026', dot: '#B97F6A', title: 'Sabi is named', text: 'We chose a name that is short, warm and easy to remember — a name for a house that welcomes everyone. Our promise followed: Every Scent. Your Signature.' },
        { when: 'Autumn', year: '2026', dot: '#7A2E3A', title: 'The first collection', text: 'Our first eight signature fragrances were finalised — from Velvet Petal to Midnight Oud — alongside the Discovery Edit, so anyone could try before they commit.' },
        { when: 'November', year: '2026', dot: '#2B1D21', title: 'Sabi opens its doors online', text: 'The Sabi website launches, bringing every scent to your door — gift-ready, with a discovery vial in every order.' }
      ];
      return { accent: this.props.accent ?? '#9A5845', milestones };
    }
  }

  Sabi.mount(document.getElementById('app'), document.getElementById('sabi-page'), Component);
})();
