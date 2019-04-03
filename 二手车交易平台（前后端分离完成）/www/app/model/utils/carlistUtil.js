function* fetchServer(select,put){

    const {nowfilters} = yield select((state)=>state.carlist);
    const {pagination} = yield select((state)=>state.carlist);
    const {sorter} = yield select((state)=>state.carlist);

    // 发送fetch请求
    const {results,total} = yield fetch("/api/carsearch",{
        "method":"POST",
        "headers":{"Content-Type":"application/json"},
        "body":JSON.stringify({
            nowfilters,
            pagination,
            sorter
        })
    }).then(data=>data.json());
    // 将发过来的数据存到cars里面
    yield put({"type":"changeCars","cars":results});
    //改变pagination中的total
    yield put({"type":"changePagination",total});
}

export const fetchCarServer = fetchServer;