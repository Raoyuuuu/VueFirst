<template>
    <div id = 'table'>
        {{wReport}}   
        <br/>
        <table id = 'weekReport' border="2">
            <thead>
                <tr>
                    <th>要求</th>
                    <th>目标</th>
                    <th>类别</th>
                    <th>内容描述</th>
                    <th>当前进度</th>
                    <th>预计完成时间</th>
                    <th>未完成原因及计划</th>
                </tr>
            </thead>
            <tbody id = "dataBody"></tbody>
        </table>
    </div>
</template>

<script>
import test from '@/components/Test'
import login from'@/components/Login'

export default {
    components:{
    test,
    login
    },
    data(){
        return{
            wReport
        }
    },
    methods:{}
}

var contain = [
    {
        Cliam: '本周工作',
        Aims:'CRM开发一期',
        Category:'项目开发',
        Description:' 1.原型设计 2.接口设计 3.数据库设计',
        Current: '75%',
        finishTime: '2018/11/9',
        dealLate: 'Reson'
    },
    {
        Cliam: '本周工作',
        Aims:'CRM开发一期',
        Category:'项目开发',
        Description:' 1.原型设计 2.接口设计 3.数据库设计',
        Current: '75%',
        finishTime: '2018/11/9',
        dealLate: 'Reson'
    },
    {
        Cliam: '本周工作',
        Aims:'CRM开发一期',
        Category:'项目开发',
        Description:' 1.原型设计 2.接口设计 3.数据库设计',
        Current: '75%',
        finishTime: '2018/11/9',
        dealLate: 'Reson'
    }
]

// window.onload = function(){
//     var pcontain = document.getElementById('dataBody');

//     for (var i = 0;i < contain.length;i++){
//         var row = getDateRow(contain[i]);
//         pcontain.appendChild(row);
//     }
// }
// function getDateRow(h){
//     var perRow = document.createElement('tr'); // build a row

//     var cliamCell = document.createElement('td'); // build first line for cliam
//     cliamCell.innerHTML = h.Cliam;  // push the cliam data into cliamRow
//     perRow.appendChild(cliamCell); // append this cliamRow to this Row

//     var aimsCell = document.createElement('td'); // build first line for aim
//     aimsCell.innerHTML = h.Aims; // push the aim data into aimsRow 
//     perRow.appendChild(aimsCell);// append this aimRow to this Row

//     var categoryCell = document.createElement('td');
//     categoryCell.innerHTML = h.Category;
//     perRow.appendChild(categoryCell);

//     var descriptionCell = document.createElement('td');
//     descriptionCell.innerHTML = h.Description;
//     perRow.appendChild(descriptionCell);

//     var currentCell = document.createElement('td');
//     currentCell.innerHTML = h.Current;
//     perRow.appendChild(currentCell);

//     var finishTimeCell = document.createElement('td');
//     finishTimeCell.innerHTML = h.finishTime;
//     perRow.appendChild(finishTimeCell);

//     var dealLateCell = document.createElement('td');
//     dealLateCell.innerHTML = h.dealLate;
//     perRow.appendChild(dealLateCell);

//     return perRow;
//     }
</script>

<style>
 #table{
     /* position:absolute;
     left: 300px; */
     text-align: center;
     margin-left: auto;
     margin-right: auto;
 }
 table{
     margin-left: auto;
     margin-right: auto;
 }
 #weekReport{
    display: inline-block;
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 2px;
	border-color: #666666;
	border-collapse: collapse;
}
 #weekReport .th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
 #weekReporte .td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}


</style>
