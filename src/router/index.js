import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import statusBar from '@/head/StatusBar'
import layOut from '@/Lay-out/Layout-view'
import layOutCom from '@/Lay-out/Layout-commen'
import login from'@/components/Login'
import reportOperation from '@/components/reportOperation'
import reportOperationWeek from '@/components/reportOperationWeek'
import selfDailyReport from '@/components/selfDailyReport'
import personelContent from '@/components/personelContent'
import welcomePage from '@/components/welcomePage'
// import tools from '@/head/toolBar'
import dailyReport from '@/components/daywork'
import weekyReport from '@/components/weekwork'
import menuControl from '@/components/menuControl'
import uriControl from '@/components/interfaceControl'
import menuOperation from '@/components/menuOperation'
import interfaceOperation from '@/components/interfaceOperation'
import addUri from '@/components/addUri'
import addMenu from '@/components/addMenu'
import addReport from '@/components/addReport'
import addWeekReport from '@/components/addWeekReport'
import weekReport from "@/components/WeekReport";
import selfweekyReport from '@/components/selfweekyReport'
import roleManagement from "@/components/RoleManagement";
import powerAndMenu from "@/components/PowerAndMenu";
import powerAndUrl from "@/components/PowerAndUrl";
import transfer from '@/components/Transfer'
import addNewWeekly from '@/components/addNewWeekly'

import menu from "@/Lay-out/menuItem"

// import dateSelectWithButton from '@/components/DateDemo2'
// import dateSelect from '@/components/DateDemo'



Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/',
            name: 'login',
            component: login,
            // meta: { 
            //     requiresAuth: true 
            // }

        },{
            path: '/index',
            name: 'statusBar',
            component:statusBar,
            // children:[{
            //     path:'index',
            //     name: 'tools',
            //     component: tools
            // }]
        },{
            path: '/layout',
            name: 'managePage',
            component:layOut,
        },
        
        {
            path: '/layoutCom',
            name: 'commenPage',
            component:layOutCom,
            children: [{
                path: '/welcome',
                name: 'welcome',
                component:welcomePage
            },{
                path: '/reportOperationWeek',
                name: 'reportOperationWeek',
                component:reportOperationWeek
            },{
            path: '/personelContent',
            name: 'personelContent',
            component:personelContent
            },{
            path: '/reportOperation',
            name: 'reportOperation',
            component:reportOperation
            },{
            path: '/selfDailyReport',
            name: 'selfDailyReport',
            component:selfDailyReport
            },{
            path: '/dailyReport',
            name: 'dailyReport',
            component:dailyReport
            },{
            path: '/weekyReport',
            name: 'weekyReport',
            component:weekyReport
            },{
            path:'/menuControl',
            name: 'menuControl',
            component: menuControl
            },{
            path:'/uriControl',
            name: 'uriControl',
            component: uriControl
            },{
            path: '/menuOperation',
            name: 'menuOperation',
            component:menuOperation
            },{
            path: '/interfaceOperation',
            name: 'interfaceOperation',
            component:interfaceOperation
            },{
            path: '/addUri',
            name: 'addUri',
            component:addUri
            },{
            path: '/addMenu',
            name: 'addMenu',
            component:addMenu
            },{
            path: '/addReport',
            name: 'addReport',
            component:addReport
        },
        {
            path: '/roleManagement',
            name: 'roleManagement',
            component:roleManagement
        },
        {
            path: '/transfer',
            name: 'transfer',
            component:transfer
        },
        {
            path: '/powerAndUrl',
            name: 'powerAndUrl',
            component:powerAndUrl
        },
        {
            path: '/powerAndMenu',
            name: 'powerAndMenu',
            component:powerAndMenu
        },{
            path:'/selfweekyReport',
            name:'selfweekyReport',
            component:selfweekyReport
        },
        {
          path:'/addWeekReport',
          name:'addWeekReport',
          component:addWeekReport
      },{
        path: '/addNewWeekly',
        name: 'addNewWeekly',
        component:addNewWeekly
    },
    
    ]
        },
        {
            path: '/menu',
            name: 'menu',
            component:menu
        },
        // {
        //     path: '/welcome',
        //     name: 'welcome',
        //     component:welcomePage
        // },
    ]
})