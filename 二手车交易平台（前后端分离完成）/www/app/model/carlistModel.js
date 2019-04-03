import { fetchCarServer } from "./utils/carlistUtil.js";
import fp from "lodash/fp";
export default {
    // 命名空间 ，用来区分不同的model的。
    // 底层是 combineReduces 实现的。namespace其实是我们之前在redux中多打点的k值。
    "namespace":"carlist",
    "state":{
        // 这个属性存放的是页面的过滤条件
        "nowfilters":[
            // {"key":"brand","value":"奥迪"}
        ],
        // 查出啦的数据的结果
        "cars":[],
        // 分页
        "pagination":{
            // 当前的页
            "page":1,
            // 默认是一页显示10条
            "pagesize":8,
            // 一共所少条
            "total":0
        },
        // 排序
        "sorter":{
            // 默认按id值排序
            "sortby":"id",
            // 默认升序
            "sortdirection":"ascend"
        }
    },
    // reducers中写的是纯函数，也是唯一改变state数据的地方
    "reducers":{
        changeCars(state,action){
            return fp.set("cars",action.cars,state);
        },
        // 添加过滤器条件
        addFilter(state,{key,value}){
            var nowfilters = fp.clone(state.nowfilters);
            nowfilters.push({key,value});
            return fp.set("nowfilters",nowfilters,state)
        },
        // 改变过滤器条件
        changeFilter(state,{key,value}){
            return fp.set("nowfilters",fp.map(item=>item.key == key ? fp.set("value",value,item) : item,state.nowfilters),state);
        },
        // 删除项目
        removeFilterSync(state,{key}){
            return fp.set("nowfilters",
                    fp.filter(item=>item.key != key,state.nowfilters)
                ,state)
        },
        // 改变Pagination项目
        changePagination(state,{
            page = state.pagination.page ,
            pagesize = state.pagination.pagesize,
            total = state.pagination.total
        }){

            return fp.set("pagination",{page,pagesize,total},state)
        },
        // 改变排序
        changeSorter(state,{
            sortby = state.sorter.sortby ,
            sortdirection = state.sorter.sortdirection
        }){
            return fp.set("sorter",{sortby,sortdirection},state)
        }
    },
    // effects是写副作用的地方， reducers干不了的事，全都在effects中实现。
    "effects":{
        *init(action,{call,put,select}){

            yield call(fetchCarServer,select,put);
        },
        *addOrchangeFilter({key,value},{call,put,select}){
            // 获取当前的carlist 中数据的。
            var {nowfilters} = yield select((state=>state.carlist));
            // 做一个标记
            var isFlag = false; //默认nowfilters是是没有数据

            for (var i = 0; i < nowfilters.length; i++) {
                if(nowfilters[i].key == key){
                    isFlag = true;
                }
            };
            //  如果是true ，此时您传过来的key在过滤器中已经存在
            if(isFlag){
                yield put({"type":"changeFilter",key,value})
            }else{
                // 此时您传过来的key在过滤器中不存在
                yield put({"type":"addFilter",key,value})
            }
            // 页码回到第一页
            yield put({"type":"changePagination","page":1})
            // 请求后台的数据
            yield call(fetchCarServer,select,put);
        },
        *removeFilter({key},{call,put,select}){
            // brand没有的时候，series 一定不存在。
            if( key == "brand"){
                // 删除 series
                 yield put({"type":"removeFilterSync","key":"series"});
            };
            // 删除 key对应的value值是空的项
             yield put({"type":"removeFilterSync",key})
             // 页码回到第一页
             yield put({"type":"changePagination","page":1})
             // 请求后台的数据
            yield call(fetchCarServer,select,put);
        },
        // 异步发送改变分页
        *changePage({page,pagesize},{call,put,select}){
            // 发送异步前先改pagination对象，改的话，先拿到pagination对象
            //拿 → 改 → 发
            var {pagination} = yield select((state=>state.carlist));
            // 当前的条数与新的条数不一致的时候，我们 将页码返回第1页
            if(pagination.pagesize != pagesize ){
                 page  = 1;
            }
            // 改变
            yield put({"type":"changePagination",page,pagesize});

            // 拉取新的数据【发送异步】分页信息的新数据
            yield call(fetchCarServer,select,put);
        },
        // 异步发送改变分页
        *changeSort({sortby,sortdirection},{call,put,select}){
            // 发送异步前先改pagination对象，改的话，先拿到pagination对象
            //拿 → 改 → 发
            var {sorter} = yield select((state=>state.carlist));
            // 当 以排序的属性或排序属性顺序发生变化的时候，才将页码返回第一页
            if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要发生了重新排序问题
                yield put({"type":"changePagination","page":1});
                // 改变
                yield put({"type":"changeSorter",sortby,sortdirection});
                // 拉取新的数据【发送异步】分页信息的新数据
                yield call(fetchCarServer,select,put);
            }

        }
    }
}


