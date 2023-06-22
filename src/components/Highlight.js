class Highlight {
  constructor({ $target, styleKey, query }) {
    this.$target = $target;
    this.styleKey = styleKey;
    this.query = query;
    this.highlight = "";
    this.queries = [];
    this.settingHighlight();
  }

  render = () => {
    const queries = this.settingHighlight();
    const $trs = this.$target.querySelectorAll("tr");
    Array.from($trs).map($tr => {
      const $tds = Array.from($tr.querySelectorAll("td")).slice(1);
      $tds.map($td => {
        const text = $td.innerText;
        const newText = this.renderHighlightText(text, queries);
        $td.innerHTML = newText;
      })
    });
  }

  renderHighlightText = (text, queries) => {
    let newText = text;
    text = text.toLowerCase(); 
    let idx = text.length - 1;
    while(idx > 0) {
      for(let i = 0; i < queries.length; i++) {
        const query = queries[i];
        const lastIdx = text.lastIndexOf(query.toLowerCase(), idx);
        if(lastIdx === -1) {
          if(i === queries.length - 1) {
            return newText;
          } else {
            continue;
          }
        } else {
          idx = lastIdx - 1;
          newText = newText.slice(0, lastIdx)
            + this.highlight 
            + newText.slice(lastIdx + query.length);
          break;
        }
      }
    }
    return newText;
  }

  settingHighlight = () => {
    const [tagName, className] = this.styleKey;
    this.highlight = `<${tagName} class="${className}">${this.query}</${tagName}>`;
    this.queries = Array.from(new Array(this.query.length), (_, i) => 
      this.query.slice(0, this.query.length - i));
  }
}

export default Highlight;