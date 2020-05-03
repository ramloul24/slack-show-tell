function selectId(listOfIds, selectedIds) {
    console.log(selectedIds)
    let index, selectedId;
    if (listOfIds.length === selectedIds.length) {
        index = Math.floor(Math.random() * listOfIds.length);
        selectedId = listOfIds.splice(index, 1)[0];
        selectedIds = [];
    }
    else {
        let selectedIdArr = listOfIds.filter((ele) => !selectedIds.includes(ele));
        index = Math.floor(Math.random() * selectedIdArr.length);
        selectedId = selectedIdArr.splice(index, 1)[0];
        selectedIds.push(selectedId);
    }
    return [selectedId, selectedIds];
}
module.exports = {
    selectId
};
