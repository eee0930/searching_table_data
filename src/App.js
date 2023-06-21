import SearchHistory from "./components/SearchHistory.js";
import Highlight from "./components/Highlight.js";

const HIGHLIGHT = "highlight";

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.$searchHistory = this.$target.querySelector("#search-history");
    this.$section = this.$target.querySelector("#section");
    this.searchHistory;
    this.highlight;
    this.dataList = [];
    this.settingInitial();
  }

  settingInitial = () => {
    const keys = this.setDataList();
    const $input = this.$target.querySelector("#search-input");
    $input.addEventListener("input", this.handleInputQuery);
    this.searchHistory = new SearchHistory({
      $target: this.$searchHistory,
      dataList: this.dataList,
      keys
    });
  }

  settingAppResult = (query) => {
    if(query.length > 0) {
      const searchResult = this.settingSearchHistory(query);
      this.settingHighlight(query, searchResult);
      this.$section.style.display = "none";
    } else {
      this.removeChildren(this.$searchHistory);
      this.$section.style.display = "block";
    }
  }

  /**
   * from SearchHistory
   * @param {string} query 
   * @returns 
   */
  settingSearchHistory = (query) => {
    this.searchHistory.setQuery(query);
    this.searchHistory.render();
    return this.searchHistory.getSearchResult();
  }

  /**
   * from Highlight
   * @param {string} query 
   * @param {object[]} searchResult 
   */
  settingHighlight = (query, searchResult) => {
    const $table = this.$target.querySelector("table");
    this.highlight = new Highlight({
      $target: $table,
      styleKey: ["span", HIGHLIGHT],
      query,
      searchResult
    });
    this.highlight.render();
  }
  
  handleInputQuery = (event) => {
    const query = event.target.value;
    this.settingAppResult(query);
  }
  
  /**
   * table에서 dataList를 가져와 object 형태로 담음
   * @returns {string[]}
   */
  setDataList = () => {
    const $trs = Array.from(this.$section.querySelectorAll("tr"));
    const keys = Array.from($trs.shift().querySelectorAll("th"))
      .map($th => $th.innerText);
    $trs.map($tr => {
      const $tds = Array.from($tr.querySelectorAll("td"));
      const data = {};
      for(let i = 0; i < keys.length; i++) {
        data[keys[i]] = $tds[i].innerText;
      }
      this.dataList.push(data);
    });
    return keys.slice(1);
  }

  removeChildren = ($ele) => {
    while($ele.firstChild) {
      $ele.removeChild($ele.firstChild);
    }
  }

}

export default App;

