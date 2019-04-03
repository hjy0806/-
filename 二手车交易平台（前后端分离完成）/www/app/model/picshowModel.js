import { fetchCarInfo ,fetchCarlikes,fetchCarImages} from "./utils/picshowUtil.js";
import fp from "lodash/fp";
export default {
    // 命名空间 ，用来区分不同的model的。
    // 底层是 combineReduces 实现的。namespace其实是我们之前在redux中多打点的k值。
    "namespace":"picshow",
    "state":{
        // 现在显示图集的汽车id
        "nowid":0,
        // 当前查看图集中的序列数
        "nowidx":0,
        // 当前的图集
        "nowalbum":"view", // view \ engine \ more \ inner
        //  汽车的信息
        "carinfo":{},
        // 汽车的图片
        "carimages":{},
        // 汽车的推荐
        "carlikes":[]
    },
    // reducers中写的是纯函数，也是唯一改变state数据的地方
    "reducers":{
        changeNowid(state,action){
            return fp.set("nowid",action.nowid,state);
        },
        changeCarinfo(state,action){

            return fp.set("carinfo",action.carinfo,state);
        },
        changeCarLikes(state,action){

            return fp.set("carlikes",action.carlikes,state);
        },
        changeCarimages(state,action){

            return fp.set("carimages",action.carimages,state);
        },
        changeNowAlbumSync(state,action){

            return fp.set("nowalbum",action.nowalbum,state);
        },
        changeNowidxSync(state,action){

            return fp.set("nowidx",action.nowidx,state);

        }
    },
    // effects是写副作用的地方， reducers干不了的事，全都在effects中实现。
    "effects":{
        // 汽车图集的初始化
       *init({nowid},{put,call}){
            // 每次改变id的时候，都要将图集变成“view” , nowidx 变为 0;
            yield put({"type":"changeNowAlbum",nowalbum:"view"});
            // 改变id
            yield put({"type":"changeNowid",nowid});
            // 下面是三个异步请求
            const carinfo = yield call(fetchCarInfo,nowid);
            yield put({"type":"changeCarinfo",carinfo});

            const carlikes = yield call(fetchCarlikes,nowid);
            yield put({"type":"changeCarLikes",carlikes});

            const carimages = yield call(fetchCarImages,nowid);
            yield put({"type":"changeCarimages",carimages});
       },
       *changeNowAlbum({nowalbum},{put,call}){
            // 改变图集
            yield put({"type":"changeNowAlbumSync",nowalbum});
            // put和 dipatch一样
            yield put({"type":"changeNowidxSync",nowidx:0});
       },
       *changeNowidx({nowidx},{put,call}){
            // 改变当前查看图集中的序列数
            yield put({"type":"changeNowidxSync",nowidx});
       },
       *goPrev(action,{put,call,select}){
            // select 可以获取state中的数据
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);

            if( nowidx > 0){

                yield put({"type":"changeNowidxSync","nowidx":nowidx-1})

            }else{

                if( nowalbum != "view"){
                    // 图集切换的顺序
                    const arr = ["view","inner","engine","more"];
                    // 得到当前的额相册在图集顺序中的序号
                    const nowarridx = arr.indexOf(nowalbum);
                    // 改变相册 就是上面的序列值-1
                    yield put({"type":"changeNowAlbumSync","nowalbum":arr[nowarridx-1]});
                    // 改变相册 中图片的索引值
                    yield put({"type":"changeNowidxSync","nowidx":carimages[arr[nowarridx-1]].length-1});

                }else{
                    yield put({"type":"changeNowAlbumSync","nowalbum":"more"});
                    yield put({"type":"changeNowidxSync","nowidx":carimages["more"].length-1});


                }
            }
       },
       *goNext(action,{put,call,select}){
            // select 可以获取state中的数据
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);


            if(nowidx < carimages[nowalbum].length - 1){

                yield put({"type":"changeNowidxSync","nowidx":nowidx+1})

            }else{
               if( nowalbum != "more"){
                    // 图集切换的顺序
                    const arr = ["view","inner","engine","more"];
                    // 得到当前的额相册在图集顺序中的序号
                    const nowarridx = arr.indexOf(nowalbum);
                    // 改变相册 就是上面的序列值+1
                    yield put({"type":"changeNowAlbum","nowalbum":arr[nowarridx+1]});

               }else{
                    // 若现在的图集是more图集， 后面没有图片了，此时就
                    yield put({"type":"changeNowAlbum","nowalbum":"view"});
               }
            }

       },
       *clearCarImages(action,{put,call}){
        // 改变carlikes 置空， 当 从列表中点击进图集组件的时候， 此时为了避免新nowid和老图集中的carimage 的图片信息 发生错误，所以要置空
              yield put({"type":"changeCarimages","carimages":{}});
       }
    }
}

