export default {
    state:{
        isCollapse: false,
        breadList:[
            {
                path: '/main/home',
                pathName: 'home',
                name: '首页'
            }
        ],
        homePath: "/main/home"
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        addBreadMenu(state, menuItem){
            // 防止重复添加添加
            let index = state.breadList.findIndex(item => item.path === menuItem.path)
            if(index === -1){
                state.breadList.push(menuItem);
            }
        },
        deleteBreadMenu(state, index){
            state.breadList.splice(index, 1);
        }
    }
}
