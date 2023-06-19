import { fetchDataList } from "./api.js";
import SearchHistory from "./components/SearchHistory.js";

class App {
    constructor() {
        this.totalData = [];
        this.$input = document.querySelector("#search-input");
        this.$search = document.querySelector("#search-history");
        this.$section = document.querySelector("#section");
        this.query = "";
        this.nowDataList = [];
        this.searchHistory;
        this.settingApp();
    }

    render = () => {
        this.$input.addEventListener("input", this.handleInputQuery);

    }

    settingApp = async () => {
        this.totalData = await fetchDataList();
        this.searchHistory = new SearchHistory({
            $target: this.$search,
            dataList: this.totalData,
        });
        this.render();
    }

    getTotalDatas = async () => {

    }

    handleInputQuery = (e) => {
        const value = e.target.value;
        if(value.length < 1) {
            this.$section.style.display = "block";
            removeChildren(this.$search);
        } else {
            this.$section.style.display = "none";
            this.searchHistory.settingSearchResult(value);
        }
        this.nowDataList = this.searchHistory.getNowDataList();
        this.query = value;
    }
}
const removeChildren = ($ele) => {
    while($ele.firstChild) {
        $ele.removeChild($ele.firstChild);
    }
}
export default App;

