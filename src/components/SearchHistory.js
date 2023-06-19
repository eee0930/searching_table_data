import Highlight from "./Highlight.js";
class SearchHistory {
    constructor({ $target, dataList }) {
        this.$target = $target;
        this.dataList = dataList;
        this.nowDataList = [];
    }

    render = (searchResult) => {
        const $table = document.createElement('table');
        const rows = searchResult.map(element => {
            const row = document.createElement('tr')
            const idCell = document.createElement('td')
            idCell.textContent = element.id
            row.appendChild(idCell)

            const photographerCell = document.createElement('td')
            photographerCell.textContent = element.photographer
            row.appendChild(photographerCell)

            const introCell = document.createElement('td')
            introCell.textContent = element.introduction
            row.appendChild(introCell)

            return row
        })

        rows.forEach(row => {
            $table.appendChild(row)
        });

        this.$target.appendChild($table);
    }
    settingSearchResult = (query) => {
        query = query.toLowerCase();
        removeChildren(this.$target);
        const searchResult = [];
        for(let i = 0; i < this.dataList.length; i++) {
            if(this.dataList[i].photographer.toLowerCase().includes(query) || 
            this.dataList[i].introduction.toLowerCase().includes(query)) {
                const highlight = new Highlight({
                    query, 
                    data: this.dataList[i],
                });
                // const repaintData = highlight.settingHighlight();
                // searchResult.push(repaintData);
                searchResult.push(this.dataList[i]);
            };
        }
        this.render(searchResult);
        this.nowDataList = searchResult;
    }

    getNowDataList = () => {
        return this.nowDataList;
    }

    setNowDataList = (dataList) => {
        this.nowDataList = dataList;
    }
}

const removeChildren = ($ele) => {
    while($ele.firstChild) {
        $ele.removeChild($ele.firstChild);
    }
}

export default SearchHistory;