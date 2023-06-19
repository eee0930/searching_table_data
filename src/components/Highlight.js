class Highlight {
  constructor({ query, data }) {
      this.query = query;
      this.data = data;
  }

  settingHighlight = () => {
      const replace = (word) => {
          const $span = document.createElement("span");
          $span.classList.add("highlight");
          $span.innerHTML = word;
          return $span;
      }
      const {id, photographer, introduction} = this.data;
      const newPho = photographer.toLowerCase()
          .replaceAll(this.query.toLowerCase(), replace(this.query));
      const newIntro = introduction.toLowerCase()
          .replaceAll(this.query.toLowerCase(), replace(this.query));
      
      return {id, photographer: newPho, introduction: newIntro};
  }
}

export default Highlight;