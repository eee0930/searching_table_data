class Highlight {
  constructor({ $target, styleKey, query, searchResult }) {
    this.$target = $target;
    this.styleKey = styleKey;
    this.query = query;
    this.searchResult = searchResult;
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
    const [tagName, className] = this.styleKey;
    let newText = text;
    text = text.toLowerCase(); 
    let idx = text.length - 1;
    while(idx > 0) {
      for(let i = 0; i < queries.length; i++) {
        const query = queries[i];
        const queryL = query.length;
        const innerQuery = `<${tagName} class="${className}">${query}</${tagName}>`;
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
            + innerQuery + newText.slice(lastIdx + queryL);
          break;
        }
      }
    }
    return newText;
  }

  settingHighlight = () => {
    const queries = Array.from(new Array(this.query.length), (_, i) => 
      this.query.slice(0, this.query.length - i));
    return queries;
  }
}

export default Highlight;