class SearchHistory {
  constructor({ $target, dataList, keys }) {
    this.$target = $target;
    this.dataList = dataList;
    this.keys = keys;
    this.searchResult = [];
    this.query = "";
  }

  render = () => {
    this.settingSearchHistory();
    const $table = createElement("table");
    new Set(this.searchResult).forEach(result => {
      const $tr = createElement("tr");
      Object.values(result).map(value => {
        const $td = createElement("td");
        $td.innerText = value;
        $tr.appendChild($td);
      });
      $table.appendChild($tr);
    });
    this.$target.appendChild($table);
  }

  settingSearchHistory = () => {
    this.removeChildrenByEle(this.$target);
    this.searchResult = [];
    this.dataList.map((data) => {
      for(let i = 0; i < this.keys.length; i++) {
        const para = data[this.keys[i]].toLowerCase();
        if(para.includes(this.query)) {
          this.searchResult.push(data);
          break;
        }
      }
    });
  }

  setQuery = (query) => {
    this.query = query.toLowerCase();
  }

  getSearchResult = () => {
    return this.searchResult;
  }

  removeChildrenByEle = ($ele) => {
    while($ele.firstChild) {
      $ele.removeChild($ele.firstChild);
    }
  }
  
}


const createElement = (ele, className) => {
  const $ele = document.createElement(ele);
  if(className) {
    if(typeof className === "string") {
      $ele.classList.add(className);
    } else {
      $ele.className = `${className.join(" ")}`
    }
  }
  return $ele;
}

export default SearchHistory;